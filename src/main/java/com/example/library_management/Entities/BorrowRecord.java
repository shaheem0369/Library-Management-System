package com.example.library_management.Entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "borrow_records")
@Getter @Setter
@Builder
public class BorrowRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "book_id")
    private Book book;

    @ManyToOne(optional = false)
    @JoinColumn(name = "member_id")
    private Member member;

    private LocalDate borrowDate;
    private LocalDate returnDate;
}