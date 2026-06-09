package com.example.library_management.Services;

import com.example.library_management.Entities.Member;
import com.example.library_management.Repositories.MemberRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MemberService {

    private final MemberRepository repo;

    public MemberService(MemberRepository repo) {
        this.repo = repo;
    }

    public List<Member> findAll() { return repo.findAll(); }

    public Member findMemberById(Long id) {
        return repo.findById(id).orElseThrow(() -> new RuntimeException("Member not found"));
    }

    public Member save(Member member) { return repo.save(member); }

    public void deleteMemberById(Long id) { repo.deleteById(id); }
}