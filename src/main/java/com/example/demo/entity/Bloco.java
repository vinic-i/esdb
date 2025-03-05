package com.example.demo.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;

import java.util.HashSet;
import java.util.Set;

@Entity
public class Bloco {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotEmpty(message = "O código do bloco é obrigatório.")
    private String code;

    @OneToMany(mappedBy = "bloco", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference // Serializa a coleção de residências
    private Set<Residencia> residencias = new HashSet<>();


    public Bloco() {
    }

    public Bloco(String code) {
        this.code = code;
    }

    @ManyToOne
    @JoinColumn(name = "condominio", nullable = false)
    @JsonBackReference // Indica que este é o lado inverso da referência
    private Condominio condominio;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Condominio getCondominio() {
        return condominio;
    }

    public void setCondominio(Condominio condominio) {
        this.condominio = condominio;
    }

    public String getNome() {
        return code;
    }

    public void setNome(String code) {
        this.code = code;
    }

    public Set<Residencia> getResidencias() {
        return residencias;
    }

    public void setResidencias(Set<Residencia> residencias) {
        this.residencias = residencias;
    }
}
