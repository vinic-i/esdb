package com.example.demo.service;

import com.example.demo.entity.Role;
import com.example.demo.entity.Usuario;
import com.example.demo.forms.UsuarioDTO;
import com.example.demo.repository.RoleRepository;
import com.example.demo.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private RoleRepository roleRepository;

    public Usuario salvarUsuario(UsuarioDTO usuarioDTO) {
        Usuario novoUsuario = new Usuario();
        novoUsuario.setNome(usuarioDTO.getNome());
        novoUsuario.setEmail(usuarioDTO.getEmail());
        novoUsuario.setSenha(usuarioDTO.getSenha());

        // Busca as roles com base nos IDs do DTO
        Set<Role> roles = usuarioDTO.getRoleIds().stream()
                .map(roleId -> roleRepository.findById(roleId)
                        .orElseThrow(() -> new RuntimeException("Role não encontrada: " + roleId)))
                .collect(Collectors.toSet());

        novoUsuario.setRoles(roles);
        novoUsuario.setDataCriacao(LocalDateTime.now());
        novoUsuario.setDataAtualizacao(LocalDateTime.now());

        return usuarioRepository.save(novoUsuario);
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

    public Optional<Usuario> encontrarPorEmail(String email) {
        return usuarioRepository.findByEmail(email);
    }

}
