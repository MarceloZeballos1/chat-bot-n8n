const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const chatRoutes = require('./routes/chatRoutes');

const app = express();
const PORT = 3000;

app.use(cors());

const path = require('path');

// Servir archivos estáticos desde la raíz del proyecto
app.use(express.static(path.join(__dirname)));

// Ruta raíz para enviar el index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});


app.use(bodyParser.json());

// Usamos las rutas
app.use('/messages', chatRoutes);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
