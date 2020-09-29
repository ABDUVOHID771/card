package com.example.springonlinecard.dao.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
public class Users {

    @Id
    @Column(name = "user_id")
    private int userId;
    @Column(name = "phone")
    private String phone;
    @Column(name = "code_client")
    private Integer codeClient;
    @Column(name = "created_date")
    private Date createdDate;
    @Column(name = "fullname")
    private String fullname;
    @Column(name = "password")
    private String password;
    @Column(name = "registered_at")
    private Date registeredAt;
    @Column(name = "status")
    private int status;
    @Column(name = "updated_at")
    private Date updatedAt;
    @Column(name = "updated_date")
    private Date updatedDate;
    @ManyToMany(targetEntity = Cards.class)
    @JoinTable(
            name = "user_cards",
            joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "card_id", referencedColumnName = "card_id")
    )
    @JsonIgnore
    List<Cards> cards = new ArrayList<>();
}
