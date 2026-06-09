package com.example.library_management.Controllers;


import com.example.library_management.Entities.Book;
import com.example.library_management.Services.BookService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/books")
@Tag(name = "Books API", description = "Handles operations related to books")
public class BookController {
    private BookService service;

    @Autowired
    public BookController(BookService service) {
        this.service = service;
    }
    @GetMapping
    @Operation(summary = "List all books", description = "Retrieve all books in the library")
    public ResponseEntity<List<Book>> getBooks() {
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get book by ID", description = "Retrieve a single book by ID")
    public ResponseEntity<Book> getBookById(@PathVariable Long id) {
        return ResponseEntity.ok(service.findBookById(id));
    }

    @PostMapping
    @Operation(summary = "Add new book", description = "Create a new book entry")
    public ResponseEntity<Book> addBook(@RequestBody Book book) {
        return ResponseEntity.ok(service.save(book));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update book", description = "Update book details")
    public ResponseEntity<Book> updateBook(@PathVariable Long id, @RequestBody Book book) {
        book.setId(id);
        return ResponseEntity.ok(service.save(book));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete book", description = "Delete a book by ID")
    public ResponseEntity<Boolean> deleteBook(@PathVariable Long id) {
        service.deleteBookById(id);
        return ResponseEntity.ok(true);
    }
}

