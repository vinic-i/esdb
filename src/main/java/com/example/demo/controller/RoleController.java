package com.example.demo.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.enums.UserRole;


@RestController
@RequestMapping("/api/roles")
public class RoleController {
    
    @GetMapping
    public ResponseEntity<List<UserRole>> getAllRoles() {
        System.out.println(List.of(UserRole.values()));
        return ResponseEntity.ok(List.of(UserRole.values()));
    }
    
}
