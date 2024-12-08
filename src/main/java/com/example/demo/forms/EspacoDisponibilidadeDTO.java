package com.example.demo.forms;

import com.example.demo.entity.Espaco;
import com.example.demo.entity.Usuario;

public class EspacoDisponibilidadeDTO {
    private Long id; // Identificador do espaço
    private String nome; // Nome do espaço
    private String descricao; // Descrição do espaço
    private int capacidade; // Capacidade do espaço
    private boolean disponibilidade; // Disponibilidade do espaço (se está disponível para reserva)
    private boolean temReserva; // Se o espaço já tem uma reserva para a data solicitada
    private String usuarioReserva; // Nome do usuário que fez a reserva (se houver reserva)

    // Getters e setters

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