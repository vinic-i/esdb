package com.example.demo.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Aplica CORS para todas as rotas da API
                .allowedOrigins("http://localhost:3000", "http://localhost:9090") // Permite requisições do front-end React
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Métodos HTTP permitidos
                .allowedHeaders("*") // Permite todos os headers
                .allowCredentials(true) // Permite envio de credenciais (cookies, autenticação)
                .maxAge(3600); // Tempo que as permissões de CORS ficam em cache (1 hora)
    }
}