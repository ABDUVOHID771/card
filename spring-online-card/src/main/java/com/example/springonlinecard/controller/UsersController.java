package com.example.springonlinecard.controller;

import com.example.springonlinecard.service.UsersService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = {"http://192.168.70.64:8082", "http://localhost:3000", "http://localhost:8082"})
@RestController
@RequestMapping("/api/clients")
public class UsersController {

    private final UsersService service;

    public UsersController(UsersService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<?> getAllClients() {
        try {
            return ResponseEntity.ok().body(service.getAll());
        } catch (Exception ex) {
            System.out.println("ERROR : " + ex.getMessage());
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getClient(@PathVariable int id) {
        try {
            return ResponseEntity.ok().body(service.get(id));
        } catch (Exception ex) {
            return ResponseEntity.notFound().build();
        }
    }

//    @GetMapping("/card/{id}")
//    public ResponseEntity<?> getCards(@PathVariable Long id) {
//        try {
//            return new ResponseEntity<>(service.getAllCards(id), HttpStatus.OK);
//        } catch (Exception e) {
//            System.out.println("ERRORS : " + e.getMessage());
//            return ResponseEntity.badRequest().build();
//        }
//    }


}
