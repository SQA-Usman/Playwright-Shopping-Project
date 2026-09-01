// @ts-check
import { defineConfig } from '@playwright/test';

const config = defineConfig({
  testDir: './tests',

  timeout: 40 * 1000,

  expect: {
    timeout: 40 * 1000
  },

  reporter: [
    ['html', { open: 'never' }],
    ['list']
  ],

  projects: [
    {
      name: 'chromium',

      use: {
        headless: true,
        screenshot: 'only-on-failure',
        trace: 'on',
        video: 'on-first-retry'
      }
    }
  ]
});

module.exports = config;