package com.example.springonlinecard.dao.repository;

import com.example.springonlinecard.dao.domain.CardUsers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<CardUsers, Integer> {

    CardUsers findByUsername(String username);
}
