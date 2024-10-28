package com.example.demo.controller;

import com.example.demo.entity.Condominio;
import com.example.demo.entity.Espaco;
import com.example.demo.forms.EspacoDTO;
import com.example.demo.service.EspacoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/espacos")
public class EspacoController {

    private final EspacoService espacoService;

    @Autowired
    public EspacoController(EspacoService espacoService) {
        this.espacoService = espacoService;
    }

    @GetMapping
    public List<Espaco> listarTodos() {
        return espacoService.listarTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Espaco> encontrarPorId(@PathVariable Long id) {
        Optional<Espaco> espaco = espacoService.encontrarPorId(id);
        return espaco.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> salvar(@RequestBody EspacoDTO espacoDTO) {
        try {
            Espaco newEspaco = espacoService.salvar(espacoDTO);
            return ResponseEntity.ok(newEspaco);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        espacoService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
