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
@Table(name = "card_requests")
public class CardRequests {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;
    @Column(name = "user_id")
    private int userId;
    @Column(name = "card_type")
    private int cardType;
    @Column(name = "request_purpose")
    private int requestPurpose;
    @Column(name = "status")
    private int status;
    @Column(name = "passport_photo1")
    private String passportPhoto1;
    @Column(name = "passport_photo2")
    private String passportPhoto2;
    @Column(name = "selfie_photo")
    private String selfiePhoto;
    @Column(name = "additional_phone")
    private String additionalPhone;
    @Column(name = "card_bin")
    private String cardBin;
    @Column(name = "passport_serie")
    private String passportSerie;
    @Column(name = "passport_number")
    private String passportNumber;
    @Column(name = "delivery_address")
    private String deliveryAddress;
    @Column(name = "long")
    private String longg;
    @Column(name = "lat")
    private String lat;
    @Column(name = "request_datetime")
    private Date requestDatetime;

}
