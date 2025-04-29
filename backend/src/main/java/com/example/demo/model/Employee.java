package com.example.demo.model;

import jakarta.persistence.*;
import java.math.BigDecimal;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "employee")
public class Employee {

    @Id
    @Column(name = "userid")
    private int userid;

    @Column(name = "salary", nullable = false)
    private BigDecimal salary;

    @Column(name = "deptid", nullable = false)
    private int deptid;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "userid", insertable = false, updatable = false)
    @JsonIgnore // This will prevent the user field from being serialized
    private User user;

    // Getters and setters
    public int getUserid() {
        return userid;
    }

    public void setUserid(int userid) {
        this.userid = userid;
    }

    public BigDecimal getSalary() {
        return salary;
    }

    public void setSalary(BigDecimal salary) {
        this.salary = salary;
    }

    public int getDeptid() {
        return deptid;
    }

    public void setDeptid(int deptid) {
        this.deptid = deptid;
    }

    public User getUser() {
        return user;
    }

    //added setUser here
    public void setUser(User user) {
        this.user= user;
    }


}

/*
 * @Entity helps us map our class to a database table
 * @Table allows us to specify the name of the table
 * @Id specifies the primary key
 * @Column specifies the column name
 * @OneToOne specifies a one-to-one relationship
 * @JoinColumn specifies the foreign key
 * @JsonIgnore prevents the user field from being serialized
 * 
 */
