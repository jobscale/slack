# @jobscale/slack

## install

```
npm i @jobscale/slack
```

## examples

### send slack channel

```
import fs from 'fs';
import { logger } from '@jobscale/logger';
import { Slack } from '@jobscale/slack';

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
```

### clear slack channel

```
import fs from 'fs';
import { logger } from '@jobscale/logger';
import { Slack } from '@jobscale/slack';

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
```
