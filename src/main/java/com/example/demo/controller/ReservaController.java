package com.example.demo.controller;

import com.example.demo.entity.Reserva;
import com.example.demo.forms.ReservaDTO;
import com.example.demo.service.ReservaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/reservas")
public class ReservaController {

    private final ReservaService reservaService;

    @Autowired
    public ReservaController(ReservaService reservaService) {
        this.reservaService = reservaService;
    }

    @GetMapping
    public List<Reserva> listarTodas() {
        return reservaService.listarTodas();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Reserva> encontrarPorId(@PathVariable Long id) {
        Optional<Reserva> reserva = reservaService.encontrarPorId(id);
        return reserva.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Reserva salvar(@RequestBody ReservaDTO reserva) {
        return reservaService.salvar(reserva);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        reservaService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
