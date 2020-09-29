package com.example.springonlinecard.dao.repository;

import com.example.springonlinecard.dao.domain.CardRequests;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CardRequestsRepository extends JpaRepository<CardRequests, Integer> {
}
