package com.example.demo.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;

import java.util.HashSet;
import java.util.Set;

@Entity
public class Condominio {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotEmpty(message = "O nome do condomínio é obrigatório.")
    private String nome;

    @NotEmpty(message = "O endereço é obrigatório.")
    private String endereco;

    @Column(name = "descricao")
    private String descricao;

    @ManyToOne
    @JoinColumn(name = "owner_id", nullable = false)
    private Usuario owner;

    @OneToMany(mappedBy = "condominio", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private Set<Bloco> bloco = new HashSet<>();

    @OneToMany(mappedBy = "condominio", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private Set<Espaco> espacos = new HashSet<>();

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "condominio_administradores",
            joinColumns = @JoinColumn(name = "condominio_id"),
            inverseJoinColumns = @JoinColumn(name = "administrador_id")
    )
    private Set<Usuario> administradores = new HashSet<>();

    public Condominio() {
    }

    public Condominio(String nome, String endereco, String descricao, Usuario owner) {
        this.nome = nome;
        this.endereco = endereco;
        this.descricao = descricao;
        this.owner = owner;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEndereco() {
        return endereco;
    }

    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Usuario getOwner() {
        return owner;
    }

    public void setOwner(Usuario owner) {
        this.owner = owner;
    }

    public Set<Bloco> getBloco() {
        return bloco;
    }

    public void setBloco(Set<Bloco> bloco) {
        this.bloco = bloco;
    }

    public Set<Espaco> getEspacos() {
        return espacos;
    }

    public void setEspacos(Set<Espaco> espacos) {
        this.espacos = espacos;
    }

    public Set<Usuario> getAdministradores() {
        return administradores;
    }

    public void setAdministradores(Set<Usuario> administradores) {
        this.administradores = administradores;
    }
}
