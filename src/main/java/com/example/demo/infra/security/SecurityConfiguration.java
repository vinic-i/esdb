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
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // Define session stateless
                .authorizeHttpRequests(authorize -> authorize
                        // Permissões para /auth/login e /auth/register
                        .requestMatchers(HttpMethod.POST, "/auth/login").permitAll()
                        .requestMatchers(HttpMethod.POST, "/auth/register").permitAll()
                        .requestMatchers(HttpMethod.OPTIONS, "/auth/register").permitAll()

                        // Permissões para /api/condominios
                        .requestMatchers(HttpMethod.GET, "/api/condominios").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/condominios/{id}").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/condominios/owner/{ownerId}").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/condominios/{condominioId}/espacos").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/condominios").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/api/condominios/{id}/{idUser}").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/condominios/{id}").hasRole("ADMIN")

                        // Permissões para /api/espacos
                        .requestMatchers(HttpMethod.GET, "/api/espacos").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/espacos/disponibilidade/{id}").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/espacos/{id}").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/espacos").permitAll()
                        .requestMatchers(HttpMethod.DELETE, "/api/espacos/{id}").permitAll()

                        // Permissões para /api/roles
                        .requestMatchers(HttpMethod.GET, "/api/roles").permitAll()
                        .anyRequest().authenticated() // Requer autenticação para outras rotas
                )
                .addFilterBefore(securityFilter, UsernamePasswordAuthenticationFilter.class); // Filtro de segurança

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.addAllowedOrigin("http://localhost:3000"); // Define a origem permitida
        corsConfiguration.addAllowedOrigin("http://localhost:9090"); // Define a origem permitida
        corsConfiguration.addAllowedMethod("*"); // Permite todos os métodos (GET, POST, etc.)
        corsConfiguration.addAllowedHeader("*"); // Permite todos os cabeçalhos
        corsConfiguration.setAllowCredentials(true); // Permite credenciais como cookies

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfiguration);
        return source;
    }
}
