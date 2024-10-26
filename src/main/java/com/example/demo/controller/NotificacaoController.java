package com.example.demo.controller;

import com.example.demo.entity.Notificacao;
import com.example.demo.service.NotificacaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/notificacoes")
public class NotificacaoController {

    private final NotificacaoService notificacaoService;

    @Autowired
    public NotificacaoController(NotificacaoService notificacaoService) {
        this.notificacaoService = notificacaoService;
    }

    @GetMapping
    public List<Notificacao> listarTodas() {
        return notificacaoService.listarTodas();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Notificacao> encontrarPorId(@PathVariable Long id) {
        Optional<Notificacao> notificacao = notificacaoService.encontrarPorId(id);
        return notificacao.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Notificacao salvar(@RequestBody Notificacao notificacao) {
        return notificacaoService.salvar(notificacao);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        notificacaoService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
