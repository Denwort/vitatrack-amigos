// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Controllers
const solicitudController = require("./controllers/solicitudController");
const amistadController = require("./controllers/amistadController");

require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Rutas
app.post('/solicitud/enviar', solicitudController.enviarSolicitud);
app.get('/solicitud/ver', solicitudController.verSolicitudes);
app.post('/solicitud/aceptar', solicitudController.aceptarSolicitud);
app.post('/solicitud/rechazar', solicitudController.rechazarSolicitud);

app.post('/amistad/eliminar', amistadController.eliminarAmigo);
app.post('/amistad/amigos', amistadController.verAmigos);
app.post('/amistad/perfil', amistadController.verPerfilAmigo);


//app.post('/amigos/todos', amistadRoutes);
//app.post('/amigos/uno', amistadRoutes);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Servidor en ejecución en el puerto ${PORT}`);
  });