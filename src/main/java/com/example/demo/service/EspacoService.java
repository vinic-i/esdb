package com.example.demo.service;

import com.example.demo.entity.Condominio;
import com.example.demo.entity.Espaco;
import com.example.demo.entity.Usuario;
import com.example.demo.forms.EspacoDTO;
import com.example.demo.repository.CondominioRepository;
import com.example.demo.repository.EspacoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EspacoService {

    private final EspacoRepository espacoRepository;
    private final CondominioRepository condominioRepository;

    @Autowired
    public EspacoService(EspacoRepository espacoRepository, CondominioRepository condominioRepository) {
        this.espacoRepository = espacoRepository;
        this.condominioRepository = condominioRepository;
    }

    public List<Espaco> listarTodos() {
        return espacoRepository.findAll();
    }

    public Optional<Espaco> encontrarPorId(Long id) {
        return espacoRepository.findById(id);
    }

    public Espaco salvar(EspacoDTO espaco) {
        Condominio condominio = condominioRepository.findById(espaco.getCondominioId())
                .orElseThrow(() -> new RuntimeException("Condomínio não encontrado com o id: " + espaco.getCondominioId()));

        Espaco newEspaco = new Espaco();
        newEspaco.setCondominio(condominio);
        newEspaco.setDescricao(espaco.getDescricao());
        newEspaco.setCapacidade(espaco.getCapacidade());
        newEspaco.setNome(espaco.getNome());

        return espacoRepository.save(newEspaco);
    }

    public void deletar(Long id) {
        espacoRepository.deleteById(id);
    }
}
