const express = require('express');
const router = express.Router();
const ChatController = require('../controllers/chatController');

const chatController = new ChatController();

// GET: Obtener todos los mensajes
router.get('/', (req, res) => chatController.getMessages(req, res));

// POST: Enviar mensaje y procesar respuesta de IA
router.post('/', (req, res) => chatController.postMessage(req, res));

module.exports = router;
