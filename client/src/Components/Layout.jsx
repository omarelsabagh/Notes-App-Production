import React from 'react';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import styles from '../Components/Layout.module.css';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SubjectIcon from '@mui/icons-material/Subject';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Avatar from '@mui/material/Avatar';
import { useNavigate, useLocation } from 'react-router-dom';
import {format} from 'date-fns'
export default function Layout({ children }) {
    const navigate = useNavigate();
    const location = useLocation();

    const listItems = [
        {
            text: 'My Notes',
            icon: <SubjectIcon color="primary" />,
            path: '/',
        },
        {
            text: 'New Note',
            icon: <AddCircleOutlineIcon color="primary" />,
            path: '/create',
        },
    ];

    return (
        <div className={styles.handleflex}>
            <AppBar elevation={0} color='primary' className={styles.appbar}>
                <div className={styles.handleflex2}>
                <Toolbar>
                    <Typography className={styles.datahandle} variant="h5">{format(new Date(), 'do MMMM Y')}</Typography>
                </Toolbar>
                <Avatar className={styles.avatarhandle} src='/avatar-svgrepo-com.svg'/>
                </div>
          
            </AppBar>
            <Drawer
                className={styles.drawer}
                variant="permanent"
                anchor="left"
                classes={{ paper: styles.drawerpaper }}
            >
                <div className={styles.drawerheader}>
                    <Typography className={styles.paddingtitle} variant="h5" component='h1'> 
                       Notes
                    </Typography>
                </div>

                <List>
                    {listItems.map((item) => (
                        <ListItemButton
                            className={
                                location.pathname === item.path
                                    ? styles.active
                                    : null
                            }
                            key={item.text}
                            onClick={() => {
                                navigate(item.path);
                            }}
                        >
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText className={styles.classforresponsive1} primary={item.text} />
                        </ListItemButton>
                    ))}
                </List>
            </Drawer>
            <div className={styles.page}>
                <div className={styles.justspacing}></div>
                {children}
                </div>
        </div>
    );
}
