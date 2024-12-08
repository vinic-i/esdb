package com.example.demo.forms;

import java.time.LocalDateTime;

public class ReservaDTO {

    private Long id;
    private LocalDateTime dataReserva;
    private Long usuarioId;  // Apenas o id do usuário
    private Long espacoId;   // Apenas o id do espaço
    private String status;

    public ReservaDTO() {
    }

    public ReservaDTO(Long id, LocalDateTime dataHoraInicio, LocalDateTime dataHoraFim, Long usuarioId, Long espacoId, String status) {
        this.id = id;
        this.dataReserva = dataReserva;
        this.usuarioId = usuarioId;
        this.espacoId = espacoId;
        this.status = status;
    }

    // Getters e setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getDataReserva() {
        return dataReserva;
    }

    public void setDataReserva(LocalDateTime dataReserva) {
        this.dataReserva = dataReserva;
    }

    public Long getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Long usuarioId) {
        this.usuarioId = usuarioId;
    }

    public Long getEspacoId() {
        return espacoId;
    }

    public void setEspacoId(Long espacoId) {
        this.espacoId = espacoId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
