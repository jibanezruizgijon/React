package com.gestionbar.backend.repositories;

import com.gestionbar.backend.models.Personal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PersonalRepository extends JpaRepository<Personal, Long> {
    Optional<Personal> findByPinAndEstado(String pin, Integer estado);
}
