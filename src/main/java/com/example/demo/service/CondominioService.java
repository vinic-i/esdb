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
        newCondominio.setBloco(condominioDTO.getBloco());
        newCondominio.setApartamento(condominioDTO.getApartamento());
        newCondominio.setDescricao(condominioDTO.getDescricao());
        newCondominio.setOwner(owner); // Aqui setamos o objeto de usuário

        List<Residencia> residencias = residenciaRepository.findAllById(condominioDTO.getResidenciaIds());
        newCondominio.setResidencias(new HashSet<>(residencias));
        List<Usuario> administradores = usuarioRepository.findAllById(condominioDTO.getAdministradoreIds());
        newCondominio.setAdministradores(new HashSet<>(administradores));

        return condominioRepository.save(newCondominio); // Salvando o novo condomínio
    }

    public List<Condominio> getCondominiosByOwner(Long ownerId) {
        return condominioRepository.findByOwnerId(ownerId);
    }

    // Atualizar um condomínio
    public Condominio updateCondominio(Long id, CondominioDTO condominioDTO, Long userId) {
        // Buscar o condomínio existente pelo ID
        Condominio existingCondominio = condominioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Condomínio não encontrado com o id: " + id));

        // Verificar se o usuário é o owner ou um dos administradores
        if (!existingCondominio.getOwner().getId().equals(userId) &&
                existingCondominio.getAdministradores().stream().noneMatch(admin -> admin.getId().equals(userId))) {
            throw new RuntimeException("Usuário não possui permissão para alterar este condomínio");
        }

        // Atualizar os dados do condomínio com as informações do DTO
        existingCondominio.setNome(condominioDTO.getNome());
        existingCondominio.setEndereco(condominioDTO.getEndereco());
        existingCondominio.setBloco(condominioDTO.getBloco());
        existingCondominio.setApartamento(condominioDTO.getApartamento());
        existingCondominio.setDescricao(condominioDTO.getDescricao());

        // Atualizar o proprietário se necessário
        Usuario owner = usuarioRepository.findById(condominioDTO.getOwnerId())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado com o id: " + condominioDTO.getOwnerId()));
        existingCondominio.setOwner(owner);

        // Atualizar as residências associadas ao condomínio
        // Limpa as residências existentes
        existingCondominio.getResidencias().clear();
        // Adiciona as novas residências
        List<Residencia> residencias = residenciaRepository.findAllById(condominioDTO.getResidenciaIds());
        existingCondominio.getResidencias().addAll(residencias);

        // Atualizar a lista de administradores
        existingCondominio.getAdministradores().clear(); // Limpa os administradores existentes
        List<Usuario> administradores = usuarioRepository.findAllById(condominioDTO.getAdministradoreIds());
        existingCondominio.getAdministradores().addAll(administradores);
        // Salvar as mudanças no banco de dados
        return condominioRepository.save(existingCondominio);
    }

    // Listar todos os condomínios
    public List<Condominio> getAllCondominios() {
        return condominioRepository.findAll();
    }

    // Obter um condomínio por ID
    public Optional<Condominio> getCondominioById(Long id) {
        return condominioRepository.findById(id);
    }



    // Deletar um condomínio
    public void deleteCondominio(Long id) {
        condominioRepository.deleteById(id);
    }

    public List<Espaco> getEspacosByCondominioId(Long condominioId) {
        return espacoRepository.findByCondominioId(condominioId);
    }
}
