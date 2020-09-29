package com.example.springonlinecard.controller;

import com.example.springonlinecard.dao.domain.CardUsers;
import com.example.springonlinecard.service.UserService;
import com.example.springonlinecard.validator.UserValidator;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = {"http://192.168.70.64:8082", "http://localhost:3000", "http://localhost:8082"})
@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;
    private final UserValidator userValidator;

    public UserController(UserService userService, UserValidator userValidator) {
        this.userService = userService;
        this.userValidator = userValidator;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody CardUsers user, BindingResult bindingResult) {
        userValidator.validate(user, bindingResult);

        if (getErrors(bindingResult) != null) {
            return getErrors(bindingResult);
        }

        CardUsers newUser = userService.createUser(user);

        return new ResponseEntity<>(newUser, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> read(@PathVariable Integer id) {
        try {
            return ResponseEntity.ok().body(userService.getById(id));
        } catch (Exception ex) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping
    public ResponseEntity<?> readAll() {
        try {
            return ResponseEntity.ok().body(userService.getAllUsers());
        } catch (Exception ex) {
            return ResponseEntity.notFound().build();
        }
    }


    private ResponseEntity<?> getErrors(BindingResult result) {
        if (result.hasErrors()) {
            Map<String, String> errors = new HashMap<>();

            for (FieldError error : result.getFieldErrors()) {
                errors.put(error.getField(), error.getDefaultMessage());
            }

            return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
        }
        return null;
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        this.userService.delete(id);
    }

}
