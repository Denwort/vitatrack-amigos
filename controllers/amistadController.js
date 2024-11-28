const supabaseService = require("../services/supabaseService");
const usuariosService = require("../services/usuariosService");

exports.eliminarAmigo = async (req, res) => {
    try {
      const { userId, amigoId } = req.body;
  
      // Verificamos si ya son amigos
      const amistadExistente = await supabaseService.obtenerAmistad(userId, amigoId);
  
      if (!amistadExistente) {
        throw new Error("No eres amigo de esta persona.");
      }
  
      await supabaseService.eliminarAmigos(userId, amigoId);
  
      res.status(200).json({ message: "Amigo eliminado correctamente" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  
  exports.verAmigos = async (req, res) => {
    try {
      const { userId } = req.body;
  
      const amigos = await supabaseService.obtenerAmigos(userId);
      
      const perfiles = await Promise.all(
        amigos.map(async (amigo) => {
          return await usuariosService.getProfileById(amigo.friend_id);
        })
      );
  
      res.status(200).json( perfiles );
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };


  exports.verPerfilAmigo = async (req, res) => {
    try {
      const { userId, friendId } = req.body;
  
      const amistad = await supabaseService.obtenerAmistad(userId, friendId);
      if (!amistad) {
        return res.status(400).json({ error: "No son amigos" });
      }
  
      const perfilAmigo = await usuariosService.getProfileById(friendId);
      if (!perfilAmigo) {
        return res.status(404).json({ error: "Amigo no encontrado" });
      }
  
      res.status(200).json({ perfil: perfilAmigo });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };