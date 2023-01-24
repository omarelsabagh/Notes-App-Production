import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import TextField from '@mui/material/TextField';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../Components/Layout.module.css'
export default function Create() {
    const style = {
        marginTop: 3,
        marginBottom: 3,
        display: 'block',
    };
    const [title, setTitle] = useState('');
    const [details, setDetails] = useState('');
    const [titlError, setTitleError] = useState(false);
    const [detailsError, setDetailsError] = useState(false);
    const [category, setCategory] = useState('todos');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        setDetailsError(false);
        setTitleError(false);
        e.preventDefault();
        if (title === '') {
            setTitleError(true);
        }
        if (details === '') {
            setDetailsError(true);
        }
        if (title && details) {
            const result = await axios.post('http://localhost:5000/notes', {
                title: title,
                details: details,
                category:category
            });
            if (result.data.message === 'Note added to DB successfully') {
                navigate('/');
            }
           
        }
    };
    return (
        <>
            <Container >
                <div className={styles.handlecontainer}>
                <form className={styles.formwidth} onSubmit={handleSubmit} noValidate autoComplete="off">
                    <Typography variant="h6" color="textSecondary" gutterBottom>
                        Create a New Note
                    </Typography>
                    <TextField
                        onChange={(e) => {
                            setTitle(e.target.value);
                        }}
                        sx={style}
                        label="note title"
                        variant="outlined"
                        color="primary"
                        fullWidth
                        required
                        error={titlError}
                    />
                    <TextField
                        onChange={(e) => {
                            setDetails(e.target.value);
                        }}
                        sx={style}
                        label="note details"
                        variant="outlined"
                        color="primary"
                        fullWidth
                        required
                        multiline
                        rows={3}
                        error={detailsError}
                    />

                    <FormControl sx={style}>
                        <FormLabel>Note Category</FormLabel>
                        <RadioGroup
                            value={category}
                            onChange={(e) => {
                                setCategory(e.target.value);
                            }}
                        >
                            <FormControlLabel
                                control={<Radio />}
                                value="todos"
                                label="Todos"
                            />
                            <FormControlLabel
                                control={<Radio />}
                                value="money"
                                label="Money"
                            />
                            <FormControlLabel
                                control={<Radio />}
                                value="reminders"
                                label="Reminders"
                            />
                            <FormControlLabel
                                control={<Radio />}
                                value="work"
                                label="Work"
                            />
                        </RadioGroup>
                    </FormControl>

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        
                        endIcon={<KeyboardArrowRightIcon />}
                    >
                        Add Note
                    </Button>
                </form>
                </div>
            
            </Container>
        </>
    );
}
