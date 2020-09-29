package com.example.springonlinecard.controller;

import com.example.springonlinecard.exception.ResourceNotFoundException;
import com.example.springonlinecard.service.LoanRequestsService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@CrossOrigin(origins = {"http://192.168.70.64:8082", "http://localhost:3000", "http://localhost:8082"})
@RestController
@RequestMapping("/api/loans")
public class LoanRequestsController {

    private final LoanRequestsService loanRequestsService;

    public LoanRequestsController(LoanRequestsService loanRequestsService) {
        this.loanRequestsService = loanRequestsService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getAllByUser(@PathVariable Integer id) {
        try {
            return new ResponseEntity<>(loanRequestsService.getAllByUserId(id), HttpStatus.OK);
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new ResourceNotFoundException(id.toString());
        }
    }

}
