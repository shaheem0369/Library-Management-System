package com.example.library_management.Repositories;

import com.example.library_management.Entities.BorrowRecord;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BorrowRecordRepository extends JpaRepository<BorrowRecord, Long> {

}
