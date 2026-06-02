import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({path: path.resolve(__dirname, '.env') });

if(!process.env.BASE_URL)
{
  throw new Error("BASE_URL is not set in .env file");
}

export const BASE_URL = process.env.BASE_URL;

export default defineConfig({
  testDir: './tests',
  
  /* Timeout configurations - CRITICAL for CI */
  timeout: process.env.CI ? 60000 : 30000, // 60 seconds in CI, 30 locally
  expect: {
    timeout: process.env.CI ? 15000 : 5000, // 15 seconds in CI, 5 locally
  },
  
  /* Run tests in files in parallel */
  fullyParallel: true,
  
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  
  /* Reporter to use */
  reporter: [['html'], ['json', { outputFile: 'test-results.json' }]],
  
  /* Shared settings for all projects */
  use: {
    /* Base URL to use in actions */
    baseURL: BASE_URL,
    
    /* Collect trace when retrying the failed test */
    trace: 'on-first-retry',
    
    /* Take screenshot on failure */
    screenshot: 'only-on-failure',
    
    /* Record video on failure */
    video: 'retain-on-failure',
    
    /* Action timeout (clicks, fills, etc.) */
    actionTimeout: 15000,
    
    /* Navigation timeout */
    navigationTimeout: 30000,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        /* CI-specific launch options */
        launchOptions: {
          args: [
            '--disable-dev-shm-usage', // Helps with Docker/CI memory issues
            '--no-sandbox', // Required for CI environments
            '--disable-setuid-sandbox',
          ],
        },
      },
    }
  ],
});