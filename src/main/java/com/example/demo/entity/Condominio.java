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

    @Column(name = "bloco")
    private String bloco;

    @Column(name = "apartamento")
    private String apartamento;

    @Column(name = "descricao")
    private String descricao;

    @ManyToOne
    @JoinColumn(name = "owner_id", nullable = false)
    private Usuario owner;

    @OneToMany(mappedBy = "condominio", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Residencia> residencias = new HashSet<>();

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

    public Condominio(String nome, String endereco, String bloco, String apartamento, String descricao, Usuario owner) {
        this.nome = nome;
        this.endereco = endereco;
        this.bloco = bloco;
        this.apartamento = apartamento;
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

    public String getBloco() {
        return bloco;
    }

    public void setBloco(String bloco) {
        this.bloco = bloco;
    }

    public String getApartamento() {
        return apartamento;
    }

    public void setApartamento(String apartamento) {
        this.apartamento = Condominio.this.apartamento;
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

    public Set<Residencia> getResidencias() {
        return residencias;
    }

    public void setResidencias(Set<Residencia> residencias) {
        this.residencias = residencias;
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
