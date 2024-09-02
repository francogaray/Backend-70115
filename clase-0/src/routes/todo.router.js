import { Router } from "express";

const router = Router();

import TodoModel from "../models/todo.model.js";

router.get("/", async (req, res) => {
    try {
        const toDos = await TodoModel.find().lean();

        res.render("todos", { toDos });
    } catch (error) {
        console.log(error);
        res.status(500).send("Error del servidor al recuperar los ToDos");
    }
});

// Ruta para crear un nuevo ToDo...

router.post("/todos", async (req, res) => {
    try {
        const { title, description } = req.body;
        const nuevoToDo = new TodoModel({ title, description });
        await nuevoToDo.save();
        res.redirect("/");
    } catch (error) {
        console.log(error);
        res.status(500).send("Error del servidor al recuperar los ToDos");
    }
});

// Ruta para renderizar la vista de "New"

router.get("/new", (req, res) => {
    res.render("new");
});

// Ruta para marcar completadas...

router.post("/todos/:id/complete", async (req, res) => {
    try {
        const todo = await TodoModel.findById(req.params.id);
        todo.completed = true;
        await todo.save();
        res.redirect("/");
    } catch (error) {
        console.log(error);
        res.status(500).send("Error del servidor al recuperar los ToDos");
    }
});

//Ruta para elimnar un Todo
router.post("/todos/:id/delete", async (req, res) => {
    try {
        await TodoModel.findByIdAndDelete(req.params.id);
        res.redirect("/");
    } catch (error) {
        console.log(error);
        res.status(500).send("Error del servidor al recuperar los ToDos");
    }
});

export default router;
