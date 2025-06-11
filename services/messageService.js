class MessageService {
  constructor() {
    this.messagesByUser = new Map(); // Map<userId, message[]>
    this.currentId = 1;
  }

  getAllMessages(userId) {
    return this.messagesByUser.get(userId) || [];
  }

  addMessage({ userId, user, text }) {
    const message = {
      id: this.currentId++,
      user,
      text,
      timestamp: new Date().toISOString(),
    };

    if (!this.messagesByUser.has(userId)) {
      this.messagesByUser.set(userId, []);
    }

    this.messagesByUser.get(userId).push(message);
    return message;
  }
}

module.exports = MessageService;
