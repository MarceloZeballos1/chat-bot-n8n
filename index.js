const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const chatRoutes = require('./routes/chatRoutes');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Usamos las rutas
app.use('/messages', chatRoutes);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
