package com.example.springonlinecard.controller.exceptions;

import com.example.springonlinecard.exception.NotFoundException;
import com.example.springonlinecard.exception.ResourceNotFoundException;
import com.example.springonlinecard.exception.UsernameAlreadyExists;
import com.example.springonlinecard.exception.UsernameException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
@RestController
public class ExceptionController extends ResponseEntityExceptionHandler {

    @ExceptionHandler
    public final ResponseEntity<?> handleUsernameDuplicatedException(UsernameException usernameAlreadyExists, WebRequest webRequest) {
        UsernameAlreadyExists exists = new UsernameAlreadyExists(usernameAlreadyExists.getMessage());
        return new ResponseEntity<>(exists, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public final ResponseEntity<?> handleResourceNotFoundException(ResourceNotFoundException resourceNotFoundException, WebRequest webRequest) {
        NotFoundException notFoundException = new NotFoundException(resourceNotFoundException.getMessage());
        return new ResponseEntity<>(notFoundException, HttpStatus.BAD_REQUEST);
    }

}
