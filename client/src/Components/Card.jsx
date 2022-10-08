import React from 'react';
import CardHeader from '@mui/material/CardHeader';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { blue, green, purple, yellow } from '@mui/material/colors';
import styles from '../Components/Layout.module.css'
export default function CardItem({ note, deleteOneNote }) {
    const myclass = {
        backgroundColor: ()=>{
            if(note.category==="reminders")
            {
                return purple[500]
            }
            if(note.category==="work")
            {
                return yellow[700]
            }
            if(note.category==="todos")
            {
                return green[500]
            }
            return blue[700]
        },
    };
    const myclass2 = {
        color: ()=>{
            if(note.category==="reminders")
            {
                return purple[500]
            }
            if(note.category==="work")
            {
                return yellow[700]
            }
            if(note.category==="todos")
            {
                return green[500]
            }
            return blue[700]
        },
        fontSize:19,
        fontWeight:500
    };
    

    return (
        <div>
            <Card elevation={0} className={styles.cardborder}>
                <CardHeader
                    avatar={<Avatar sx={myclass}>{note.title[0].toUpperCase()}</Avatar>}
                    action={
                        <IconButton
                            onClick={() => {
                                deleteOneNote(note.id);
                            }}
                        >
                            <DeleteOutlineIcon />
                        </IconButton>
                    }
                    title={note.title}
                    titleTypographyProps={myclass2}
                    subheader={note.category}
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary">
                        {note.details}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
}
