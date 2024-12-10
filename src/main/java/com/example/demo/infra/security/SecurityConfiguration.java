package com.example.demo.infra.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {

    @Autowired
    SecurityFilter securityFilter;

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
                .cors(cors->cors.configurationSource(corsConfigurationSource()))
                .csrf(csrf->csrf.disable())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // Define session stateless
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers(HttpMethod.POST, "/auth/login").permitAll() // Permite login sem autenticação
                        .requestMatchers(HttpMethod.POST, "/auth/register").permitAll() // Permite registro sem autenticação
                        .requestMatchers(HttpMethod.OPTIONS, "/auth/register").permitAll() // Permite registro sem autenticação
                        .requestMatchers(HttpMethod.GET, "/api/usuarios").hasRole("ADMIN") // Permite acesso às roles sem autenticação
                        .requestMatchers(HttpMethod.GET, "/api/roles").permitAll() // Permite acesso às roles sem autenticação
                        .requestMatchers(HttpMethod.POST, "/api/condominios").hasRole("ADMIN") // Requer papel de ADMIN
                        .requestMatchers(HttpMethod.GET, "/api/condominios").hasRole("ADMIN")
                        .anyRequest().authenticated() // Requer autenticação para outras rotas
                )
                .addFilterBefore(securityFilter, UsernamePasswordAuthenticationFilter.class);

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
