/* CLASE 0 - NIVELAMOS REALIZANDO UN TODO LIST CON MONGOOSE Y EXPRESS */

import express from "express";
import { engine } from "express-handlebars";
import mongoose from "mongoose";
import toDosRouter from "./routes/todo.router.js";

const app = express();

const PUERTO = 8080;

/* Nos conectamos a la DB */

mongoose
    .connect(
        "mongodb+srv://coderBackend50015:coderBackend50015@cluster0.qutkujb.mongodb.net/"
    )
    .then(() => console.log("Nos conectamos a Mongo"))
    .catch((e) => console.log("Error: " + e));

/* Middlewares */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Express Handlebars

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

//Ruta
app.use(toDosRouter);

app.listen(PUERTO, () => {
    console.log("App listening on port " + PUERTO);
});
