package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Table;

// @OneToOne and @JoinColumn are optional if we want to establish a relationship with the User entity.
@Entity
@Table(name = "admin")
public class Admin {

    @Id
    @Column(name = "userid")
    private int userid;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "userid", insertable = false, updatable = false)
    @JsonIgnore // This will prevent the user field from being serialized
    private User user;



    // @OneToOne(fetch = FetchType.EAGER)
    // @JoinColumn(name = "userid", referencedColumnName = "userid", insertable = false, updatable = false)
    // private User user;

    // Getters and setters
    public int getUserid() {
        return userid;
    }

    public void setUserid(int userid) {
        this.userid = userid;
    }

    // If using the relationship, include getter and setter for user as well.
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

}
