package com.example.springonlinecard.exception;

public class UsernameException extends BaseException {
    public UsernameException(String message) {
        super("Username : " + message + " is already exists");
    }
}
