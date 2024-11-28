const { createClient } = require("@supabase/supabase-js");
require('dotenv').config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

exports.crearSolicitud = async (userId, friendId) => {
  const { data, error } = await supabase
    .from("solicitudes") // Asegúrate de que esta tabla exista en tu base de datos
    .insert([
      { sender_id: userId, receiver_id: friendId } // Aquí puedes agregar más campos si es necesario
    ])
    .select("*");

  if (error) throw new Error(error.message);
  return data[0]; // Devuelve la solicitud creada
};

exports.obtenerSolicitudesPendientes = async (userId) => {
  const { data, error } = await supabase
    .from("solicitudes")
    .select("*")
    .eq("receiver_id", userId) // Filtramos las solicitudes donde el usuario es el receptor

  if (error) throw new Error(error.message);
  return data; // Devuelve las solicitudes encontradas
};

exports.obtenerSolicitudPorId = async (solicitudId) => {
  const { data, error } = await supabase
    .from("solicitudes")
    .select("*")
    .eq("id", solicitudId)
    .single(); // Obtiene una sola solicitud por su ID

  if (error) throw new Error(error.message);
  return data; // Devuelve la solicitud encontrada
};

exports.agregarAmigos = async (userId1, userId2) => {
  // Insertamos en la tabla de amigos, creando la relación bidireccional
  const { data, error } = await supabase
    .from("amigos")
    .upsert([  // 'upsert' asegura que si ya existe una relación se actualice
      { user_id: userId1, friend_id: userId2 },
      { user_id: userId2, friend_id: userId1 },
    ]);

  if (error) throw new Error(error.message);
  return data; // Devuelve la relación agregada
};

exports.eliminarSolicitud = async (solicitudId) => {
  const { data, error } = await supabase
    .from("solicitudes")
    .delete()  // Eliminamos la solicitud
    .eq("id", solicitudId);

  if (error) throw new Error(error.message);
  return data; // Devuelve el resultado de la eliminación
};





exports.obtenerAmistad = async (userId, amigoId) => {
  const { data, error } = await supabase
    .from("amigos")
    .select("*")
    .or(`user_id.eq.${userId},friend_id.eq.${amigoId}`) // Primera condición
    .or(`user_id.eq.${amigoId},friend_id.eq.${userId}`)  // Se agrega la segunda condición correctamente

  if (error) throw new Error(`Error al obtener amistad: ${error.message}`);
  return data;
};


exports.obtenerAmigos = async (userId) => {
  const { data, error } = await supabase
  .from("amigos")
  .select("user_id, friend_id")
  .eq("user_id", userId); // Filtra solo donde user_id sea igual a userId

  if (error) throw new Error(`Error al obtener amistad: ${error.message}`);
  return data;
};


exports.eliminarAmigos = async (userId, amigoId) => {
  const { data, error } = await supabase
    .from("amigos")
    .delete()
    .or(`user_id.eq.${userId},friend_id.eq.${amigoId}`)
    
  const { data2, error2 } = await supabase
    .from("amigos")
    .delete()
    .or(`user_id.eq.${amigoId},friend_id.eq.${userId}`);

  if (error) throw new Error(`Error al eliminar amistad: ${error.message}`);
  if (error2) throw new Error(`Error al eliminar amistad: ${error2.message}`);
  return;
};
