package com.example.springonlinecard.dao.repository;

import com.example.springonlinecard.dao.domain.LoanRequests;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LoanRequestsRepository extends JpaRepository<LoanRequests, Integer> {

    List<LoanRequests> findAllByUserId(Integer id);

}
