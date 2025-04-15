// migration.js - Script para migrar contraseñas a bcrypt
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');

// Configuración de la base de datos
const dbConfig = {
  host: 'localhost',
  user: 'root',      // Cambia esto a tu usuario de MySQL
  password: '',      // Cambia esto a tu contraseña de MySQL
  database: 'loan_management'
};

// Contraseñas conocidas con sus hashes actuales
const passwordMappings = {
  '5b0bc5ba50bd5407865a34aa55486c5c9078e9b5e18039f39a31b5e1e1d069f0': '123456',
  '71a7c5e24a67e4da5b9fa5bb1f5ad26a984d26a4a857b2797da5626c1c2aee30': '1234'
};

// Función para generar hash bcrypt
const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

// Función principal de migración
async function migratePasswords() {
  // Crear conexión a la BD
  const connection = await mysql.createConnection(dbConfig);
  
  try {
    console.log('Iniciando migración de contraseñas...');
    
    // Obtener todos los usuarios
    const [users] = await connection.execute('SELECT id, username, password FROM users');
    console.log('Usuarios obtenidos:', users);
    let migratedCount = 0;
    
    // Procesar cada usuario
    for (const user of users) {
      // Verificar si la contraseña actual coincide con alguna de nuestras conocidas
      const plainPassword = passwordMappings[user.password];
      
      if (plainPassword) {
        // Generar nueva contraseña con bcrypt
        const bcryptHash = hashPassword(plainPassword);
        
        // Actualizar en la base de datos
        await connection.execute(
          'UPDATE users SET password = ? WHERE id = ?',
          [bcryptHash, user.id]
        );
        
        console.log(`Usuario ${user.email} actualizado correctamente`);
        migratedCount++;
      }
    }
    
    console.log(`Migración completada. ${migratedCount} de ${users.length} contraseñas actualizadas.`);
    
  } catch (error) {
    console.error('Error durante la migración:', error);
  } finally {
    // Cerrar conexión
    await connection.end();
  }
}

// Ejecutar la migración
migratePasswords();