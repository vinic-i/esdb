package com.example.demo.repository;

import com.example.demo.entity.Espaco;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EspacoRepository extends JpaRepository<Espaco, Long> {
    List<Espaco> findByCondominioId(Long condominioId);
}
