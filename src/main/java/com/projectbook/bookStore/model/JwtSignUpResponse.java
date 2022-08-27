package com.projectbook.bookStore.model;

public class JwtSignUpResponse {
    private int id;
	private String name;
	private String email;
	private Role role;
    private String phonnenumber;
    public int getId() {
        return id;
    }
    public JwtSignUpResponse(int id, String name, String email, Role role, String phonnenumber) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
        this.phonnenumber = phonnenumber;
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
    public Role getRole() {
        return role;
    }
    public void setRole(Role role) {
        this.role = role;
    }
    public String getPhonnenumber() {
        return phonnenumber;
    }
    public void setPhonnenumber(String phonnenumber) {
        this.phonnenumber = phonnenumber;
    }
    
}
