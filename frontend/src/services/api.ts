import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const getBooks = async () => (await axios.get(`${API_URL}/books`)).data;
export const getBookById = async (id: number) => (await axios.get(`${API_URL}/books/${id}`)).data;
export const createBook = async (data: any) => (await axios.post(`${API_URL}/books`, data)).data;
export const updateBook = async (id: number, data: any) => (await axios.put(`${API_URL}/books/${id}`, data)).data;
export const deleteBook = async (id: number) => (await axios.delete(`${API_URL}/books/${id}`)).data;