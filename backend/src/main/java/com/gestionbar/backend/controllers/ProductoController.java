package com.gestionbar.backend.controllers;

import com.gestionbar.backend.models.Producto;
import com.gestionbar.backend.repositories.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api")
public class ProductoController {

    @Autowired
    private ProductoRepository productoRepository;

    @GetMapping("/productos")
    public List<Map<String, Object>> obtenerProductos() {
        List<Producto> productos = productoRepository.findAll();
        // Mapear con el nombre de la categoria para que el front lo procese bien
        return productos.stream().map(p -> {
            Map<String, Object> map = new HashMap<>();
            map.put("id", p.getId());
            map.put("nombre", p.getNombre());
            map.put("precio", p.getPrecio());
            map.put("stock", p.getStock());
            if (p.getCategoria() != null) {
                map.put("id_categoria", p.getCategoria().getId());
                map.put("categoria", p.getCategoria().getNombre());
            }
            return map;
        }).collect(Collectors.toList());
    }
}
