package com.gestionbar.backend.repositories;

import com.gestionbar.backend.models.Cuenta;
import com.gestionbar.backend.models.CuentaProducto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CuentaProductoRepository extends JpaRepository<CuentaProducto, Long> {
    List<CuentaProducto> findByCuenta(Cuenta cuenta);
}
