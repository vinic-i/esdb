package com.example.demo.service;

import com.example.demo.entity.Encomenda;
import com.example.demo.entity.Residencia;
import com.example.demo.entity.Usuario;
import com.example.demo.enums.StatusEncomenda;
import com.example.demo.forms.EncomendaDTO;
import com.example.demo.repository.EncomendaRepository;
import com.example.demo.repository.ResidenciaRepository;
import com.example.demo.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EncomendaService {

    private final EncomendaRepository encomendaRepository;
    private final UsuarioRepository usuarioRepository;
    private final ResidenciaRepository residenciaRepository;

    @Autowired
    public EncomendaService(EncomendaRepository encomendaRepository, UsuarioRepository usuarioRepository, ResidenciaRepository residenciaRepository) {
        this.encomendaRepository = encomendaRepository;
        this.usuarioRepository = usuarioRepository;
        this.residenciaRepository = residenciaRepository;
    }

    public List<Encomenda> listarTodas() {
        return encomendaRepository.findAll();
    }

    public Optional<Encomenda> encontrarPorId(Long id) {
        return encomendaRepository.findById(id);
    }

    public Encomenda salvar(EncomendaDTO encomendaDTO) {

        // Buscar o usuário pelo ID
        Usuario usuario = usuarioRepository.findById(encomendaDTO.getUsuarioId())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado com o id: " + encomendaDTO.getUsuarioId()));

        // Buscar a residência pelo ID (se fornecido)
        Residencia residencia = null;
        if (encomendaDTO.getResidenciaId() != null) {
            residencia = residenciaRepository.findById(encomendaDTO.getResidenciaId())
                    .orElseThrow(() -> new RuntimeException("Residência não encontrada com o id: " + encomendaDTO.getResidenciaId()));
        }

        // Criar a nova encomenda
        Encomenda encomenda = new Encomenda();
        encomenda.setOutroMorador(encomendaDTO.getOutroMorador());
        encomenda.setDataChegada(encomendaDTO.getDataChegada().atStartOfDay());

        try {
            // Tentando converter a string para o enum
            encomenda.setStatus(encomendaDTO.getStatus());
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Status de encomenda inválido: " + encomendaDTO.getStatus());
        }

        encomenda.setUsuarioDestinatario(usuario);
        encomenda.setResidencia(residencia);

        if (encomendaDTO.getNomeRetirada() != null) {
            encomenda.setNomeRetirada(encomendaDTO.getNomeRetirada());
        }
        if (encomendaDTO.getDocumentoRetirada() != null) {
            encomenda.setDocumentoRetirada(encomendaDTO.getDocumentoRetirada());
        }

        // Salvar a encomenda e retornar
        return encomendaRepository.save(encomenda);
    }

    public void deletar(Long id) {
        encomendaRepository.deleteById(id);
    }
}
