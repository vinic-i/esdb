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

    public Role criarRole(Role role) {
        return roleRepository.save(role);
    }

    public List<Role> encontrarTodos() {
        return roleRepository.findAll();
    }

    public Role encontrarPorId(Long id) {
        return roleRepository.findById(id).orElse(null);
    }

    public Role encontrarPorNome(String nome) {
        return roleRepository.findByNome(nome).orElse(null);
    }

    public void deleteRole(Long id) {
        roleRepository.deleteById(id);
    }
}
