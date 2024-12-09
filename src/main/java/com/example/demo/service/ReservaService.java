package com.example.demo.service;

import com.example.demo.entity.Espaco;
import com.example.demo.entity.Reserva;
import com.example.demo.entity.Usuario;
import com.example.demo.forms.ReservaDTO;
import com.example.demo.repository.EspacoRepository;
import com.example.demo.repository.ReservaRepository;
import com.example.demo.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReservaService {

    private final ReservaRepository reservaRepository;
    private final UsuarioRepository usuarioRepository;
    private final EspacoRepository espacoRepository;

    @Autowired
    public ReservaService(ReservaRepository reservaRepository, UsuarioRepository usuarioRepository, EspacoRepository espacoRepository) {
        this.reservaRepository = reservaRepository;
        this.usuarioRepository = usuarioRepository;
        this.espacoRepository = espacoRepository;
    }

    public List<Reserva> listarTodas() {
        return reservaRepository.findAll();
    }

    public Optional<Reserva> encontrarPorId(Long id) {
        return reservaRepository.findById(id);
    }

    public Reserva salvar(ReservaDTO reservaDTO) {
        Usuario usuario = usuarioRepository.findById(reservaDTO.getUsuarioId()).orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        Espaco espaco = espacoRepository.findById(reservaDTO.getEspacoId()).orElseThrow(() -> new RuntimeException("Espaço não encontrado"));

        Reserva reserva = new Reserva(
                reservaDTO.getDataReserva(),
                usuario,
                espaco,
                reservaDTO.getStatus()
        );

        return reservaRepository.save(reserva);
    }

    public void deletar(Long id) {
        reservaRepository.deleteById(id);
    }
}
