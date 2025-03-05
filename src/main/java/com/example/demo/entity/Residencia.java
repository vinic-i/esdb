package com.example.demo.entity;

import com.example.demo.enums.TipoResidencia;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Residencia {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotEmpty(message = "O número da residência é obrigatório.")
    private String numero;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "bloco_id", nullable = false)
    @JsonBackReference // Evita a serialização recursiva
    private Bloco bloco; // Agora, estamos relacionando Residencia com Bloco através do id

    @Enumerated(EnumType.STRING) // Para armazenar como string no banco de dados
    @Column(name = "tipo", nullable = false)
    private TipoResidencia tipo;

    @ManyToMany
    @JoinTable(
            name = "residencia_usuarios",
            joinColumns = @JoinColumn(name = "residencia_id"),
            inverseJoinColumns = @JoinColumn(name = "usuario_id")
    )
    @JsonManagedReference // Indica que esta é a parte "gerenciada" da referência
    private Set<Usuario> usuarios = new HashSet<>(); // Conjunto de usuários associados à residência

    @Column(name = "data_registro", nullable = false)
    private LocalDateTime dataRegistro;

    @Column(name = "data_atualizacao")
    private LocalDateTime dataAtualizacao;

    public Residencia() {
    }

    public Residencia(String numero, Bloco bloco, TipoResidencia tipo) {
        this.numero = numero;
        this.bloco = bloco; // Inicializando bloco
        this.tipo = tipo;
        this.dataRegistro = LocalDateTime.now();
        this.dataAtualizacao = LocalDateTime.now();
    }

    // Getters e Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNumero() {
        return numero;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }

    public Bloco getBloco() {
        return bloco; // Getter para bloco
    }

    public void setBloco(Bloco bloco) {
        this.bloco = bloco; // Setter para bloco
    }

    public TipoResidencia getTipo() {
        return tipo;
    }

    public void setTipo(TipoResidencia tipo) {
        this.tipo = tipo;
    }

    public Set<Usuario> getUsuarios() {
        return usuarios; // Getter para usuários
    }

    public void setUsuarios(Set<Usuario> usuarios) {
        this.usuarios = usuarios; // Setter para usuários
    }

    public void addUsuario(Usuario usuario) {
        this.usuarios.add(usuario); // Adiciona um usuário ao conjunto
        usuario.getResidencias().add(this); // Adiciona esta residência ao conjunto de residências do usuário
    }

    public void removeUsuario(Usuario usuario) {
        this.usuarios.remove(usuario); // Remove um usuário do conjunto
        usuario.getResidencias().remove(this); // Remove esta residência do conjunto de residências do usuário
    }

    public LocalDateTime getDataRegistro() {
        return dataRegistro;
    }

    public void setDataRegistro(LocalDateTime dataRegistro) {
        this.dataRegistro = dataRegistro;
    }

    public LocalDateTime getDataAtualizacao() {
        return dataAtualizacao;
    }

    public void setDataAtualizacao(LocalDateTime dataAtualizacao) {
        this.dataAtualizacao = dataAtualizacao;
    }
}
