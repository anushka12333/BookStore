package com.projectbook.bookStore.model;

import javax.persistence.FetchType;

import java.util.Set;


import javax.persistence.CascadeType;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;

import javax.persistence.Id;
import javax.persistence.OneToMany;

@Entity
public class Role {
   
    @Id
   @GeneratedValue
    private int id;

    private String name;
    @OneToMany(targetEntity=User.class,mappedBy="role",cascade =CascadeType.ALL,fetch=FetchType.LAZY)
    private Set<User> users;

    public int getId() {
        return id;
    }  

  

    public void setId(int id) {
        this.id = id;
    }

    public Role() {
    }



    public Role(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
    
}

