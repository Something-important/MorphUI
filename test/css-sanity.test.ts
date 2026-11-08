/**
 * CSS sanity guard: catches malformed output from code-generation /
 * migration scripts before it can ship.
 *
 * Origin: PR #106's migration script wrote literal `\1` regex
 * backreferences into 17 component CSS declarations
 * (`rgba(var(--color-primary-rgb), \1)`), producing invalid CSS that
 * silently dropped every affected box-shadow / background rule.
 * The bug shipped in v2.1.0 and v2.1.1 and was only found by audit.
 *
 * This test fails if any component stylesheet contains a literal
 * backreference (`\1`, `\2`, ...) or a stray bare number after a
 * closing var() bracket in a box-shadow declaration.
 */
import fs from 'fs';
import path from 'path';

const componentsDir = path.join(__dirname, '..', 'src', 'components');

function collectCssFiles(dir: string): string[] {
  const out: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...collectCssFiles(full));
    else if (entry.name.endsWith('.css')) out.push(full);
  }
  return out;
}

describe('css sanity (migration-script output guard)', () => {
  const files = collectCssFiles(componentsDir);

  it('found component stylesheets to scan', () => {
    expect(files.length).toBeGreaterThan(30);
  });

  it('contains no literal regex backreferences', () => {
    const offenders: string[] = [];
    for (const file of files) {
      const text = fs.readFileSync(file, 'utf8');
      const lines = text.split('\n');
      lines.forEach((line, i) => {
        // A literal \1..\9 that is not inside a content:"" string
        if (/\\[1-9]/.test(line) && !/content\s*:/i.test(line)) {
          offenders.push(`${path.relative(componentsDir, file)}:${i + 1}: ${line.trim()}`);
        }
      });
    }
    expect(offenders).toEqual([]);
  });

  it('contains no stray bare number after a var() close in box-shadow', () => {
    const offenders: string[] = [];
    for (const file of files) {
      const text = fs.readFileSync(file, 'utf8');
      const lines = text.split('\n');
      lines.forEach((line, i) => {
        // box-shadow: ... var(...)) 19;  <- trailing bare integer (invalid:
        // box-shadow allows at most 4 lengths, and none may follow the color)
        const m = line.match(/box-shadow:[^;]*\)\s*\d+\s*;/);
        if (m && !/var\(--[a-z-]+,\s*[\d.]+(px|rem|em|%|s|ms)\s*\)/i.test(m[0])) {
          offenders.push(`${path.relative(componentsDir, file)}:${i + 1}: ${line.trim()}`);
        }
      });
    }
    expect(offenders).toEqual([]);
  });

  it('every rgba(var(--*-rgb), A) alpha is a plain number', () => {
    const offenders: string[] = [];
    for (const file of files) {
      const text = fs.readFileSync(file, 'utf8');
      const lines = text.split('\n');
      lines.forEach((line, i) => {
        const m = line.match(/rgba\(\s*var\(--[a-z-]+-rgb\)\s*,\s*([^)]*)\)/);
        if (m && !/^\s*(0?\.\d+|0|1|[\d.]+%)\s*$/.test(m[1])) {
          offenders.push(`${path.relative(componentsDir, file)}:${i + 1}: alpha="${m[1].trim()}"`);
        }
      });
    }
    expect(offenders).toEqual([]);
  });
});
