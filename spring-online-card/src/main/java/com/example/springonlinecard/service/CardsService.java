package com.example.springonlinecard.service;

import com.example.springonlinecard.dao.domain.Cards;
import com.example.springonlinecard.dao.domain.Users;
import com.example.springonlinecard.dao.repository.CardsRepository;
import com.example.springonlinecard.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CardsService {

    private final CardsRepository repository;

    public CardsService(CardsRepository repository) {
        this.repository = repository;
    }

    public List<Cards> getAllCards(Users users) {
        if (users == null) {
            throw new ResourceNotFoundException("users");
        }
        return repository.findAllByUsers(users);
    }

}
