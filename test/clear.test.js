const { Slack } = require('..');
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
