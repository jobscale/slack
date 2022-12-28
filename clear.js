const { logger } = require('@jobscale/logger');
const { Slack } = require('.');
const env = require('./test/env.json');

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

const main = () => {
  return clear()
  .then(res => {
    logger.info(res);
  });
};

main();
