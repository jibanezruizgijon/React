package com.gestionbar.backend.controllers;

import com.gestionbar.backend.models.Alergeno;
import com.gestionbar.backend.repositories.AlergenoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/alergenos")
@CrossOrigin(origins = "*")
public class AlergenoController {

    @Autowired
    private AlergenoRepository alergenoRepository;

    @GetMapping
    public List<Alergeno> getAllAlergenos() {
        return alergenoRepository.findAll();
    }

    @GetMapping("/buscar")
    public List<Alergeno> buscarAlergenos(@RequestParam(value = "nombre", defaultValue = "") String nombre) {
        if (nombre == null || nombre.trim().isEmpty()) {
            return alergenoRepository.findAll();
        }
        return alergenoRepository.findByNombreContainingIgnoreCase(nombre);
    }
}
