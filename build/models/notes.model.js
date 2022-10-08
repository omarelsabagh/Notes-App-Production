"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notes = void 0;
const database_1 = __importDefault(require("./../database"));
const dotenv_1 = __importDefault(require("dotenv"));
class Notes {
    //create note
    async createNote(title, details, category) {
        try {
            //if the user not registered before then hash the password and add the user to DB
            dotenv_1.default.config();
            const conn = await database_1.default.connect();
            const sql = `INSERT INTO notes (title,details,category) VALUES ($1,$2,$3) RETURNING *`;
            const addedNote = await conn.query(sql, [title, details, category]);
            conn.release();
            return addedNote.rows[0];
        }
        catch (error) {
            throw new Error(`couldn't add new note: ${error}`);
        }
    }
    //index notes
    async getAllNotes() {
        try {
            const conn = await database_1.default.connect();
            const sql = `SELECT * FROM notes`;
            const allNotes = await conn.query(sql);
            conn.release();
            return allNotes.rows;
        }
        catch (error) {
            throw new Error(`couldn't get all notes: ${error}`);
        }
    }
    //delete one note
    async deleteOneNotes(id) {
        try {
            const conn = await database_1.default.connect();
            const sql = `DELETE FROM notes where id=$1 RETURNING *`;
            const allNotes = await conn.query(sql, [id]);
            conn.release();
            return allNotes.rows;
        }
        catch (error) {
            throw new Error(`couldn't delete all users: ${error}`);
        }
    }
    //delete all notes
    async deleteAllNotes() {
        try {
            const conn = await database_1.default.connect();
            const sql = `DELETE FROM notes`;
            await conn.query(sql);
            conn.release();
        }
        catch (error) {
            throw new Error(`couldn't delete all users: ${error}`);
        }
    }
}
exports.Notes = Notes;
