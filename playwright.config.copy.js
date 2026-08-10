// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */

export default defineConfig({
    testDir: './tests',
    timeout: 40 * 1000,
    expect: {
      timeout: 40 * 1000
    },

    reporter: [
      ['html', { open: 'always' }],
      ['list']
    ],

    projects: [
      {
        name: 'Firefox',
        use: {
          browserName: 'firefox',
          headless: true,
          screenshot: 'only-on-failure',
          trace: 'on',
          video: 'on-first-retry',

        }
      },
      {
        name: 'chromium',
        use: {
          browserName: 'chromium',
          headless: false,
          screenshot: 'only-on-failure',
          trace: 'on',
          video: 'on-first-retry',

        }
      }


    ]


  })


