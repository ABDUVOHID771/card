package com.example.springonlinecard.dao.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.Date;

@Getter
@Setter
@Entity
@EntityListeners(AuditingEntityListener.class)
@Table(name = "card_users")
public class CardUsers {

    @Id
    private int id;

    @NotBlank(message = "Password is required")
    @Column(name = "password")
    private String password;

    @Transient
    private String confirmPassword;

    @NotBlank(message = "Username is required")
    @Column(unique = true, name = "username")
    private String username;

    @Column(name = "role")
    private String role;

    @Column(name = "blocked")
    private boolean blocked;

    @Column(nullable = false, updatable = false, name = "created_at")
    @JsonFormat(pattern = "yyyy-mm-dd HH:mm:ss")
    @CreatedDate
    private Date createdAt;

    @Column(name = "updated_at")
    @JsonFormat(pattern = "yyyy-mm-dd HH:mm:ss")
    @LastModifiedDate
    private Date updatedAt;

}
