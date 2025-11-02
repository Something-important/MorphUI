import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Button } from '../src/components';

describe('Accessibility smoke tests', () => {
  it('Button has no detectable a11y violations', async () => {
    const { container } = render(<Button>Test</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
