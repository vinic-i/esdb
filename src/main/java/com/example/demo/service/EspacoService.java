package com.example.demo.service;

import com.example.demo.entity.Condominio;
import com.example.demo.entity.Espaco;
import com.example.demo.entity.Reserva;
import com.example.demo.entity.Usuario;
import com.example.demo.forms.EspacoDTO;
import com.example.demo.forms.EspacoDisponibilidadeDTO;
import com.example.demo.repository.CondominioRepository;
import com.example.demo.repository.EspacoRepository;
import com.example.demo.repository.ReservaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EspacoService {

    private final EspacoRepository espacoRepository;
    private final CondominioRepository condominioRepository;
    private final ReservaRepository reservaRepository;

    @Autowired
    public EspacoService(EspacoRepository espacoRepository, CondominioRepository condominioRepository, ReservaRepository reservaRepository) {
        this.espacoRepository = espacoRepository;
        this.condominioRepository = condominioRepository;
        this.reservaRepository = reservaRepository;
    }

    public List<EspacoDisponibilidadeDTO> listarEspacosComReserva(Long condominioId, LocalDateTime dataReserva) {
        List<Espaco> espacos = espacoRepository.findByCondominioId(condominioId);  // Lista de espaços do condomínio
        List<EspacoDisponibilidadeDTO> resultado = new ArrayList<>();

        for (Espaco espaco : espacos) {
            List<Reserva> reservas = reservaRepository.findByEspacoIdAndDataReserva(espaco.getId(), dataReserva);
            boolean temReserva = !reservas.isEmpty();  // Se houver qualquer reserva, o espaço tem reserva
            String usuarioReserva = temReserva ? reservas.get(0).getUsuario().getNome() : null;  // Nome do usuário da primeira reserva

            EspacoDisponibilidadeDTO dto = new EspacoDisponibilidadeDTO();
            dto.setId(espaco.getId());
            dto.setNome(espaco.getNome());
            dto.setDescricao(espaco.getDescricao());
            dto.setCapacidade(espaco.getCapacidade());
            dto.setDisponibilidade(temReserva ? false : true);  // Se tiver reserva, não está disponível
            dto.setTemReserva(temReserva);
            dto.setUsuarioReserva(usuarioReserva);

            resultado.add(dto);
        }

        return resultado;
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
