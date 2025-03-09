package com.example.demo.enums;

public enum StatusEncomenda {
    A_RETIRAR("A retirar"),  // Status quando a encomenda ainda precisa ser retirada
    RETIRADO("Retirado");    // Status quando a encomenda já foi retirada

    private final String descricao;

    StatusEncomenda(String descricao) {
        this.descricao = descricao;
    }

    public String getDescricao() {
        return descricao;
    }
}
