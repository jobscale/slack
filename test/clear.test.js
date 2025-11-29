import fs from 'fs';
import { logger } from '@jobscale/logger';
import { Slack } from '../index.js';

const env = JSON.parse(fs.readFileSync('test/env.json').toString());

describe('test slack clear channel', () => {
  it('toBe prompt', () => {
    const prompt = 1;
    return new Slack(env).clearChannel(prompt)
    .then(res => {
      logger.info(res);
      expect(res.deleted).toBe(prompt);
    });
  });
});
