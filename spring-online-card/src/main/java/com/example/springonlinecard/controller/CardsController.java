package com.example.springonlinecard.controller;

import com.example.springonlinecard.dao.domain.Users;
import com.example.springonlinecard.exception.ResourceNotFoundException;
import com.example.springonlinecard.service.CardsService;
import com.example.springonlinecard.service.UsersService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/cards")
@CrossOrigin(origins = {"http://192.168.70.64:8082", "http://localhost:3000", "http://localhost:8082"})
public class CardsController {

    private final UsersService usersService;
    private final CardsService cardsService;

    public CardsController(UsersService usersService, CardsService cardsService) {
        this.usersService = usersService;
        this.cardsService = cardsService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getByUserId(@PathVariable Integer id) {
        Users user = usersService.get(id);

        try {
            return new ResponseEntity<>(cardsService.getAllCards(user), HttpStatus.OK);
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new ResourceNotFoundException(e.getMessage());
        }
    }

}
