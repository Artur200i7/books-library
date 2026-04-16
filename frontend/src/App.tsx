import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline, Container, Box, Typography } from '@mui/material';
import BookList from './pages/BookList';
import AddBook from './pages/AddBook';
import EditBook from './pages/EditBook';

// Налаштування фірмового стилю "The Ledger"
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#c9a55c' },    // Золото
    secondary: { main: '#590d22' },  // Бордовий
    background: { default: '#000000', paper: '#111111' },
  },
  typography: {
    fontFamily: '"Inter", "Segoe UI", sans-serif',
  }
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        {/* Мінімалістична навігація зверху */}
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 5, py: 3, borderBottom: '1px solid #1a1a1a' }}>
          <NavLink to="/" style={({ isActive }) => ({
            color: isActive ? '#c9a55c' : '#666',
            textDecoration: 'none',
            fontSize: '0.75rem',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            fontWeight: isActive ? '900' : '400',
            borderBottom: isActive ? '1px solid #c9a55c' : 'none',
            paddingBottom: '4px'
          })}>Колекція</NavLink>
          
          <NavLink to="/add" style={({ isActive }) => ({
            color: isActive ? '#c9a55c' : '#666',
            textDecoration: 'none',
            fontSize: '0.75rem',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            fontWeight: isActive ? '900' : '400',
            borderBottom: isActive ? '1px solid #c9a55c' : 'none',
            paddingBottom: '4px'
          })}>Нова Справа</NavLink>
        </Box>

        {/* Великий заголовок (як на вчорашньому скріншоті) */}
        <Box sx={{ textAlign: 'center', mt: 6, mb: 5 }}>
          <Typography variant="h2" sx={{ 
            fontFamily: '"Playfair Display", serif', 
            fontWeight: 900, 
            color: '#c9a55c',
            letterSpacing: '5px',
            textTransform: 'uppercase',
            fontSize: { xs: '2.5rem', md: '3.5rem' }
          }}>
            The LEDGER
          </Typography>
          <Typography sx={{ color: '#590d22', fontSize: '0.65rem', letterSpacing: '5px', mt: -1, textTransform: 'uppercase', fontWeight: 700 }}>
            Книга обліку бібліотеки
          </Typography>
        </Box>

        <Container maxWidth="sm"> {/* Вузька колонка для елегантності */}
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