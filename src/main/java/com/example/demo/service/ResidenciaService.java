package com.example.demo.service;

import com.example.demo.entity.Residencia;
import com.example.demo.repository.ResidenciaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ResidenciaService {

    private final ResidenciaRepository residenciaRepository;

    @Autowired
    public ResidenciaService(ResidenciaRepository residenciaRepository) {
        this.residenciaRepository = residenciaRepository;
    }

    public List<Residencia> listarTodas() {
        return residenciaRepository.findAll();
    }

    public Optional<Residencia> encontrarPorId(Long id) {
        return residenciaRepository.findById(id);
    }

    public Residencia salvar(Residencia residencia) {
        return residenciaRepository.save(residencia);
    }

    public void deletar(Long id) {
        residenciaRepository.deleteById(id);
    }
}
