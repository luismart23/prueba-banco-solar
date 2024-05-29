import express from 'express';
import { obtenerUsuarios, agregarUsuario, actualizarUsuario, eliminarUsuario, realizarTransferencia, obtenerTransferencias } from '../controllers/banco.controller.js';



const router = express.Router();

router.get('/usuarios', obtenerUsuarios);
router.post('/usuario', agregarUsuario);
router.put('/usuario/:id', actualizarUsuario);
router.delete('/usuario/:id', eliminarUsuario);
router.post('/transferencia', realizarTransferencia);
router.get('/transferencias', obtenerTransferencias);

export default router;


