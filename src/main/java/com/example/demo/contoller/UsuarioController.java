package com.example.demo.contoller;

import com.example.demo.entity.Usuario;
import com.example.demo.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping
    public ResponseEntity<Usuario> criarUsuario(@RequestBody Usuario usuario) {
        Usuario usuarioSalvo = usuarioService.salvarUsuario(usuario);
        return ResponseEntity.ok(usuarioSalvo);
    }

    @GetMapping
    public ResponseEntity<List<Usuario>> listarUsuarios() {
        List<Usuario> usuarios = usuarioService.listarTodos();
        return ResponseEntity.ok(usuarios);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Usuario> buscarUsuarioPorId(@RequestParam Long id) {
        Usuario usuarioSelecionado = usuarioService.encontrarUsuarioPorId(id);
        return ResponseEntity.ok(usuarioSelecionado);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Usuario> atualizarUsuario(@PathVariable Long id, @RequestBody Usuario usuario) {
        Usuario usuarioAtualizao = usuarioService.atualizarUsuario(id, usuario);
        return ResponseEntity.ok(usuarioAtualizao);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deletarUsuario(@PathVariable Long id) {
        usuarioService.deletarUsuario(id);
        return ResponseEntity.noContent().build();
    }

}
