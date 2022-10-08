"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const notes_model_1 = require("../models/notes.model");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function userHandeler(app) {
    app.post('/notes', express_1.default.json(), create);
    app.get('/notes', express_1.default.json(), index);
    app.delete('/notes/:id', express_1.default.json(), deleteNote);
}
const notes = new notes_model_1.Notes();
//create user
async function create(req, res) {
    try {
        const title = req.body.title;
        const details = req.body.details;
        const category = req.body.category;
        const addedNote = await notes.createNote(title, details, category);
        //if the user is registered before check if there add key to the object called check with value 1
        res.json({
            message: 'Note added to DB successfully',
            addedNote: addedNote,
        });
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
}
//get all notes
async function index(_req, res) {
    try {
        const allnotes = await notes.getAllNotes();
        res.json({ message: 'get all notes from DB successfully', allnotes });
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
}
//delete one note
async function deleteNote(req, res) {
    try {
        const id = req.params.id;
        const allnotes = await notes.deleteOneNotes(id);
        res.json({ message: 'delete note from DB successfully', allnotes });
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
}
exports.default = userHandeler;
