package com.gestionbar.backend.controllers;

import com.gestionbar.backend.models.Personal;
import com.gestionbar.backend.repositories.PersonalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class PersonalController {

    @Autowired
    private PersonalRepository personalRepository;

    @GetMapping("/personal")
    public List<Personal> obtenerPersonal() {
        return personalRepository.findAll();
    }

    @PostMapping("/personal")
    public ResponseEntity<Personal> agregarPersonal(@RequestBody Personal personal) {
        personal.setEstado(1);
        Personal saved = personalRepository.save(personal);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @PutMapping("/personal/{id}")
    public ResponseEntity<Map<String, Boolean>> actualizarPersonal(@PathVariable Long id, @RequestBody Personal personalDetalles) {
        Optional<Personal> opt = personalRepository.findById(id);
        if (opt.isPresent()) {
            Personal personal = opt.get();
            personal.setNombre(personalDetalles.getNombre());
            personal.setTelefono(personalDetalles.getTelefono());
            personal.setCorreo(personalDetalles.getCorreo());
            personal.setRol(personalDetalles.getRol());
            personal.setEstado(personalDetalles.getEstado());
            personal.setPin(personalDetalles.getPin());
            personalRepository.save(personal);
            
            Map<String, Boolean> res = new HashMap<>();
            res.put("exito", true);
            return ResponseEntity.ok(res);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/personal/{id}")
    public ResponseEntity<Map<String, Boolean>> eliminarPersonal(@PathVariable Long id) {
        personalRepository.deleteById(id);
        Map<String, Boolean> res = new HashMap<>();
        res.put("exito", true);
        return ResponseEntity.ok(res);
    }

    @PostMapping("/auth/validar")
    public ResponseEntity<?> validarAcceso(@RequestBody Map<String, String> body) {
        String pin = body.get("pin");
        Optional<Personal> opt = personalRepository.findByPinAndEstado(pin, 1);
        
        if (opt.isPresent()) {
            Personal usuario = opt.get();
            Map<String, Object> data = new HashMap<>();
            data.put("id", usuario.getId());
            data.put("nombre", usuario.getNombre());
            data.put("rol", usuario.getRol());
            data.put("estado", usuario.getEstado());
            return ResponseEntity.ok(data);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Código incorrecto o usuario inactivo"));
        }
    }
}
