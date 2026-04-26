package com.gestionbar.backend.controllers;

import com.gestionbar.backend.models.Categoria;
import com.gestionbar.backend.repositories.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class CategoriaController {

    @Autowired
    private CategoriaRepository categoriaRepository;

    @GetMapping("/categorias")
    public List<Categoria> obtenerCategorias() {
        return categoriaRepository.findAll();
    }
}
