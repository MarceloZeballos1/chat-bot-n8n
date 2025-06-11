const MessageService = require('../services/messageService');
const WebhookClient = require('../services/webhookClient');

class ChatController {
  constructor() {
    this.messageService = new MessageService();
    this.webhookClient = new WebhookClient();
  }

  getMessages(req, res) {
    const messages = this.messageService.getAllMessages();
    res.json(messages);
  }

  async postMessage(req, res) {
    const { user, text } = req.body;

    if (!user || !text) {
      return res.status(400).json({ error: 'Faltan campos obligatorios (user, text)' });
    }

    const userMessage = this.messageService.addMessage({
      user,
      text,
    });

    try {
      const webhookResponse = await this.webhookClient.sendMessage(text);

      const botMessage = this.messageService.addMessage({
        user: 'IA',
        text: webhookResponse.text || 'Sin respuesta',
      });

      res.status(201).json(botMessage);

    } catch (error) {
      console.error('Error al contactar con n8n:', error);
      res.status(500).json({ error: 'Error procesando el mensaje con IA' });
    }
  }
}

module.exports = ChatController;