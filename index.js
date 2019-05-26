require('core');
const FormData = require('form-data');

class Slack {
  constructor(env) {
    this.env = Object.assign({}, env);
  }
  send(param) {
    const url = `https://hooks.slack.com/services/${this.env.access}`;
    const body = JSON.stringify(param, null, 2);
    const options = {
      method: 'POST',
      'Content-Type': 'application/json',
      body,
    };
    return fetch(url, options)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.text();
    })
    .catch(e => e.message);
  }
  getHistory(count) {
    const url = 'https://slack.com/api/channels.history';
    const param = Object.assign({}, this.env);
    delete param.access;
    const form = new FormData();
    form.append('token', param.token);
    form.append('channel', param.channel);
    form.append('count', count);
    const options = {
      method: 'POST',
      body: form,
    };
    return fetch(url, options)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    });
  }
  spacer(delay) {
    const promise = promiseGen();
    setTimeout(promise.resolve, delay, { delay });
    return promise.instance;
  }
  deleteMessage(message) {
    const url = 'https://slack.com/api/chat.delete';
    const param = Object.assign({}, this.env);
    delete param.access;
    const form = new FormData();
    form.append('token', param.token);
    form.append('channel', param.channel);
    form.append('ts', message.ts);
    const options = {
      method: 'POST',
      body: form,
    };
    return fetch(url, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .catch(e => e.message)
    .then(info => logger.info(info));
  }
  async deleteChat(messages) {
    const param = { count: 0 };
    for (let i = messages.length - 1; i > 100; i--) {
      await this.deleteMessage(messages[i])
      .then(() => this.spacer(800));
      param.count++;
    }
    return { ok: param.count };
  }
}
module.exports = {
  Slack,
};
