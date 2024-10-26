package com.example.demo.controller;

import com.example.demo.entity.Encomenda;
import com.example.demo.service.EncomendaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/encomendas")
public class EncomendaController {

    private final EncomendaService encomendaService;

    @Autowired
    public EncomendaController(EncomendaService encomendaService) {
        this.encomendaService = encomendaService;
    }

    @GetMapping
    public List<Encomenda> listarTodas() {
        return encomendaService.listarTodas();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Encomenda> encontrarPorId(@PathVariable Long id) {
        Optional<Encomenda> encomenda = encomendaService.encontrarPorId(id);
        return encomenda.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Encomenda salvar(@RequestBody Encomenda encomenda) {
        return encomendaService.salvar(encomenda);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        encomendaService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
