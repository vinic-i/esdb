package com.example.demo.service;

import com.example.demo.entity.Encomenda;
import com.example.demo.repository.EncomendaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EncomendaService {

    private final EncomendaRepository encomendaRepository;

    @Autowired
    public EncomendaService(EncomendaRepository encomendaRepository) {
        this.encomendaRepository = encomendaRepository;
    }

    public List<Encomenda> listarTodas() {
        return encomendaRepository.findAll();
    }

    public Optional<Encomenda> encontrarPorId(Long id) {
        return encomendaRepository.findById(id);
    }

    public Encomenda salvar(Encomenda encomenda) {
        return encomendaRepository.save(encomenda);
    }

    public void deletar(Long id) {
        encomendaRepository.deleteById(id);
    }
}
