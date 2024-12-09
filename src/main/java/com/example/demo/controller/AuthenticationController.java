package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entity.Usuario;
import com.example.demo.forms.AuthenticationDTO;
import com.example.demo.forms.UsuarioDTO;
import com.example.demo.repository.UsuarioRepository;

import jakarta.validation.Valid;

@RestController
@RequestMapping("auth")
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Valid AuthenticationDTO data){
        try {
            // Tenta autenticar o usuário
            var usernamePassword = new UsernamePasswordAuthenticationToken(data.email(), data.password());
            var auth = this.authenticationManager.authenticate(usernamePassword);
            // Se a autenticação for bem-sucedida, retorna um status de sucesso
            return ResponseEntity.ok().build();
        } catch (BadCredentialsException e) {
            // Caso as credenciais sejam inválidas, retorna um erro com a mensagem apropriada
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Credenciais inválidas. Verifique o e-mail e a senha.");
        } catch (Exception e) {
            // Em caso de outras exceções, captura e retorna um erro genérico
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Ocorreu um erro inesperado. Tente novamente mais tarde.");
        }
    }

    @CrossOrigin(origins = "http://localhost:3000") // Permitindo requisições de http://localhost:3000
    @PostMapping("/register")
    public ResponseEntity register(@RequestBody UsuarioDTO data) {
        
        if(usuarioRepository.findByEmail(data.getEmail()) != null) 
            return ResponseEntity.badRequest().build();

        String encryptedPassword = new BCryptPasswordEncoder().encode(data.getSenha());
        Usuario novoUsuario = new Usuario(data.getNome(),data.getEmail(), encryptedPassword, data.getRole(), false);
        
        usuarioRepository.save(novoUsuario);

        return ResponseEntity.ok().build();
    }
    
}
