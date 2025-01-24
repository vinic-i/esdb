package com.example.demo;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


import com.example.demo.entity.Condominio;
import com.example.demo.entity.Usuario;
import com.example.demo.repository.CondominioRepository;


import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import java.util.Optional;

@DataJpaTest
@ActiveProfiles("test")
public class CondominioRepositoryTests {
    @Autowired
    private CondominioRepository repository;

    @Test
    public void shouldSaveAndFindCondominium() {
        Condominio condo = new Condominio("Condominio teste", "Rua dos testes", null, null, null, new Usuario());
        repository.save(condo);

        Optional<Condominio> foundCondo = repository.findById(condo.getId());
        assertTrue(foundCondo.isPresent());
        assertEquals("Condominio teste", foundCondo.get().getNome());
    }
}
