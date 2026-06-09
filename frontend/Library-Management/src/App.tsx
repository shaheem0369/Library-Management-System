import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import Books from './pages/Books';
import AddBook from './pages/AddBook';
import EditBook from './pages/EditBook';
import Members from './pages/Members';
import AddMember from './pages/AddMember';
import BorrowRecords from './pages/BorrowRecords';
import AddBorrowRecord from './pages/AddBorrowRecord';
export function App() {
  return <Router>
      <Toaster position="top-right" />
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/books" element={<Books />} />
          <Route path="/books/add" element={<AddBook />} />
          <Route path="/books/edit/:id" element={<EditBook />} />
          <Route path="/members" element={<Members />} />
          <Route path="/members/add" element={<AddMember />} />
          <Route path="/borrow-records" element={<BorrowRecords />} />
          <Route path="/borrow-records/add" element={<AddBorrowRecord />} />
        </Routes>
      </Layout>
    </Router>;
}