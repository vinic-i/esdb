package com.example.demo;

import com.example.demo.entity.Condominio;
import com.example.demo.entity.Usuario;
import com.example.demo.enums.UserRole;
import com.example.demo.repository.CondominioRepository;
import com.example.demo.repository.UsuarioRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("test")
public class CondominioServiceTest {

    @Autowired
    private CondominioRepository condominioRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Test
    public void testCriarCondominio() {
        Usuario owner = new Usuario("Maria Oliveira", "maria.oliveira@example.com", "senha123", UserRole.ADMIN, true);
        usuarioRepository.save(owner);

        Condominio condominio = new Condominio("Condomínio Solar", "Rua das Flores, 123", "Condomínio com excelente estrutura.", owner);

        condominioRepository.save(condominio);

        assertNotNull(condominio.getId(), "O ID do condomínio não deve ser nulo após o salvamento.");
        assertEquals("Condomínio Solar", condominio.getNome(), "O nome do condomínio deve ser 'Condomínio Solar'.");
        assertEquals("Rua das Flores, 123", condominio.getEndereco(), "O endereço do condomínio deve ser 'Rua das Flores, 123'.");
        assertEquals("Condomínio com excelente estrutura.", condominio.getDescricao(), "A descrição do condomínio deve ser 'Condomínio com excelente estrutura.'");
        assertEquals(owner, condominio.getOwner(), "O proprietário do condomínio deve ser 'Maria Oliveira'.");
    }
}
