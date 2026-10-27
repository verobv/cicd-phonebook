import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e-tests',
  webServer: {
    command: 'npx cross-env NODE_ENV=test npm start',
    url: 'http://localhost:3001',
    reuseExistingServer: !process.env.CI,
  },
  use: {
    baseURL: 'http://localhost:3001/',
  },
});