import express, { Request, Response } from 'express';
import { Notes } from '../models/notes.model';
import dotenv from 'dotenv';
dotenv.config();

function userHandeler(app: express.Application) {
    app.post('/notes', express.json(), create);
    app.get('/notes', express.json(), index);
    app.delete('/notes/:id', express.json(), deleteNote);
}

const notes = new Notes();

//create user
async function create(req: Request, res: Response) {
    try {
        const title: string = req.body.title;
        const details: string = req.body.details;
        const category: string = req.body.category;

        const addedNote = await notes.createNote(title, details, category);
        //if the user is registered before check if there add key to the object called check with value 1

        res.json({
            message: 'Note added to DB successfully',
            addedNote: addedNote,
        });
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

//get all notes

async function index(_req: Request, res: Response) {
    try {
        const allnotes = await notes.getAllNotes();

        res.json({ message: 'get all notes from DB successfully', allnotes });
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

//delete one note
async function deleteNote(req: Request, res: Response) {
    try {
        const id = req.params.id
        const allnotes = await notes.deleteOneNotes(id);

        res.json({ message: 'delete note from DB successfully', allnotes });
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

export default userHandeler;
