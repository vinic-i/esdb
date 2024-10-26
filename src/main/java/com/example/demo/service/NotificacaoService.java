package com.example.demo.service;

import com.example.demo.entity.Notificacao;
import com.example.demo.repository.NotificacaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NotificacaoService {

    private final NotificacaoRepository notificacaoRepository;

    @Autowired
    public NotificacaoService(NotificacaoRepository notificacaoRepository) {
        this.notificacaoRepository = notificacaoRepository;
    }

    public List<Notificacao> listarTodas() {
        return notificacaoRepository.findAll();
    }

    public Optional<Notificacao> encontrarPorId(Long id) {
        return notificacaoRepository.findById(id);
    }

    public Notificacao salvar(Notificacao notificacao) {
        return notificacaoRepository.save(notificacao);
    }

    public void deletar(Long id) {
        notificacaoRepository.deleteById(id);
    }
}
