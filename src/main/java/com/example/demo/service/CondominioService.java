package com.example.demo.service;

import com.example.demo.entity.Condominio;
import com.example.demo.entity.Espaco;
import com.example.demo.entity.Residencia;
import com.example.demo.entity.Usuario;
import com.example.demo.forms.CondominioDTO;
import com.example.demo.repository.CondominioRepository;
import com.example.demo.repository.EspacoRepository;
import com.example.demo.repository.ResidenciaRepository;
import com.example.demo.repository.UsuarioRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;

@Service
public class CondominioService {

    @Autowired
    private CondominioRepository condominioRepository;
    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private EspacoRepository espacoRepository;
    @Autowired
    private ResidenciaRepository residenciaRepository;

    public Condominio createCondominio(CondominioDTO condominioDTO) {
        Usuario owner = usuarioRepository.findById(condominioDTO.getOwnerId())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado com o id: " + condominioDTO.getOwnerId()));

        Condominio newCondominio = new Condominio();
        newCondominio.setNome(condominioDTO.getNome());
        newCondominio.setEndereco(condominioDTO.getEndereco());
        newCondominio.setDescricao(condominioDTO.getDescricao());
        newCondominio.setOwner(owner);

        List<Residencia> residencias = residenciaRepository.findAllById(condominioDTO.getResidenciaIds());
        List<Usuario> administradores = usuarioRepository.findAllById(condominioDTO.getAdministradoreIds());
        newCondominio.setAdministradores(new HashSet<>(administradores));

        return condominioRepository.save(newCondominio);
    }

    public List<Condominio> getCondominiosByOwner(Long ownerId) {
        return condominioRepository.findByOwnerId(ownerId);
    }

    public Condominio updateCondominio(Long id, CondominioDTO condominioDTO, Long userId) {
        Condominio existingCondominio = condominioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Condomínio não encontrado com o id: " + id));

        if (!existingCondominio.getOwner().getId().equals(userId) &&
                existingCondominio.getAdministradores().stream().noneMatch(admin -> admin.getId().equals(userId))) {
            throw new RuntimeException("Usuário não possui permissão para alterar este condomínio");
        }

        existingCondominio.setNome(condominioDTO.getNome());
        existingCondominio.setEndereco(condominioDTO.getEndereco());
        existingCondominio.setDescricao(condominioDTO.getDescricao());

        Usuario owner = usuarioRepository.findById(condominioDTO.getOwnerId())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado com o id: " + condominioDTO.getOwnerId()));
        existingCondominio.setOwner(owner);

        List<Residencia> residencias = residenciaRepository.findAllById(condominioDTO.getResidenciaIds());

        existingCondominio.getAdministradores().clear();
        List<Usuario> administradores = usuarioRepository.findAllById(condominioDTO.getAdministradoreIds());
        existingCondominio.getAdministradores().addAll(administradores);

        return condominioRepository.save(existingCondominio);
    }


    public List<Condominio> getAllCondominios() {
        return condominioRepository.findAll();
    }

    public Optional<Condominio> getCondominioById(Long id) {
        return condominioRepository.findById(id);
    }

    public void deleteCondominio(Long id) {
        condominioRepository.deleteById(id);
    }

    public List<Espaco> getEspacosByCondominioId(Long condominioId) {
        return espacoRepository.findByCondominioId(condominioId);
    }
}
