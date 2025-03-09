package com.example.demo.entity;

import com.example.demo.enums.StatusEncomenda;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Entity
public class Encomenda {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String outroMorador;

    @NotNull(message = "A data de chegada é obrigatória.")
    private LocalDateTime dataChegada;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @Column(name = "status", nullable = false)
    private StatusEncomenda status; // Exemplos de valores: "disponível", "retirada"

    public Encomenda() {
    }

    public Encomenda(String outroMorador, LocalDateTime dataChegada, Usuario usuario, StatusEncomenda status) {
        this.outroMorador = outroMorador;
        this.dataChegada = dataChegada;
        this.usuario = usuario;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getOutroMorador() {
        return outroMorador;
    }

    public void setOutroMorador(String outroMorador) {
        this.outroMorador = outroMorador;
    }

    public LocalDateTime getDataChegada() {
        return dataChegada;
    }

    public void setDataChegada(LocalDateTime dataChegada) {
        this.dataChegada = dataChegada;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public StatusEncomenda getStatus() {
        return status;
    }

    public void setStatus(StatusEncomenda status) {
        this.status = status;
    }
}
