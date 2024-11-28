// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Controllers
const solicitudController = require("./controllers/solicitudController");
const amigosController = require("./controllers/amigosController");

require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Rutas
app.post('/solicitud/enviar', solicitudController.enviarSolicitud);
app.post('/solicitud/ver', solicitudController.verSolicitudes);
app.post('/solicitud/aceptar', solicitudController.aceptarSolicitud);
app.post('/solicitud/rechazar', solicitudController.rechazarSolicitud);

app.post('/amistad/eliminar', amigosController.eliminarAmigo);
app.post('/amistad/amigos', amigosController.verAmigos);
app.post('/amistad/perfil', amigosController.verPerfilAmigo);


//app.post('/amigos/todos', amistadRoutes);
//app.post('/amigos/uno', amistadRoutes);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Servidor en ejecución en el puerto ${PORT}`);
  });