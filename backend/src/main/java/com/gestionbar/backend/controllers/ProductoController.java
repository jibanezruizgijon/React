package com.gestionbar.backend.controllers;

import com.gestionbar.backend.models.Producto;
import com.gestionbar.backend.models.Categoria;
import com.gestionbar.backend.repositories.ProductoRepository;
import com.gestionbar.backend.repositories.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api")
public class ProductoController {

    @Autowired
    private ProductoRepository productoRepository;

    @Autowired
    private CategoriaRepository categoriaRepository;

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

    @PostMapping("/productos")
    public Map<String, Object> crearProducto(@RequestBody Map<String, Object> payload) {
        return guardarProducto(new Producto(), payload);
    }

    @PutMapping("/productos/{id}")
    public Map<String, Object> actualizarProducto(@PathVariable Long id, @RequestBody Map<String, Object> payload) {
        Producto producto = productoRepository.findById(id).orElseThrow(() -> new RuntimeException("Producto no encontrado"));
        return guardarProducto(producto, payload);
    }

    @DeleteMapping("/productos/{id}")
    public Map<String, String> eliminarProducto(@PathVariable Long id) {
        productoRepository.deleteById(id);
        return Map.of("mensaje", "Producto eliminado");
    }

    private Map<String, Object> guardarProducto(Producto p, Map<String, Object> payload) {
        if (payload.containsKey("nombre")) p.setNombre((String) payload.get("nombre"));
        if (payload.containsKey("precio")) p.setPrecio(Double.valueOf(payload.get("precio").toString()));
        if (payload.containsKey("stock")) p.setStock(Integer.valueOf(payload.get("stock").toString()));
        
        if (payload.containsKey("categoria")) {
            String nombreCategoria = (String) payload.get("categoria");
            Categoria cat = categoriaRepository.findByNombre(nombreCategoria).orElseGet(() -> {
                Categoria nueva = new Categoria();
                nueva.setNombre(nombreCategoria);
                return categoriaRepository.save(nueva);
            });
            p.setCategoria(cat);
        }
        
        Producto saved = productoRepository.save(p);
        
        Map<String, Object> map = new HashMap<>();
        map.put("id", saved.getId());
        map.put("nombre", saved.getNombre());
        map.put("precio", saved.getPrecio());
        map.put("stock", saved.getStock());
        if (saved.getCategoria() != null) {
            map.put("id_categoria", saved.getCategoria().getId());
            map.put("categoria", saved.getCategoria().getNombre());
        }
        return map;
    }
}
