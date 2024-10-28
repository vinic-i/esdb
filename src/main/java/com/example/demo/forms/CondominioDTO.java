package com.example.demo.forms;

import com.example.demo.entity.Residencia;
import com.example.demo.entity.Usuario;
import jakarta.validation.constraints.NotEmpty;

import java.util.List;
import java.util.Set;

public class CondominioDTO {

    @NotEmpty(message = "O nome do condomínio é obrigatório.")
    private String nome;

    @NotEmpty(message = "O endereço é obrigatório.")
    private String endereco;

    private String bloco;
    private String apartamento;
    private String descricao;
    private Long ownerId;
    private List<Long> residenciaIds;
    private List<Long> administradoreIds;

    // Getters e Setters

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
        this.apartamento = apartamento;
    }
    public String getDescricao() {
        return descricao;
    }
    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }
    public Long getOwnerId() {
        return ownerId;
    }
    public void setOwnerId(Long ownerId) {
        this.ownerId = ownerId;
    }
    public List<Long> getResidenciaIds() {
        return residenciaIds;
    }
    public void setResidenciaIds(List<Long> residenciaIds) {
        this.residenciaIds = residenciaIds;
    }
    public List<Long> getAdministradoreIds() {
        return administradoreIds;
    }
    public void setAdministradoreIds(List<Long> administradoreIds) {
        this.administradoreIds = administradoreIds;
    }
}
