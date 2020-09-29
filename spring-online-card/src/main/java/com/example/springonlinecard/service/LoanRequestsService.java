package com.example.springonlinecard.service;

import com.example.springonlinecard.dao.domain.LoanRequests;
import com.example.springonlinecard.dao.repository.LoanRequestsRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LoanRequestsService {

    private final LoanRequestsRepository requestsRepository;

    public LoanRequestsService(LoanRequestsRepository requestsRepository) {
        this.requestsRepository = requestsRepository;
    }

    public List<LoanRequests> getAllByUserId(Integer id) {
        return requestsRepository.findAllByUserId(id);

    }

}
