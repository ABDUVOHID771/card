package com.example.springonlinecard.dao.repository;

import com.example.springonlinecard.dao.domain.Users;
import org.springframework.data.jpa.repository.JpaRepository;


public interface UsersRepository extends JpaRepository<Users, Integer> {
}
