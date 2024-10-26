package com.example.demo.repository;

import com.example.demo.entity.Residencia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ResidenciaRepository extends JpaRepository<Residencia, Long> {
    // Você pode adicionar métodos personalizados aqui, se necessário
}