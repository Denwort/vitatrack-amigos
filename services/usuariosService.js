const axios = require('axios');

exports.getUserIdByEmail = async (correo) => {
  try {
    const response = await axios.post(`${process.env.USERS_SERVICE_URL}/idByEmail`, { correo });
    return response.data;
  } catch (error) {
    console.error('Error al llamar al microservicio de usuarios:', error.response?.data || error.message);
    throw new Error('No se pudo obtener el ID del usuario.');
  }

};

exports.getProfileById = async (userId) => {
  try {
    const response = await axios.post(`${process.env.USERS_SERVICE_URL}/profileById`, { userId });
    return response.data;
  } catch (error) {
    console.error('Error al llamar al microservicio de usuarios:', error.response?.data || error.message);
    throw new Error('No se pudo obtener el ID del usuario.');
  }

};
