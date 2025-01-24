package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Usuario;
import com.example.demo.forms.AuthenticationDTO;
import com.example.demo.forms.LoginResponseDTO;
import com.example.demo.forms.UsuarioDTO;
import com.example.demo.infra.security.TokenService;
import com.example.demo.repository.UsuarioRepository;

import jakarta.validation.Valid;

@RestController
@RequestMapping("auth")
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private TokenService tokenService;

    @PostMapping("/login")
    @ResponseBody
    public ResponseEntity<?> login(@RequestBody @Valid AuthenticationDTO data){
        try {
            var usernamePassword = new UsernamePasswordAuthenticationToken(data.email(), data.password());
            var auth = this.authenticationManager.authenticate(usernamePassword);
            var token = tokenService.generateToken((Usuario) auth.getPrincipal());

            Usuario usuario = ((Usuario) auth.getPrincipal());

            return ResponseEntity.ok(new LoginResponseDTO(token, usuario.getEmail(), usuario.getNome(), usuario.getId(), usuario.getRole().toString()));
        } catch (BadCredentialsException e) {

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Credenciais inválidas. Verifique o e-mail e a senha.");
        } catch (Exception e) {
            
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Ocorreu um erro inesperado. Tente novamente mais tarde.");
        }
    }

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
