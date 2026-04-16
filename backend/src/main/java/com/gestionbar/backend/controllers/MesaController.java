package com.gestionbar.backend.controllers;

import com.gestionbar.backend.models.Mesa;
import com.gestionbar.backend.repositories.MesaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class MesaController {

    @Autowired
    private MesaRepository mesaRepository;

    @GetMapping("/mesas")
    public List<Mesa> obtenerMesas() {
        return mesaRepository.findAll();
    }

    @PutMapping("/mesas/{id}/estado")
    public ResponseEntity<Map<String, Boolean>> actualizarEstadoMesa(@PathVariable Long id, @RequestBody Map<String, String> body) {
        String estado = body.get("estado");
        Optional<Mesa> opt = mesaRepository.findById(id);
        
        if (opt.isPresent()) {
            Mesa mesa = opt.get();
            mesa.setEstado(estado);
            mesaRepository.save(mesa);
            
            Map<String, Boolean> res = new HashMap<>();
            res.put("exito", true);
            return ResponseEntity.ok(res);
        }
        return ResponseEntity.notFound().build();
    }
}
