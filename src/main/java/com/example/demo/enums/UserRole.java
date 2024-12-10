package com.example.demo.enums;

public enum UserRole {
    ADMIN("admim"),
    GERENCIADOR("gerenciador"),
    MORADOR("morador");

    public String role;

    UserRole(String role){
        this.role = role;
    }

    String getRole() {
        return role;
    }
    
}
