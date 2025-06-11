const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const chatRoutes = require('./routes/chatRoutes');

const app = express();
const PORT = 18569;

// Permitir CORS
app.use(cors());

// Servir archivos estáticos
app.use(express.static(path.join(__dirname)));

// Ruta principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Body parser
app.use(bodyParser.json());

// Rutas API
app.use('/messages', chatRoutes);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});