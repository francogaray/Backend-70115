// CLASE 02 - COOKIES, SESSIONS & STORAGE

// Para lograr persistencia de la sesiones con File Storage

// 1) instalar npm install session-file-store
// 2) Importamos el módulo
// 3) Lo inicializamos conectando a la a session

//Trabajamos con MongoDB

// 1)
// 2) Importamos y configuramos el middleware

import express from "express";
import session from "express-session";
import { engine } from "express-handlebars";

import { config } from "dotenv";

import sessionRoutes from "./routes/session.routes.js";
import viewsRoutes from "./routes/views.routes.js";

import "./database.js";

import FileStore from "session-file-store";
//Lo inicializamos de la siguiente forma
const fileStore = FileStore(session);

import mongoStore from "connect-mongo";

config();
const app = express();

const PUERTO = 8080;

import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

app.use(
    session({
        secret: "secretCoder",
        // Es el valor para firmar las cookies

        revase: true, //Esta config me permite mantener la sesion activa frente a la inactividad del  usuario

        saveUninitialized: true, //Me permite guardar cualquier sesio n aun cuando el objeto  de sesion no tenga nada para conener

        // 2) Utilizando File Storage:

        // store: new fileStore({
        //     path: "./src/sessions",
        //     ttl: 1000,
        //     retries: 1,

        //     //path: la ruta donde se van a guardar los archivos de session
        //     //ttl: Time To Live ( en segundis va!)
        //     //retries: cantidad de veces que el servidor tratará de leer el archvo
        // }),

        // 3) Utilizando MongoStore:

        store: MongoStore.create({
            mongoUrl:
                process.env.MONGO_URI ||
                "mongodb+srv://coderBackend50015:coderBackend50015@cluster0.qutkujb.mongodb.net",
            ttl: 1000,
        }),
    })
);

//Rutas
app.get("/crearcuki", (req, res) => {
    res.cookie("cuki", "Esto es una cukkiiii").send("cuki seteada");
});

app.get("/borrarcuki", (req, res) => {
    res.clearCookie("cuki").send("cuki borrada");
});

// Rutas con session:

app.get("/loginCuki", (req, res) => {
    let usuario = req.query.usuario;

    req.session.usuario = usuario;

    res.send(`Usuario ${usuario} logueado correctamente`);
});

//Verificamos el usuario recien logueado
app.get("/usuario", (req, res) => {
    if (req.session.usuario) {
        return res.send(
            `El usuario registrado es el siguiente: ${req.session.usuario}`
        );
    }
    res.send("No hay usuario logueado");
});

//Ejercicio de loggin y registro

app.use("/api/sessions", sessionRoutes);
app.use("/", viewsRoutes);

app.listen(PUERTO, () =>
    console.log(`Escuchando el puerto: ${PUERTO}, http://localhost:${PUERTO}`)
);
