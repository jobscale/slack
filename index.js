require('@jobscale/core');
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
    const url = `https://hooks.slack.com/services/${this.env.access}`;
    const options = {
      method: 'POST',
      'Content-Type': 'application/json',
      body: JSON.stringify({ ...template, ...param }),
    };
    return fetch(url, options)
    .then(res => {
      if (!res.ok) throw new Error(res.statusText);
      return res.text()
      .then(body => ({
        status: res.status, statusText: res.statusText, body,
      }));
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
        if (count) json.messages.length = count;
        summery.length = json.messages.length;
        summery.total += summery.length;
        logger.info(summery);
        if (count) summery.length = 0;
        return this.removeMessages(app.client, json.messages);
      });
    }
    return { deleted: summery.total };
  }
}

module.exports = {
  Slack,
};
