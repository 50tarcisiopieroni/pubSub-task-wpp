import { Router } from "express";
import UsuarioController from "../controller/usuarioController";
import { IUsuario } from "models/usuarioModel";

const usuarioController = new UsuarioController();

const UsuarioRotas = Router()

UsuarioRotas.get("/", async (req, res) => {
    const listUsuarios = await usuarioController.index();
    return res.json(listUsuarios);
})

UsuarioRotas.post("/", async (req, res) => {
    const usuario : IUsuario = req.body;
    const newUsuario = await usuarioController.save(usuario);
    return res.json(newUsuario);
})

export default UsuarioRotas