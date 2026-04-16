import { BrowserRouter, Routes, Route, Link as RouterLink } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline, AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import BookList from './pages/BookList';
import AddBook from './pages/AddBook';
import EditBook from './pages/EditBook';

// Наша тема The Ledger (MUI)
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#c9a55c' }, // Золотий
    secondary: { main: '#590d22' }, // Бордовий
    background: { default: '#121212', paper: '#1e1e1e' },
  },
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
    h4: { fontFamily: '"Playfair Display", serif', fontWeight: 700 },
  },
});

export default function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline /> {/* Скидає базові стилі браузера */}
      <BrowserRouter>
        <AppBar position="static" color="transparent" sx={{ borderBottom: '2px solid #590d22' }}>
          <Toolbar>
            <Typography variant="h5" sx={{ flexGrow: 1, fontFamily: '"Playfair Display", serif', color: '#c9a55c' }}>
              THE LEDGER
            </Typography>
            <Button color="inherit" component={RouterLink} to="/">Колекція</Button>
            <Button color="inherit" component={RouterLink} to="/add">Нова Справа</Button>
          </Toolbar>
        </AppBar>

        <Container maxWidth="md" sx={{ mt: 5 }}>
          <Routes>
            <Route path="/" element={<BookList />} />
            <Route path="/add" element={<AddBook />} />
            <Route path="/edit/:id" element={<EditBook />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
}