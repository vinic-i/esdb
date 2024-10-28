package com.example.demo.controller;

import com.example.demo.entity.Condominio;
import com.example.demo.entity.Espaco;
import com.example.demo.forms.CondominioDTO;
import com.example.demo.service.CondominioService;
import jakarta.validation.Valid;
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
    public ResponseEntity<?> createCondominio(@Valid @RequestBody CondominioDTO condominioDTO) {
        try {
            Condominio newCondominio = condominioService.createCondominio(condominioDTO);
            return ResponseEntity.ok(newCondominio);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
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

    //Lista os espaços de um condomínio
    @GetMapping("/{condominioId}/espacos")
    public ResponseEntity<List<Espaco>> getEspacosByCondominioId(@PathVariable Long condominioId) {
        List<Espaco> espacos = condominioService.getEspacosByCondominioId(condominioId);
        return ResponseEntity.ok(espacos);
    }

    // Atualizar um condomínio
    @PutMapping("/{id}/{idUser}")
    public ResponseEntity<?> updateCondominio(@PathVariable Long id, @RequestBody CondominioDTO updatedCondominio, @PathVariable Long idUser) {
        try {
            Condominio newCondominio = condominioService.updateCondominio(id, updatedCondominio, idUser);
            return ResponseEntity.ok(newCondominio);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Deletar um condomínio
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCondominio(@PathVariable Long id) {
        condominioService.deleteCondominio(id);
        return ResponseEntity.noContent().build();
    }
}
