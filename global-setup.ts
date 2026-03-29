import { request } from '@playwright/test';
import { Logger } from './utils/logger';

const logger = new Logger('GlobalSetup');

async function globalSetup() {
  logger.info('Running global setup - health check');

  const context = await request.newContext({
    baseURL: process.env.BASE_URL,
  });

  try {
    const response = await context.get('/');

    if (response.ok()) {
      logger.info(`Health check passed - ${process.env.BASE_URL} is up (${response.status()})`);
    } else {
      logger.error(`Health check failed - status ${response.status()}`);
      throw new Error(`Site is down: ${process.env.BASE_URL} returned ${response.status()}`);
    }
  } finally {
    await context.dispose();
  }
}

export default globalSetup;
