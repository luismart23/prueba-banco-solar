import { createUser, getUsers, updateUser, deleteUser, transferAmount, getTransfers } from '../database/banco.database.js';

export const obtenerUsuarios = async (req, res, next) => {
    try {
        const usuarios = await getUsers();
        res.status(200).json(usuarios);
    } catch (error) {
        next(error);
    }
};

export const agregarUsuario = async (req, res, next) => {
    try {
        const { nombre, balance } = req.body;
        const nuevoUsuario = await createUser(nombre, balance);
        res.status(201).json(nuevoUsuario);
    } catch (error) {
        next(error);
    }
};

export const actualizarUsuario = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { nombre, balance } = req.body;
        const usuarioActualizado = await updateUser(id, nombre, balance);
        res.status(200).json(usuarioActualizado);
    } catch (error) {
        next(error);
    }
};

export const eliminarUsuario = async (req, res, next) => {
    try {
        const { id } = req.params;
        await deleteUser(id);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

export const realizarTransferencia = async (req, res, next) => {
    try {
        const { emisor, receptor, monto } = req.body;
        await transferAmount(emisor, receptor, monto);
        res.status(201).json({ message: 'Transferencia realizada con éxito' });
    } catch (error) {
        next(error);
    }
};

export const obtenerTransferencias = async (req, res, next) => {
    try {
        const transferencias = await getTransfers();
        res.status(200).json(transferencias);
    } catch (error) {
        next(error);
    }
};
