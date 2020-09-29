package com.example.springonlinecard.service;

import com.example.springonlinecard.dao.domain.CardUsers;
import com.example.springonlinecard.dao.repository.UserRepository;
import com.example.springonlinecard.exception.UsernameException;
import com.google.common.base.Strings;
import javassist.NotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }


    public CardUsers update(CardUsers updating) throws NotFoundException {

        CardUsers user = userRepository.findById(updating.getId()).orElseThrow(() -> new NotFoundException("Not Found !"));

        return userRepository.save(user);

    }

    public CardUsers getByUsername(String username) {
        CardUsers users = userRepository.findByUsername(username);
        return userRepository.findByUsername(username);
    }

    public CardUsers createUser(CardUsers user) {
        try {
            if (user.getId() == 0) {
                user.setId(0);
            }
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            user.setConfirmPassword("");
            if (Strings.isNullOrEmpty(user.getRole())) {
                user.setRole("USER");
            }
            user.setBlocked(true);
            return userRepository.save(user);
        } catch (Exception e) {
            System.out.println("ERROR IN CASE :::::::" + e.getMessage());
            throw new UsernameException(user.getUsername());
        }
    }

    public CardUsers getById(Integer id) throws NotFoundException {
        return userRepository.findById(id).orElseThrow(() -> new NotFoundException("Not found"));
    }

    public List<CardUsers> getAllUsers() {
        return userRepository.findAll();
    }

    public void delete(Integer id) {
        this.userRepository.deleteById(id);
    }

}
