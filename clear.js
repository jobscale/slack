import { logger } from '@jobscale/logger';
import { Slack } from './index.jp';
import env from './test/env.json';

const slack = new Slack(env);
const clear = async () => {
  const opt = { total: 0 };
  return slack.clearChannel(20)
  .then(async res => {
    opt.total += res.deleted;
    if (res.deleted) await clear();
    return opt;
  });
};

const main = () => clear()
.then(res => logger.info(res));

main();
