class MessageService {
  constructor() {
    this.sessions = new Map(); // Almacena chats por usuario
  }

  getMessages(userId) {
    if (!this.sessions.has(userId)) {
      this.sessions.set(userId, {
        messages: [],
        currentId: 1,
        userName: 'Usuario'
      });
      return [];
    }
    return this.sessions.get(userId).messages;
  }

  addMessage({ userId, userName, text }) {
    if (!this.sessions.has(userId)) {
      this.sessions.set(userId, {
        messages: [],
        currentId: 1,
        userName
      });
    }

    const session = this.sessions.get(userId);
    const message = {
      id: session.currentId++,
      user: userId,
      userName,
      text,
      timestamp: new Date().toISOString(),
    };
    
    session.messages.push(message);
    return message;
  }
}

module.exports = MessageService;