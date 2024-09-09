import { Router } from "express";
import UserModel from "../models/user.model.js"


const router = Router();

//Ruta post para generar un usuario:

router.post("/register", async (req, res) => {
    let { first_name, last_name, email, password, age } = req.body;

    try {
        const existeUsuario = await UserModel.findOne({ email: email });

        if (existeUsuario) {
            return res.status(400).send("El email ya está registrado");
        }

        //Crear un nuevo usuario:

        const nuevoUsuario = await UserModel.create({
            first_name,
            last_name,
            email,
            password,
            age,
        });

        //Almacenamos los datos del usaurio en la sesion
        req.session.user = {
            first_name: nuevoUsuario.first_name,
            last_name: nuevoUsuario.last_name,
            email: nuevoUsuario.email,
        };

        req.session.login = true;

        res.status(201).send("Usuario creado con éxito!");
    } catch (error) {
        console.log(error);
        res.status(500).send("Error del server al registrar al usuario");
    }
});

router.post("/login", async (req, res) => {
    let { email, password } = req.body;
    try {
        const usuarioBuscado = await UserModel.findOne({ email: email });

        if (usuarioBuscado) {
            if (usuarioBuscado.password === password) {
                req.session.user = {
                    first_name: usuarioBuscado.first_name,
                    last_name: usuarioBuscado.last_name,
                    email: usuarioBuscado.email,
                };

                req.session.login = true;
                res.redirect("/profile");
            } else {
                res.status(401).send("Contraseña incorrecta");
            }
        } else {
            res.status(401).send("Usuario no encontrado");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Error del server al iniciar sesión");
    }
});

export default router;
