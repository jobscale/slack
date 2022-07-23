const { logger } = require('@jobscale/core');
const { App, LogLevel } = require('@slack/bolt');

const template = {
  icon_emoji: ':badger:',
  username: 'Unhealthy',
  text: '',
  attachments: [{
    fallback: '',
  }],
};

class Slack {
  constructor(env) {
    this.env = { ...env };
  }

  send(param) {
    const options = {
      url: `https://hooks.slack.com/services/${this.env.access}`,
      method: 'POST',
      'Content-Type': 'application/json',
      data: JSON.stringify({ ...template, ...param }),
    };
    return fetch(options)
    .then(res => {
      return {
        status: res.status,
        statusText: res.statusText,
        body: res.data,
      };
    });
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

module.exports = {
  Slack,
};
