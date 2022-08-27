package com.projectbook.bookStore.model;

import java.util.Collection;
import java.util.HashSet;

import javax.persistence.Column;
import javax.persistence.Entity;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;

import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@Entity
@Table(name="USER")
public class User implements UserDetails {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String name;
    @Column(unique = true)
    private String email;
    private String password;
    private int mobile;

  
@ManyToOne
   @JoinColumn(name="role_id")
   private Role role;

  
   
   

    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public int getMobile() {
        return mobile;
    }

    public void setMobile(int mobile) {
        this.mobile = mobile;
    }
    
    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
  
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {     
        HashSet<SimpleGrantedAuthority> authorties = new HashSet<>();
    authorties.add(new SimpleGrantedAuthority(this.role.getName()));
     return authorties;
    }
   
    @Override
    public String getUsername() {        
        return this.email;
    }


    public boolean isAccountNonExpired() {            
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {        
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {        
        return true;
    }

    @Override
    public boolean isEnabled() {        
        return true;
    }
    
    
  
    

}
