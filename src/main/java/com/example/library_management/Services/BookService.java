package com.example.library_management.Services;

import com.example.library_management.Entities.Book;
import com.example.library_management.Repositories.BookRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookService {

    private final BookRepository repo;

    public BookService(BookRepository repo) {
        this.repo = repo;
    }

    public List<Book> findAll() { return repo.findAll(); }

    public Book findBookById(Long id) {
        return repo.findById(id).orElseThrow(() -> new RuntimeException("Book not found"));
    }

    public Book save(Book book) { return repo.save(book); }

    public void deleteBookById(Long id) { repo.deleteById(id); }
}