require('dotenv').config();
const { neon } = require('@neondatabase/serverless');

const sql = neon(process.env.DATABASE_URL);

const connection = {
  query: async (sqlQuery, params) => {
    return await sql.query(sqlQuery, params);
  }
};

module.exports = {
    connect: () => {
      console.log('Conectado a la base de datos Neon');
    },
    query: async (sqlQuery, params) => {
      return await connection.query(sqlQuery, params);
    },
    getConnection: () => {
      return connection;
    }
};
