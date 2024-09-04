/*CLASE 1  */

//Esta info viaja entre las peticiones del cliente y las respuestas del servidor

// ¿Qué pueden guardar?
// Id de las sesiones
// Preferencias del usuario (modo claro, idioma, moneda)
// Productos y servicios buscados

// Caracteristicas:

// 1) como viven en el navegador y son de facil acceso envitamos colocar datos sensibles ( contrasñe, medios de pago, etc..)
// 2) Le podemos configurar un tiempo de vida
// 3) Podemos asignarles clave secretas para aumentar la seguridad.
// 4) Al almacenarse del lado del cliente el espacio con el que se cuenta es limitado por lo que se se recomiendo elegir de forma adecuada lo que se vaya a guardar como cokkie

// instalamos cookkie-parser

// 2) SESIONES:
//con las sesiones puedo mantener el vinculoa la informacion sobre el cluetnte

//Caracteristicas:
// La información que se quiera guardar en session se almacena del lado del servidor.
// Del lado del cliente, se crea un identificador único para poder acceder a esa información desde el navegador.
// Los datos almacenados en session se borran al cerrar la ventana del navegador.
// Se utiliza principalmente para guardar los datos de usuario al iniciar sesión..

//Instalamos

import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";

const app = express();

const PUERTO = 8080;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const miClaveSecreta = "coder";
app.use(cookieParser(miClaveSecreta));

//middleware de sesion
app.use(
    session({
        secret: "secretCoder",
        resave: true,
        // Resave me permite mantener activa la sesion frente a la inactivdad del usuario

        saveUninitialized: true,
        // Permite guardar cualquier sesion aun cuando el objeto de session no tenga nada para contener
    })
);

//Rutas

// Seteamos una cookie
app.get("/setcookie", (req, res) => {
    //usaremos el objeto "res" para asignarle una cookie al cliente
    res.cookie("coderCookie", "mi primera chamba con cookies").send(
        "cookie seteada"
    );

    //la cookie vive en el navegador hasta que es elimindada, pero si yo quiero que tenga un tiempo de vida limitado puedo configurar el "maxAge" { su valor es en ms} ej: {maxAge:5000}
});

// Enviamos una cookie firmada

app.get("/cookieFirmada", (req, res) => {
    res.cookie("cookieFirmada", "Esto es un mensaje secreto", {
        signed: true,
    }).send("Cookie Firmada enviada");
});

// Obtenemos una cookie firmada
app.get("/recuperamosCookieFirmada", (req, res) => {
    let valorCookie = req.signedCookies.cookieFirmada;

    if (valorCookie) {
        res.send("Cookie recuperado: " + valorCookie);
    } else {
        res.send("Cookie adulterada");
    }
});

//Leemos una cookie
app.get("/leercookie", (req, res) => {
    res.send(req.cookies.coderCookie);
});

//borramos una cookie
app.get("/borrarcookie", (req, res) => {
    res.clearCookie("coderCookie").send("cookie eliminada");
});

// levantamos la session en el endpoint contador
app.get("/contador", (req, res) => {
    if (req.session.counter) {
        req.session.counter++;
        res.send("Se visito el sito: " + req.session.counter + " veces");
    } else {
        req.session.counter = 1;
        res.send("Bienvenido!!!");
    }
});

// Login con sesion ultra báscio

app.get("/login", (req, res) => {
    let { user, pass } = req.query;

    if (user === "franco" && pass === "1234") {
        req.session.user = user;

        res.send("Inicio de sesión exitoso!");
    } else {
        res.send("Datos incorrectos");
    }
});

// Ruta privada, se puede ingresar acá solo si se está loggeado

// Middleware de autenticacion de usuarios:

function auth(req, res, next) {
    if (req.session.user === "franco") {
        return next();
    } else {
        return res.status(403).send({
            message: "usuario no autorizado",
        });
    }
}

app.get("/privado", auth, (req, res) => {
    res.send("Si llegaste hasta acá es porque estás loggeado!");
});

//eliminamos datos de la session:

app.get("/logout", (req, res) => {
    //para eliminar datos de una variable de session podemos utilizar el medotod destrpoy

    req.session.destroy((error) => {
        if (!error) {
            res.send("Sesion cerradar");
        } else {
            res.send("No hay session iniciada");
        }
    });
});

app.listen(PUERTO, () => console.log("Escuchandi en el puerto" + PUERTO));
