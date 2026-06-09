import axios from 'axios';
const api = axios.create({
  baseURL: 'http://localhost:8080/api'
});
export const fetchBooks = async () => {
  const response = await api.get('/books');
  return response.data;
};
export const fetchBook = async (id: string) => {
  const response = await api.get(`/books/${id}`);
  return response.data;
};
export const createBook = async (book: any) => {
  const response = await api.post('/books', book);
  return response.data;
};
export const updateBook = async (id: string, book: any) => {
  const response = await api.put(`/books/${id}`, book);
  return response.data;
};
export const deleteBook = async (id: string) => {
  const response = await api.delete(`/books/${id}`);
  return response.data;
};
export const fetchMembers = async () => {
  const response = await api.get('/members');
  return response.data;
};
export const fetchMember = async (id: string) => {
  const response = await api.get(`/members/${id}`);
  return response.data;
};
export const createMember = async (member: any) => {
  const response = await api.post('/members', member);
  return response.data;
};
export const updateMember = async (id: string, member: any) => {
  const response = await api.put(`/members/${id}`, member);
  return response.data;
};
export const deleteMember = async (id: string) => {
  const response = await api.delete(`/members/${id}`);
  return response.data;
};
export const fetchBorrowRecords = async () => {
  const response = await api.get('/borrow-records');
  return response.data;
};
export const createBorrowRecord = async (record: any) => {
  const response = await api.post('/borrow-records', record);
  return response.data;
};
export const fetchDashboardStats = async () => {
  // In a real app, you might have a dedicated endpoint for dashboard stats
  // Here we'll simulate by fetching from multiple endpoints
  const [books, members, borrowRecords] = await Promise.all([api.get('/books'), api.get('/members'), api.get('/borrow-records')]);
  return {
    totalBooks: books.data.length,
    totalMembers: members.data.length,
    borrowedBooks: borrowRecords.data.length
  };
};