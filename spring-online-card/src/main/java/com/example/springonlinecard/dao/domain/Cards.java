package com.example.springonlinecard.dao.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "cards")
public class Cards {

    @Id
    @Column(name = "card_id")
    private String cardId;
    @Column(name = "balance")
    private BigInteger balance;
    @Column(name = "bank_account")
    private String bankAccount;
    @Column(name = "bank_id")
    private Integer bankId;
    @Column(name = "card_bin")
    private String cardBin;
    @Column(name = "card_pan")
    private String cardPan;
    @Column(name = "card_token")
    private String cardToken;
    @Column(name = "card_type")
    private String cardType;
    @Column(name = "expiry_date")
    private Integer expiryDate;
    @Column(name = "phone")
    private String phone;
    @Column(name = "sms_state")
    private String SmsState;
    @Column(name = "status")
    private Integer status;
    @Column(name = "type_id")
    private Integer typeId;

    @ManyToMany(targetEntity = Users.class)
    @JoinTable(
            name = "user_cards",
            joinColumns = @JoinColumn(name = "card_id", referencedColumnName = "card_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id", referencedColumnName = "user_id")
    )
    @JsonIgnore
    List<Users> users = new ArrayList<>();

}
