const { Slack } = require('..');
/* eslint-disable import/no-unresolved */
const env = require('./env.json');

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
