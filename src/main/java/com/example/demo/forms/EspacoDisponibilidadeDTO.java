package com.example.demo.forms;

public class EspacoDisponibilidadeDTO {
    private Long id;
    private Long idReserva;
    private String nome;
    private String descricao;
    private int capacidade;
    private boolean disponibilidade;
    private boolean temReserva;
    private String usuarioReserva;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    public Long getIdReserva() {
        return idReserva;
    }

    public void setIdReserva(Long idReserva) {
        this.idReserva = idReserva;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public int getCapacidade() {
        return capacidade;
    }

    public void setCapacidade(int capacidade) {
        this.capacidade = capacidade;
    }

    public boolean isDisponibilidade() {
        return disponibilidade;
    }

    public void setDisponibilidade(boolean disponibilidade) {
        this.disponibilidade = disponibilidade;
    }

    public boolean isTemReserva() {
        return temReserva;
    }

    public void setTemReserva(boolean temReserva) {
        this.temReserva = temReserva;
    }

    public String getUsuarioReserva() {
        return usuarioReserva;
    }

    public void setUsuarioReserva(String usuarioReserva) {
        this.usuarioReserva = usuarioReserva;
    }
}