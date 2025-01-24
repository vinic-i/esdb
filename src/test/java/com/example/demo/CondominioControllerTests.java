package com.example.demo;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.client.match.MockRestRequestMatchers.jsonPath;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class CondominioControllerTests {
    @Autowired
    private MockMvc mockMvc;

    @Test
    public void shouldReturnListOfCondominiums() throws Exception {
        mockMvc.perform(get("/api/condominios"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").isNotEmpty());
    }
}
