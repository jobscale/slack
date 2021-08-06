# @jobscale/slack

## install

```
npm i @jobscale/slack
```

## examples

### send slack channel

```
const { Slack } = require('@jobscale/slack');
const env = require('./env.json');

const params = { text: 'jest test send' };
return new Slack(env).send(params)
.then(res => {
  logger.info(res);
});
```

### clear slack channel

```
const { Slack } = require('@jobscale/slack');
const env = require('./env.json');

return new Slack(env).clearChannel()
.then(res => {
  logger.info(res);
});
```
