package com.example.demo.service;

import com.example.demo.entity.Condominio;
import com.example.demo.entity.Usuario;
import com.example.demo.forms.CondominioDTO;
import com.example.demo.repository.CondominioRepository;
import com.example.demo.repository.UsuarioRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CondominioService {

    @Autowired
    private CondominioRepository condominioRepository;
    @Autowired
    private UsuarioRepository usuarioRepository;

    // Criar um novo condomínio
    public Condominio createCondominio(CondominioDTO condominioDTO) {
        // Buscando o usuário pelo id
        Usuario owner = usuarioRepository.findById(condominioDTO.getOwnerId())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado com o id: " + condominioDTO.getOwnerId()));

        // Criando a entidade Condominio
        Condominio newCondominio = new Condominio();
        newCondominio.setNome(condominioDTO.getNome());
        newCondominio.setEndereco(condominioDTO.getEndereco());
        newCondominio.setBloco(condominioDTO.getBloco());
        newCondominio.setApartamento(condominioDTO.getApartamento());
        newCondominio.setDescricao(condominioDTO.getDescricao());
        newCondominio.setOwner(owner); // Aqui setamos o objeto de usuário

        return condominioRepository.save(newCondominio); // Salvando o novo condomínio
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
