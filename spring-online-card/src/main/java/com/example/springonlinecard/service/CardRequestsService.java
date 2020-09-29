package com.example.springonlinecard.service;

import com.example.springonlinecard.dao.domain.CardRequests;
import com.example.springonlinecard.dao.domain.Status;
import com.example.springonlinecard.dao.repository.CardRequestsRepository;
import com.example.springonlinecard.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class CardRequestsService {

    private final CardRequestsRepository repository;

    public CardRequestsService(CardRequestsRepository repository) {
        this.repository = repository;
    }

    public CardRequests create(CardRequests input) {
        return repository.save(input);
    }

    public CardRequests get(Integer id) {
        Optional<CardRequests> entity = repository.findById(id);
        if (entity == null) {
            throw new ResourceNotFoundException(id);
        }
        return entity.get();
    }

    public List<CardRequests> getAll() {
        return repository.findAll();
    }

    @Transactional
    public void delete(Integer id) {
        repository.deleteById(id);
    }

    public CardRequests changeStatus(Integer id, Integer status) {
        CardRequests cardRequests = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException(id));
        if (cardRequests.getStatus() > status) {
            throw new ResourceNotFoundException(status);
        }

        if (cardRequests.getStatus() < Status.CANCEL.getValue()) {
            cardRequests.setStatus(status);
            return repository.save(cardRequests);
        }
        throw new ResourceNotFoundException("Illegal");
    }

}
