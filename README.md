# @jobscale/slack

## install

```
npm i @jobscale/slack
```

## example

### send slack channel

```
const { Slack } = require('..');
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
```

### clear slack channel

```
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
```
