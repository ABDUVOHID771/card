package com.example.springonlinecard.dao.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "loan_requests")
public class LoanRequests {

    @Id
    @Column(name = "id")
    private Integer id;

    @Column(name = "additional_phone")
    private String additionalPhone;

    @Column(name = "branch_id")
    private Integer branchId;

    @Column(name = "counting_strategy")
    private String countingStrategy;

    @Column(name = "loan_id")
    private Integer loanId;

    @Column(name = "passport_number")
    private String passportNumber;

    @Column(name = "passport_photo1")
    private String passportPhoto1;

    @Column(name = "passport_photo2")
    private String passportPhoto2;

    @Column(name = "passport_serie")
    private String passportSerie;

    @Column(name = "receipt_time")
    private Date receiptTime;

    @Column(name = "requested_amount")
    private Float requestedAmount;

    @Column(name = "salary_card_bin")
    private String salaryCardBin;

    @Column(name = "selfie_photo")
    private String selfiePhoto;

    @Column(name = "status")
    private Integer status;

    @Column(name = "TIN")
    private String TIN;

    @Column(name = "workplace")
    private String workplace;

    @Column(name = "user_id")
    private Integer userId;

}
