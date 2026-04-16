package com.gestionbar.backend.repositories;

import com.gestionbar.backend.models.Cuenta;
import com.gestionbar.backend.models.Mesa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CuentaRepository extends JpaRepository<Cuenta, Long> {
    Optional<Cuenta> findByMesaAndEstado(Mesa mesa, String estado);
}
