import express from "express";
import {
    formularioLogin,
    formularioRegistro,
    registrar,
    formularioOlvidePassword
    } from "../controllers/usuarioController.js";

const router = express.Router();

router.get('/login', formularioLogin);
router.get('/registro', formularioRegistro);
router.route('/registro').get(formularioRegistro).post(registrar)
router.get('/olvide-password', formularioOlvidePassword);


export default router;