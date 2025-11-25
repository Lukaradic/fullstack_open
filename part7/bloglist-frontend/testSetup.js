import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

//  extends vitest expect and adds additional DOM specific checks, for example toHaveClass or toHaveTextContent
expect.extend(matchers);

// Cleanup after each test case
afterEach(() => {
  cleanup();
});
