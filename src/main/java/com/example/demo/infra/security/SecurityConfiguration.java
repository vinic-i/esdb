package com.example.demo.infra.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
public class SecurityConfiguration {

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        // Configuração do CORS diretamente no SecurityFilterChain
        http
                .cors().configurationSource(corsConfigurationSource()) // Novo método para configurar CORS
                .and()
                .csrf().disable() // Desabilita CSRF para API sem estado
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // Define session stateless
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers(HttpMethod.POST, "/auth/login").permitAll() // Permite login sem autenticação
                        .requestMatchers(HttpMethod.POST, "/auth/register").permitAll() // Permite registro sem autenticação
                        .requestMatchers(HttpMethod.GET, "/api/roles").permitAll() // Permite acesso às roles sem autenticação
                        .requestMatchers(HttpMethod.POST, "/api/espacos").hasRole("ADMIN") // Requer papel de ADMIN
                        .anyRequest().authenticated() // Requer autenticação para outras rotas
                );

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.addAllowedOrigin("http://localhost:3000"); // Define a origem permitida
        corsConfiguration.addAllowedMethod("*"); // Permite todos os métodos (GET, POST, etc.)
        corsConfiguration.addAllowedHeader("*"); // Permite todos os cabeçalhos
        corsConfiguration.setAllowCredentials(true); // Permite credenciais como cookies

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfiguration);
        return source;
    }
}
