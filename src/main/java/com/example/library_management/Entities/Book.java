package com.example.library_management.Entities;


import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "books")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String author;

    @Column(unique = true)
    private String isbn;

    private boolean available = true;
}
