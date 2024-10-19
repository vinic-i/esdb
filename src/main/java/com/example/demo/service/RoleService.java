package com.example.demo.service;

import com.example.demo.entity.Role;
import com.example.demo.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleService {

    @Autowired
    private RoleRepository roleRepository;

    // Encontrar todos os papéis
    public List<Role> encontrarTodos() {
        return roleRepository.findAll();
    }

    // Encontrar um papel pelo ID
    public Role encontrarPorId(Long id) {
        return roleRepository.findById(id).orElse(null);
    }

    // Encontrar um papel pelo nome
    public Role encontrarPorNome(String nome) {
        return roleRepository.findByNome(nome).orElse(null);
    }
}
