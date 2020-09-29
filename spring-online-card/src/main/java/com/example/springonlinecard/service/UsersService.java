package com.example.springonlinecard.service;

import com.example.springonlinecard.dao.domain.Users;
import com.example.springonlinecard.dao.repository.UsersRepository;
import com.example.springonlinecard.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsersService {

    private final UsersRepository repository;

    public UsersService(UsersRepository repository) {
        this.repository = repository;
    }

    public List<Users> getAll() {
        return repository.findAll();
    }

    public Users get(int id) {
        return repository.findById(id).orElseThrow(() -> new ResourceNotFoundException(id));
    }



}
