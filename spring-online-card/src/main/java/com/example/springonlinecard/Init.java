package com.example.springonlinecard;

import com.example.springonlinecard.dao.domain.CardRequests;
import com.example.springonlinecard.dao.domain.CardUsers;
import com.example.springonlinecard.dao.domain.Cards;
import com.example.springonlinecard.dao.domain.Users;
import com.example.springonlinecard.service.CardRequestsService;
import com.example.springonlinecard.service.CardsService;
import com.example.springonlinecard.service.UserService;
import com.example.springonlinecard.service.UsersService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class Init implements CommandLineRunner {

    private final UserService userService;
    private final CardRequestsService cardRequestsService;
    private final UsersService usersService;
    private final CardsService cardsService;

    public Init(UserService userService, CardRequestsService cardRequestsService, UsersService usersService, CardsService cardsService) {
        this.userService = userService;
        this.cardRequestsService = cardRequestsService;
        this.usersService = usersService;
        this.cardsService = cardsService;
    }

    @Override
    public void run(String... args) throws Exception {
        init();
    }

    private void init() {
        //        CardUsers cardUsers = new CardUsers();
//        cardUsers.setUsername("admin");
//        cardUsers.setPassword("admin1233");
//        cardUsers.setConfirmPassword("admin1233");
//        cardUsers.setRole("ADMIN");
//        userService.createUser(cardUsers);
//
//
        userService.delete(1);
        CardUsers cardUsers1 = new CardUsers();
        cardUsers1.setId(1);
        cardUsers1.setUsername("card");
        cardUsers1.setPassword("card");
        cardUsers1.setConfirmPassword("card");
        cardUsers1.setRole("CARDADMIN");
        userService.createUser(cardUsers1);

        CardUsers cardUsers2 = new CardUsers();
        cardUsers2.setId(2);
        cardUsers2.setUsername("center");
        cardUsers2.setPassword("center");
        cardUsers2.setConfirmPassword("center");
        cardUsers2.setRole("CENTERADMIN");
        userService.createUser(cardUsers2);

    }

}
