package com.example.demo.service;

import com.example.demo.entity.Condominio;
import com.example.demo.repository.CondominioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CondominioService {

    @Autowired
    private CondominioRepository condominioRepository;

    // Criar um novo condomínio
    public Condominio createCondominio(Condominio condominio) {
        return condominioRepository.save(condominio);
    }

    // Listar todos os condomínios
    public List<Condominio> getAllCondominios() {
        return condominioRepository.findAll();
    }

    // Obter um condomínio por ID
    public Optional<Condominio> getCondominioById(Long id) {
        return condominioRepository.findById(id);
    }

    // Atualizar um condomínio
    public Condominio updateCondominio(Long id, Condominio updatedCondominio) {
        updatedCondominio.setId(id);
        return condominioRepository.save(updatedCondominio);
    }

    // Deletar um condomínio
    public void deleteCondominio(Long id) {
        condominioRepository.deleteById(id);
    }
}
