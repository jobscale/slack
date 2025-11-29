import fs from 'fs';
import { logger } from '@jobscale/logger';
import { Slack } from '../index.js';

const env = JSON.parse(fs.readFileSync('test/env.json').toString());

describe('test slack send', () => {
  it('toStrictEqual prompt', () => {
    const params = { text: 'jest test send' };
    return new Slack(env).send(params)
    .then(res => {
      const prompt = { status: 200, statusText: 'OK', body: 'ok' };
      logger.info(res);
      expect(res).toStrictEqual(prompt);
    });
  });
});
