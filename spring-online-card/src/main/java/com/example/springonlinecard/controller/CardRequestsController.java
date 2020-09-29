package com.example.springonlinecard.controller;

import com.example.springonlinecard.dao.domain.CardRequests;
import com.example.springonlinecard.exception.ResourceNotFoundException;
import com.example.springonlinecard.service.CardRequestsService;
import org.apache.coyote.Response;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.SQLException;
import java.util.*;

import org.springframework.web.client.RestTemplate;

@CrossOrigin(origins = {"http://192.168.70.64:8082", "http://localhost:3000", "http://localhost:8082"})
@RestController
@RequestMapping("/api/card-requests")
public class CardRequestsController {

    private final CardRequestsService service;
    private final RestTemplate restTemplate;

    public CardRequestsController(CardRequestsService service, RestTemplateBuilder restTemplate) {
        this.service = service;
        this.restTemplate = restTemplate.build();
    }

    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody CardRequests input, BindingResult result) {

        ResponseEntity<?> errors = getErrors(result);
        if (errors != null) {
            return errors;
        }

        CardRequests saved = service.create(input);

        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    // GET

    @GetMapping("/{id}")
    public ResponseEntity<CardRequests> read(@PathVariable Integer id) {
        try {
            return ResponseEntity
                    .ok()
                    .body(service.get(id));
        } catch (Exception e) {
            return ResponseEntity
                    .notFound().build();
        }
    }

    @GetMapping
    public ResponseEntity<?> readAll() {
        return ResponseEntity
                .ok()
                .body(service.getAll());
    }

    @RequestMapping(value = "/sid/{id}", method = RequestMethod.GET)
    public List<String> getImage(@PathVariable Integer id, HttpServletResponse response) throws IOException, SQLException, IOException {

        List<String> images = new ArrayList<>();
        try {
            CardRequests cardRequests = service.get(id);

            byte[] imagee = Files.readAllBytes(Paths.get("\\\\192.168.70.61\\Office\\cards\\" + cardRequests.getPassportPhoto1()));
            String image = Base64.getEncoder().encodeToString(imagee);
            images.add(image);
            byte[] imagee_1 = Files.readAllBytes(Paths.get("\\\\192.168.70.61\\Office\\cards\\" + cardRequests.getPassportPhoto2()));
            String image_1 = Base64.getEncoder().encodeToString(imagee_1);
            images.add(image_1);
            byte[] imagee_2 = Files.readAllBytes(Paths.get("\\\\192.168.70.61\\Office\\cards\\" + cardRequests.getSelfiePhoto()));
            String image_2 = Base64.getEncoder().encodeToString(imagee_2);
            images.add(image_2);
            return images;
        } catch (Exception e) {
            System.out.println("Error : " + e.getMessage());
        }
        return null;
    }

    @PutMapping("/{id}/{status}")
    public ResponseEntity<?> updateStatus(@RequestBody CardRequests input, @PathVariable Integer id, @PathVariable Integer status) {

//        System.out.println("COMING ID : " + id);
//        System.out.println("COMING STATUS : " + status);
//        System.out.println("COMING REQUEST : " + input.getStatus() + " : " + input.getId() + " : " + input.getPassportNumber());
//        return new ResponseEntity<>(input, HttpStatus.OK);
        if (input.getId() != id) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT).build();
        }
        try {
            return ResponseEntity.ok().body(service.changeStatus(id, status));
        } catch (Exception e) {
            throw new ResourceNotFoundException(input.toString());
        }
    }
    // EDIT

//    @PutMapping("/{id}")
//    public ResponseEntity<CardRequests> update(@RequestBody CardRequests input, @PathVariable Integer id) {
//
//        if (input.getId() != id) {
//            return ResponseEntity
//                    .status(HttpStatus.CONFLICT).build();
//        }
//        try {
//            input.setId(id);
//            return ResponseEntity
//                    .ok().body(service.update(input));
//        } catch (Exception e) {
//            return ResponseEntity
//                    .notFound().build();
//        }
//
//    }

    // DELETE

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        try {
            service.delete(id);
            return ResponseEntity
                    .noContent().build();
        } catch (Exception e) {
            return ResponseEntity
                    .notFound().build();
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

}
