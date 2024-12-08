package com.example.demo.forms;

import com.example.demo.enums.UserRole;

public record RegisterDTO(String login, String password, UserRole role) {

}