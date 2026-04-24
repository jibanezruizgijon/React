package com.gestionbar.backend.repositories;

import com.gestionbar.backend.models.Alergeno;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AlergenoRepository extends JpaRepository<Alergeno, Long> {
    List<Alergeno> findByNombreContainingIgnoreCase(String nombre);
}
