const { logger } = require('@jobscale/logger');
const { Slack } = require('..');
/* eslint-disable import/no-unresolved */
const env = require('./env.json');

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
