package com.example.demo.repository;

import com.example.demo.entity.Encomenda;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EncomendaRepository extends JpaRepository<Encomenda, Long> {
    // Você pode adicionar métodos personalizados aqui, se necessário
}