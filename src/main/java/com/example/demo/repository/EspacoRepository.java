package com.example.demo.repository;

import com.example.demo.entity.Espaco;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface EspacoRepository extends JpaRepository<Espaco, Long> {
    List<Espaco> findByCondominioId(Long condominioId);

    @Query("SELECT e, r.usuario AS usuarioReserva " +
            "FROM Espaco e LEFT JOIN Reserva r ON r.espaco.id = e.id AND r.dataReserva = :dataReserva " +
            "WHERE e.condominio.id = :idCondominio")
    List<Object[]> findEspacosWithReservaInfo(@Param("idCondominio") Long idCondominio,
                                              @Param("dataReserva") LocalDateTime dataReserva);
}
