package com.example.springonlinecard.dao.repository;

import com.example.springonlinecard.dao.domain.Cards;
import com.example.springonlinecard.dao.domain.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CardsRepository extends JpaRepository<Cards, String> {

    List<Cards> findAllByUsers(Users users);

}
