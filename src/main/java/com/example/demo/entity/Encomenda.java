package com.example.demo.entity;

import com.example.demo.enums.StatusEncomenda;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
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
    private Usuario usuarioDestinatario;

    @Column(name = "status", nullable = false)
    private StatusEncomenda status;

    @Column(name = "nome_retirada")
    private String nomeRetirada;

    @Column(name = "documento_retirada")
    private String documentoRetirada;

    @ManyToOne
    @JoinColumn(name = "residencia_id")
    @JsonManagedReference
    private Residencia residencia;

    public Encomenda() {
    }

    public Encomenda(String outroMorador,
                     LocalDateTime dataChegada,
                     Usuario usuarioDestinatario,
                     StatusEncomenda status,
                     String nomeRetirada,
                     String documentoRetirada) {
        this.outroMorador = outroMorador;
        this.dataChegada = dataChegada;
        this.usuarioDestinatario = usuarioDestinatario;
        this.status = status;
        this.nomeRetirada = nomeRetirada;
        this.documentoRetirada = documentoRetirada;
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

    public Usuario getUsuarioDestinatario() {
        return usuarioDestinatario;
    }

    public void setUsuarioDestinatario(Usuario usuarioDestinatario) {
        this.usuarioDestinatario = usuarioDestinatario;
    }


    public StatusEncomenda getStatus() {
        return status;
    }

    public void setStatus(StatusEncomenda status) {
        this.status = status;
    }

    public Residencia getResidencia() {
        return residencia;
    }

    public void setResidencia(Residencia residencia) {
        this.residencia = residencia;
    }
}
