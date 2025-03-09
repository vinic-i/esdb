package com.example.demo.forms;

import com.example.demo.enums.StatusEncomenda;
import java.time.LocalDate;

public class EncomendaDTO {

    private String outroMorador;
    private LocalDate dataChegada;
    private Long usuarioId;
    private String status;
    private String nomeRetirada;
    private String documentoRetirada;
    private Long residenciaId;


    public String getOutroMorador() {
        return outroMorador;
    }

    public void setOutroMorador(String outroMorador) {
        this.outroMorador = outroMorador;
    }

    public LocalDate getDataChegada() {
        return dataChegada;
    }

    public void setDataChegada(LocalDate dataChegada) {
        this.dataChegada = dataChegada;
    }

    public Long getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Long usuarioId) {
        this.usuarioId = usuarioId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
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

    public Long getResidenciaId() {
        return residenciaId;
    }

    public void setResidenciaId(Long residenciaId) {
        this.residenciaId = residenciaId;
    }
}
