package com.example.library_management.Controllers;

import com.example.library_management.Entities.Member;
import com.example.library_management.Services.MemberService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/members")
@Tag(name = "Member API", description = "Handles operations related to library members")
public class MemberController {
    private final MemberService service;

    @Autowired
    public MemberController(MemberService service) {
        this.service = service;
    }

    @GetMapping
    @Operation(summary = "List all members", description = "Retrieve all members")
    public ResponseEntity<List<Member>> getMembers() {
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get member by ID", description = "Retrieve a member by ID")
    public ResponseEntity<Member> getMemberById(@PathVariable Long id) {
        return ResponseEntity.ok(service.findMemberById(id));
    }

    @PostMapping
    @Operation(summary = "Add new member", description = "Create a new member")
    public ResponseEntity<Member> addMember(@RequestBody Member member) {
        return ResponseEntity.ok(service.save(member));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update member", description = "Update member details")
    public ResponseEntity<Member> updateMember(@PathVariable Long id, @RequestBody Member member) {
        member.setId(id);
        return ResponseEntity.ok(service.save(member));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete member", description = "Delete a member by ID")
    public ResponseEntity<Boolean> deleteMember(@PathVariable Long id) {
        service.deleteMemberById(id);
        return ResponseEntity.ok(true);
    }
}
