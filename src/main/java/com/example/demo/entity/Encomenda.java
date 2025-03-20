package com.example.demo.entity;

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

    private String blocoInfo;

    @NotNull(message = "A data de chegada é obrigatória.")
    private LocalDateTime dataChegada;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuarioDestinatario;

    @Column(name = "status", nullable = false)
    private String status;

    @Column(name = "nome_retirada")
    private String nomeRetirada;

    @Column(name = "documento_retirada")
    private String documentoRetirada;

    @ManyToOne
    @JoinColumn(name = "residencia_id")
    @JsonManagedReference(value = "residencia-encomenda")
    private Residencia residencia;

    public Encomenda() {
    }

    public Encomenda(String outroMorador,
                     LocalDateTime dataChegada,
                     Usuario usuarioDestinatario,
                     String status,
                     String blocoInfo,
                     String nomeRetirada,
                     String documentoRetirada) {
        this.outroMorador = outroMorador;
        this.dataChegada = dataChegada;
        this.usuarioDestinatario = usuarioDestinatario;
        this.status = status;
        this.blocoInfo = blocoInfo;
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


    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getBlocoInfo() {
        return blocoInfo;
    }

    public void setBlocoInfo(String blocoInfo) {
        this.blocoInfo = blocoInfo;
    }

    public Residencia getResidencia() {
        return residencia;
    }

    public void setResidencia(Residencia residencia) {
        this.residencia = residencia;
    }

    public String getNomeRetirada() {
        return nomeRetirada;
    }

    public void setNomeRetirada(String nomeRetirada) {
        this.nomeRetirada = nomeRetirada;
    }

    public String getDocumentoRetirada() {
        return documentoRetirada;
    }

    public void setDocumentoRetirada(String documentoRetirada) {
        this.documentoRetirada = documentoRetirada;
    }
}
