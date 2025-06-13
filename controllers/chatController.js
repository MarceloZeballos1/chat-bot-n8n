const MessageService = require('../services/messageService');
const WebhookClient = require('../services/webhookClient');

class ChatController {
  constructor() {
    this.messageService = new MessageService();
    this.webhookClient = new WebhookClient();
  }

  getMessages(req, res) {
    const { userId } = req.query;
    
    if (!userId) {
      return res.status(400).json({ error: 'Se requiere userId' });
    }

    const messages = this.messageService.getMessages(userId);
    res.json(messages);
  }

  async postMessage(req, res) {
    const { userId, userName, text } = req.body;

    if (!userId || !userName || !text) {
      return res.status(400).json({ 
        error: 'Faltan campos obligatorios (userId, userName, text)' 
      });
    }

    const userMessage = this.messageService.addMessage({
      userId,
      userName,
      text,
    });

    try {
      const webhookResponse = await this.webhookClient.sendMessage(text, userId);

      const botMessage = this.messageService.addMessage({
        userId: 'IA',
        userName: 'Azu',
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