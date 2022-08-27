package com.projectbook.bookStore.model;

public class JwtSignUPRequest {
    private String  name;
    private String email;
    private String password;
    private int mobile;
    private Role role;
    public String getName() {
        return name;
    }
    public JwtSignUPRequest(String name, String email, String password, int mobile, Role role) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.mobile = mobile;
        this.role = role;
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



}
