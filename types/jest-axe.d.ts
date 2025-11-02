declare module 'jest-axe' {
  import { AxeResults } from 'axe-core';
  export function axe(
    container: HTMLElement | Document | string,
    options?: unknown
  ): Promise<AxeResults>;
  export const toHaveNoViolations: (results: AxeResults) => {
    pass: boolean;
    message(): string;
  };
}

declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveNoViolations(): R;
    }
  }
}

export {};
