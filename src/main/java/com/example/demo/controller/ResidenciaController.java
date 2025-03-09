package com.example.demo.controller;

import com.example.demo.entity.Residencia;
import com.example.demo.entity.Usuario;
import com.example.demo.service.ResidenciaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/api/residencias")
public class ResidenciaController {

    private final ResidenciaService residenciaService;

    @Autowired
    public ResidenciaController(ResidenciaService residenciaService) {
        this.residenciaService = residenciaService;
    }

    @GetMapping
    public List<Residencia> listarTodas() {
        return residenciaService.listarTodas();
    }

    @GetMapping("/{idResidencia}/usuarios")
    public Set<Usuario> getUsuariosByResidencia(@PathVariable Long idResidencia) {
        return residenciaService.obterUsuariosPorResidencia(idResidencia);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Residencia> encontrarPorId(@PathVariable Long id) {
        Optional<Residencia> residencia = residenciaService.encontrarPorId(id);
        return residencia.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Residencia salvar(@RequestBody Residencia residencia) {
        return residenciaService.salvar(residencia);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        residenciaService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
