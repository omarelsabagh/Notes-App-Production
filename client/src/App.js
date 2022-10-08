import './App.css';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Create from './Pages/Create';
import Notes from './Pages/Notes';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Layout from './Components/Layout';

const theme = createTheme({
    typography: {
        fontFamily: 'Quicksand',
    },
});

function App() {
    return (
        <>
            <ThemeProvider theme={theme}>
                <Router>
                    <Layout>
                        <Routes>
                            <Route path="/" element={<Notes />} />
                            <Route path="create" element={<Create />} />
                        </Routes>
                    </Layout>
                </Router>
            </ThemeProvider>
        </>
    );
}

export default App;
