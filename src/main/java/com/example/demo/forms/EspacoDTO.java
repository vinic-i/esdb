package com.example.demo.forms;

import jakarta.validation.constraints.NotEmpty;

public class EspacoDTO {
    @NotEmpty(message = "O nome do espaço é obrigatório.")
    private String nome;

    private String descricao;
    private int capacidade;

    private Long condominioId;

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
    public Long getCondominioId() {
        return condominioId;
    }
    public void setCondominioId(Long condominioId) {
        this.condominioId = condominioId;
    }
}
