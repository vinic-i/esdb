package com.example.demo.service;

import com.example.demo.entity.Espaco;
import com.example.demo.repository.EspacoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EspacoService {

    private final EspacoRepository espacoRepository;

    @Autowired
    public EspacoService(EspacoRepository espacoRepository) {
        this.espacoRepository = espacoRepository;
    }

    public List<Espaco> listarTodos() {
        return espacoRepository.findAll();
    }

    public Optional<Espaco> encontrarPorId(Long id) {
        return espacoRepository.findById(id);
    }

    public Espaco salvar(Espaco espaco) {
        return espacoRepository.save(espaco);
    }

    public void deletar(Long id) {
        espacoRepository.deleteById(id);
    }
}
