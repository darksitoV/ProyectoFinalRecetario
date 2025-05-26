const { Sequelize } = require('sequelize');

require('dotenv').config();

// Configuración para Aiven PostgreSQL
const sequelize = new Sequelize(
  process.env.DB_NAME, // Nombre de la DB en Aiven
  process.env.DB_USER, // Usuario de Aiven
  process.env.DB_PASSWORD, // Contraseña de Aiven
  {
    host: process.env.DB_HOST, // Host de Aiven
    port: process.env.DB_PORT, // Puerto de Aiven (ver en el dashboard)
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true, // Aiven siempre requiere SSL
        rejectUnauthorized: false, // Necesario para evitar errores de certificado
      },
    },
    logging: console.log, // opcional: para ver consultas SQL en consola
  }
);

// Prueba la conexión
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión exitosa a Aiven con Sequelize!');
  } catch (error) {
    console.error('❌ Error de conexión:', error);
  }
}

testConnection();

module.exports = sequelize;