const fetch = require('node-fetch');

class WebhookClient {
  constructor() {
    this.webhookUrl = 'https://dtt-automate.prod.dtt.tja.ucb.edu.bo/webhook/ia-chat';
  }

  async sendMessage(messageText, userId) {
    const response = await fetch(this.webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        message: messageText,
        userId 
      }),
    });

    const data = await response.json();
    return data;
  }
}

module.exports = WebhookClient; 