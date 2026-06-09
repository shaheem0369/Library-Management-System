package com.example.library_management.Controllers;

import com.example.library_management.Entities.BorrowRecord;
import com.example.library_management.Services.BorrowRecordService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/borrow-records")
@Tag(name ="Borrow Records API" , description = "Handle operations related to borrow records")
public class BorrowRecordController {
    private final BorrowRecordService service;

    @Autowired
    public BorrowRecordController(BorrowRecordService service) {
        this.service = service;
    }

    @GetMapping
    @Operation(summary = "List all borrow records", description = "Retrieve all borrow records")
    public ResponseEntity<List<BorrowRecord>> getBorrowRecords() {
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get borrow record by ID", description = "Retrieve a borrow record by ID")
    public ResponseEntity<BorrowRecord> getBorrowRecordById(@PathVariable Long id) {
        return ResponseEntity.ok(service.findBorrowRecordById(id));
    }

    @PostMapping
    @Operation(summary = "Add new borrow record", description = "Create a borrow record")
    public ResponseEntity<BorrowRecord> addBorrowRecord(@RequestBody BorrowRecord record) {
        return ResponseEntity.ok(service.save(record));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update borrow record", description = "Update borrow record details")
    public ResponseEntity<BorrowRecord> updateBorrowRecord(@PathVariable Long id, @RequestBody BorrowRecord record) {
        record.setId(id);
        return ResponseEntity.ok(service.save(record));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete borrow record", description = "Delete a borrow record by ID")
    public ResponseEntity<Boolean> deleteBorrowRecord(@PathVariable Long id) {
        service.deleteBorrowRecordById(id);
        return ResponseEntity.ok(true);
    }
}
