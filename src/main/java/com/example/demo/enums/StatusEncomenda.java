package com.example.demo.enums;

public enum StatusEncomenda {
    A_RETIRAR("A retirar"),
    RETIRADO("Retirado");

    private final String descricao;

    StatusEncomenda(String descricao) {
        this.descricao = descricao;
    }

    public String getDescricao() {
        return descricao;
    }
}
