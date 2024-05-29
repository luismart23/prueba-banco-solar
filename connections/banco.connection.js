import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config();

const { Pool } = pg;
const pool = new Pool({
    connectionString: process.env.CONNECTION_URL,
});

async function verificarConexionDB() {
    try {
        const res = await pool.query('SELECT NOW()');
        console.log('DB conectada:', res.rows[0]);
    } catch (error) {
        console.error('Error de conexión a la base de datos:', error);
        throw new Error('Error de conexión a la base de datos');
    }
}

verificarConexionDB().catch(error => {
    console.error('Error inesperado al verificar la conexión de la base de datos:', error);
});

export default pool;



