import { logger } from '@jobscale/logger';
import { App, LogLevel } from '@slack/bolt';

const template = {
  icon_emoji: ':badger:',
  username: 'Unhealthy',
  text: '',
  attachments: [{
    fallback: '',
  }],
};

export class Slack {
  constructor(env) {
    if (env) this.config(env);
  }

  config(env) {
    this.env = { ...env };
  }

  send(param) {
    const url = `https://hooks.slack.com/services/${this.env.access}`;
    const body = { ...template, ...param };
    const options = {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    };
    return fetch(url, options).then(async res => ({
      status: res.status, statusText: res.statusText, body: await res.text(),
    }));
  }

  removeMessages(client, messages) {
    return Promise.all(messages.map(message => client.chat.delete({
      channel: this.env.channelId,
      ts: message.ts,
    })));
  }

  async clearChannel(count) {
    const app = new App({
      token: this.env.token,
      logLevel: LogLevel.DEBUG,
      signingSecret: this.env.secret,
    });
    const summery = { total: 0, length: 'first' };
    for (; summery.length;) {
      await app.client.conversations.history({
        channel: this.env.channelId,
        limit: 50,
      })
      .then(json => {
        const { messages } = json;
        if (count && messages.length > count) messages.length = count;
        summery.length = messages.length;
        summery.total += summery.length;
        logger.info(summery);
        if (count) summery.length = 0;
        return this.removeMessages(app.client, messages);
      });
    }
    return { deleted: summery.total };
  }
}

export const slack = new Slack();
export default { Slack, slack };
