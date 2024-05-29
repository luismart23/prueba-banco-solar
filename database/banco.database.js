import pool from '../connections/banco.connection.js';

export const createUser = async (nombre, balance) => {
    try {
        const query = 'INSERT INTO usuarios (nombre, balance) VALUES ($1, $2) RETURNING *';
        const { rows } = await pool.query(query, [nombre, balance]);
        return rows[0];
    } catch (error) {
        throw new Error(`Error al crear usuario: ${error.message}`);
    }
};

export const getUsers = async () => {
    try {
        const query = 'SELECT * FROM usuarios';
        const { rows } = await pool.query(query);
        return rows;
    } catch (error) {
        throw new Error(`Error al obtener usuarios: ${error.message}`);
    }
};

export const updateUser = async (id, nombre, balance) => {
    try {
        const query = 'UPDATE usuarios SET nombre = $1, balance = $2 WHERE id = $3 RETURNING *';
        const { rows } = await pool.query(query, [nombre, balance, id]);
        return rows[0];
    } catch (error) {
        throw new Error(`Error al actualizar usuario: ${error.message}`);
    }
};

export const deleteUser = async (id) => {
    try {
        const query = 'DELETE FROM usuarios WHERE id = $1';
        await pool.query(query, [id]);
    } catch (error) {
        throw new Error(`Error al eliminar usuario: ${error.message}`);
    }
};

export const transferAmount = async (emisor, receptor, monto) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        await client.query('UPDATE usuarios SET balance = balance - $1 WHERE id = $2', [monto, emisor]);
        await client.query('UPDATE usuarios SET balance = balance + $1 WHERE id = $2', [monto, receptor]);
        await client.query('INSERT INTO transferencias (emisor, receptor, monto, fecha) VALUES ($1, $2, $3, NOW())', [emisor, receptor, monto]);
        await client.query('COMMIT');
    } catch (error) {
        await client.query('ROLLBACK');
        throw new Error(`Error al transferir saldo: ${error.message}`);
    } finally {
        client.release();
    }
};

export const getTransfers = async () => {
    try {
        const query = 'SELECT * FROM transferencias';
        const { rows } = await pool.query(query);
        return rows;
    } catch (error) {
        throw new Error(`Error al obtener transferencias: ${error.message}`);
    }
};


