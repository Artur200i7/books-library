import './App.css';
import { BrowserRouter, Routes, Route, Link, NavLink } from 'react-router-dom';
import BookList from './pages/BookList';
import AddBook from './pages/AddBook';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <NavLink to="/" end>Колекція</NavLink>
        <NavLink to="/add">Нова Справа</NavLink>
      </nav>

      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 className="brand-logo" style={{ fontSize: '3rem', margin: 0 }}>
            <span style={{color: 'white'}}>The</span> LEDGER
          </h1>
          <p style={{ color: '#590d22', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', margin: 0 }}>
            Книга Обліку Бібліотеки
          </p>
        </div>

        <div className="ledger-card">
          <Routes>
            <Route path="/" element={<BookList />} />
            <Route path="/add" element={<AddBook />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
export default App;