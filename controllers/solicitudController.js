const supabaseService = require("../services/supabaseService");
const usuariosService = require("../services/usuariosService");

exports.enviarSolicitud = async (req, res) => {
  try {
    const { userId, correo } = req.body;

    const friendId = await usuariosService.getUserIdByEmail(correo);

    const solicitud = await supabaseService.crearSolicitud(userId, friendId);

    res.status(200).json({ message: "Solicitud de amistad enviada", solicitud });
    
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.verSolicitudes = async (req, res) => {
  try {
    const { userId } = req.body; // El ID del usuario que recibe las solicitudes

    // Obtenemos las solicitudes pendientes donde el usuario es el receptor
    const solicitudes = await supabaseService.obtenerSolicitudesPendientes(userId);

    res.status(200).json({ solicitudes });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.aceptarSolicitud = async (req, res) => {
  try {
    const { userId, solicitudId } = req.body;

    const solicitud = await supabaseService.obtenerSolicitudPorId(solicitudId);

    await supabaseService.agregarAmigos(solicitud.sender_id, userId);

    await supabaseService.eliminarSolicitud(solicitudId);

    res.status(200).json({ message: "Solicitud de amistad aceptada" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.rechazarSolicitud = async (req, res) => {
  try {
    const { userId, solicitudId } = req.body;

    const solicitud = await supabaseService.obtenerSolicitudPorId(solicitudId);

    await supabaseService.eliminarSolicitud(solicitudId);

    res.status(200).json({ message: "Solicitud de amistad rechazada" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
