package com.example.demo.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Usuario;
import com.example.demo.forms.UsuarioDTO;
import com.example.demo.repository.UsuarioRepository;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public Usuario salvarUsuario(UsuarioDTO usuarioDTO) {
        Usuario novoUsuario = new Usuario();
        novoUsuario.setNome(usuarioDTO.getNome());
        novoUsuario.setEmail(usuarioDTO.getEmail());
        novoUsuario.setSenha(usuarioDTO.getSenha());

        novoUsuario.setRole(usuarioDTO.getRole());
        novoUsuario.setDataCriacao(LocalDateTime.now());
        novoUsuario.setDataAtualizacao(LocalDateTime.now());

        return usuarioRepository.save(novoUsuario);
    }

    public List<Usuario> buscarUsuarios(String nome, String email) {
        if (nome != null && email != null) {
            return usuarioRepository.findByNomeAndEmail(nome, email);
        } else if (nome != null) {
            return usuarioRepository.findByNome(nome);
        } else if (email != null) {
            return List.of((Usuario) usuarioRepository.findByEmail(email));
        } else {
            return listarTodos();
        }
    }

    public Usuario encontrarUsuarioPorId(Long id) {
        return usuarioRepository.findById(id).get();
    }

    public List<Usuario> listarTodos() {
        return usuarioRepository.findAll();
    }

    public Usuario atualizarUsuario(Long id, Usuario usuarioAtualizado) {
        if (usuarioRepository.existsById(id)) {
            usuarioAtualizado.setId(id);
            return usuarioRepository.save(usuarioAtualizado);
        }
        return null;
    }

    public void deletarUsuario(Long id) {
        usuarioRepository.deleteById(id);
    }


}
