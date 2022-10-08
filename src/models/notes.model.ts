import Client from './../database';
import dotenv from 'dotenv';

//type of the user
interface Note {
    id?: number | string;
    title: string;
    details: string;
    category: string
}

export class Notes {
    //create note
    async createNote(title: string, details: string, category:string): Promise<Note> {
        try {
            //if the user not registered before then hash the password and add the user to DB
            dotenv.config();
            const conn = await Client.connect();
            const sql = `INSERT INTO notes (title,details,category) VALUES ($1,$2,$3) RETURNING *`;

            const addedNote = await conn.query(sql, [title, details,category]);

            conn.release();
            return addedNote.rows[0];
        } catch (error) {
            throw new Error(`couldn't add new note: ${error}`);
        }
    }

    //index notes
    async getAllNotes(): Promise<Note | null[]> {
        try {
            const conn = await Client.connect();
            const sql = `SELECT * FROM notes`;

            const allNotes = await conn.query(sql);

            conn.release();
            return allNotes.rows;
        } catch (error) {
            throw new Error(`couldn't get all notes: ${error}`);
        }
    }

    //delete one note
    async deleteOneNotes(id:number|string){
        try {
            const conn = await Client.connect();
            const sql = `DELETE FROM notes where id=$1 RETURNING *`;

            const allNotes = await conn.query(sql,[id]);

            conn.release();
            return allNotes.rows;
        } catch (error) {
            throw new Error(`couldn't delete all users: ${error}`);
        }
    }
    //delete all notes

    async deleteAllNotes(): Promise<void> {
        try {
            const conn = await Client.connect();
            const sql = `DELETE FROM notes`;

            await conn.query(sql);

            conn.release();
        } catch (error) {
            throw new Error(`couldn't delete all users: ${error}`);
        }
    }
}
