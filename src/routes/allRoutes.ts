import express from 'express';

import userHandeler from './../handelers/notes.handeler';


//not to import all the functions in the server file
export function fetchAllRoutes(app: express.Application) {

    userHandeler(app);

}
