package com.example.library_management.Repositories;

import com.example.library_management.Entities.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Long> {

}