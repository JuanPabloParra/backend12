const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

// URL de conexión a MongoDB Atlas
const dbUrl = 'mongodb+srv://admin:admin@cluster0.i94n2hx.mongodb.net/MyFirstDatabase';

// Opciones de conexión
const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Conexión a la base de datos
mongoose.connect(dbUrl, connectionParams)
  .then(() => {
    console.log('Conectado a MongoDB');
  })
  .catch((error) => {
    console.error('Error de conexión a MongoDB:', error);
  });

// Definir el esquema del mensaje
const messageSchema = new mongoose.Schema({
  content: String,
});

// Definir el modelo de mensaje
const Message = mongoose.model('Message', messageSchema);

// Middleware para analizar el cuerpo de las solicitudes como JSON
app.use(express.json());

// Ruta para guardar un nuevo mensaje
app.post('/api/messages', async (req, res) => {
  try {
    const { content } = req.body;

    // Crear una nueva instancia del modelo de mensaje
    const newMessage = new Message({ content });

    // Guardar el mensaje en la base de datos
    await newMessage.save();

    res.status(201).json({ message: 'Mensaje guardado correctamente' });
  } catch (error) {
    console.error('Error al guardar el mensaje:', error);
    res.status(500).json({ error: 'Error al guardar el mensaje' });
  }
});

// Ruta para obtener todos los mensajes
app.get('/api/messages', async (req, res) => {
  try {
    // Obtener todos los mensajes de la base de datos
    const messages = await Message.find();

    res.json(messages);
  } catch (error) {
    console.error('Error al obtener los mensajes:', error);
    res.status(500).json({ error: 'Error al obtener los mensajes' });
  }
});

// Ruta para servir los archivos estáticos de React
app.use(express.static(path.join(__dirname, 'build')));

// Ruta para la página de menú
app.get('/menu', (req, res) => {
  // Renderiza el archivo index.html de React
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Iniciar el servidor en el puerto especificado en las variables de entorno o en el puerto 3000 por defecto
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Servidor iniciado en el puerto', port);
});
