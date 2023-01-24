import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Container from '@mui/material/Container';
import CardItem from './../Components/Card';
import Masonry from 'react-masonry-css'

export default function Notes() {


    const [notes, setNotes] = useState([]);

    const getNotes = async () => {
        const { data } = await axios.get('http://localhost:5000/notes');
        sessionStorage.setItem('notes', JSON.stringify(data.allnotes));
        setNotes(JSON.parse(sessionStorage.getItem('notes')));
    };

    const deleteOneNote = async (id) => {
         await axios.delete(
            `http://localhost:5000/notes/${id}`
        );
        const newNotes = notes.filter(note => note.id !== id)
        sessionStorage.setItem('notes', JSON.stringify(newNotes));
        setNotes(JSON.parse(sessionStorage.getItem('notes')));
    };

    useEffect(() => {
        getNotes();
    }, []);


    const breakpointColumnsObj = {
        default: 4,
        1100: 3,
        700: 2,
        500: 1
      };

    return (
        <Container>
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column">
                {notes.map((note) => (
                    <div item key={note.id} >
                        <CardItem note={note} deleteOneNote={deleteOneNote} />
                    </div>
                ))}
            </Masonry>
        </Container>
    );
}
