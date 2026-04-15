import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import BookList from './pages/BookList';
import AddBook from './pages/AddBook';

function App() {
  return (
    <BrowserRouter>
      <nav style={{ padding: '20px', borderBottom: '1px solid #ccc' }}>
        <Link to="/" style={{ marginRight: '10px' }}>Головна</Link>
        <Link to="/add">Додати книгу</Link>
      </nav>

      <div style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/add" element={<AddBook />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;