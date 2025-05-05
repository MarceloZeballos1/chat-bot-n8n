class MessageService {
    constructor() {
      this.messages = [];
      this.currentId = 1;
    }
  
    getAllMessages() {
      return this.messages;
    }
  
    addMessage({ user, text }) {
      const message = {
        id: this.currentId++,
        user,
        text,
        timestamp: new Date().toISOString(),
      };
      this.messages.push(message);
      return message;
    }
  }
  
  module.exports = MessageService;
  