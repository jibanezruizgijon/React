package com.gestionbar.backend.repositories;

import com.gestionbar.backend.models.Personal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.List;

@Repository
public interface PersonalRepository extends JpaRepository<Personal, Long> {
    Optional<Personal> findByPinAndEstado(String pin, Integer estado);
    List<Personal> findAllByEstado(Integer estado);
}
