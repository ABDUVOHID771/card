package com.example.springonlinecard;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class SpringOnlineCardApplication {

    public static void main(String[] args) {
        SpringApplication.run(SpringOnlineCardApplication.class, args);
    }

}
