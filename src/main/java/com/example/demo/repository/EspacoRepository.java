package com.example.demo.repository;

import com.example.demo.entity.Espaco;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EspacoRepository extends JpaRepository<Espaco, Long> {
    // Você pode adicionar métodos personalizados aqui, se necessário
}
