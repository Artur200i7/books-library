import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

export const getBooks = () => api.get('/books').then(res => res.data);
export const createBook = (data: any) => api.post('/books', data);
export const deleteBook = (id: number) => api.delete(`/books/${id}`);