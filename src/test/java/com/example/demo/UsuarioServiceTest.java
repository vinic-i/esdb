package com.example.demo;

import com.example.demo.entity.Usuario;
import com.example.demo.enums.UserRole;
import com.example.demo.repository.UsuarioRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class UsuarioServiceTest {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Test
    public void testCriarUsuario() {
        Usuario usuario = new Usuario("Carlos Souza", "carlos.souza@example.com", "senha123", UserRole.ADMIN, true);

        usuarioRepository.save(usuario);

        assertNotNull(usuario.getId(), "O ID do usuário não deve ser nulo após o salvamento.");
        assertEquals("Carlos Souza", usuario.getNome(), "O nome do usuário deve ser 'Carlos Souza'.");
        assertEquals("carlos.souza@example.com", usuario.getEmail(), "O email do usuário deve ser 'carlos.souza@example.com'.");
        assertEquals(UserRole.ADMIN, usuario.getRole(), "O papel do usuário deve ser 'ADMIN'.");
        assertTrue(usuario.isNotificacoes(), "O campo de notificações deve ser 'true'.");
    }
}
