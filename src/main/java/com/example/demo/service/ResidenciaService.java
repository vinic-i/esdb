package com.example.demo.service;

import com.example.demo.entity.Residencia;
import com.example.demo.entity.Usuario;
import com.example.demo.repository.ResidenciaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class ResidenciaService {

    private final ResidenciaRepository residenciaRepository;

    @Autowired
    public ResidenciaService(ResidenciaRepository residenciaRepository) {
        this.residenciaRepository = residenciaRepository;
    }

    public Set<Usuario> obterUsuariosPorResidencia(Long residenciaId) {
        Residencia residencia = residenciaRepository.findById(residenciaId).orElse(null);

        if (residencia != null) {
            return residencia.getUsuarios();
        }

        return null;
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
