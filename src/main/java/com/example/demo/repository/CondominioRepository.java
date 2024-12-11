package com.example.demo.repository;

import com.example.demo.entity.Condominio;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CondominioRepository extends JpaRepository<Condominio, Long> {

    List<Condominio> findByOwnerId(Long ownerId);

}
