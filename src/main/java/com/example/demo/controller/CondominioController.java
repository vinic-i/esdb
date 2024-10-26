package com.example.demo.controller;

import com.example.demo.entity.Condominio;
import com.example.demo.service.CondominioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/condominios")
public class CondominioController {

    @Autowired
    private CondominioService condominioService;

    // Criar um novo condomínio
    @PostMapping
    public ResponseEntity<Condominio> createCondominio(@RequestBody Condominio condominio) {
        Condominio newCondominio = condominioService.createCondominio(condominio);
        return ResponseEntity.ok(newCondominio);
    }

    // Listar todos os condomínios
    @GetMapping
    public ResponseEntity<List<Condominio>> getAllCondominios() {
        List<Condominio> condominios = condominioService.getAllCondominios();
        return ResponseEntity.ok(condominios);
    }

    // Obter um condomínio por ID
    @GetMapping("/{id}")
    public ResponseEntity<Condominio> getCondominioById(@PathVariable Long id) {
        Optional<Condominio> condominio = condominioService.getCondominioById(id);
        return condominio.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Atualizar um condomínio
    @PutMapping("/{id}")
    public ResponseEntity<Condominio> updateCondominio(@PathVariable Long id, @RequestBody Condominio updatedCondominio) {
        Condominio condominio = condominioService.updateCondominio(id, updatedCondominio);
        return ResponseEntity.ok(condominio);
    }

    // Deletar um condomínio
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCondominio(@PathVariable Long id) {
        condominioService.deleteCondominio(id);
        return ResponseEntity.noContent().build();
    }
}
