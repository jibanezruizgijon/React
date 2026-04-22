package com.gestionbar.backend.controllers;

import com.gestionbar.backend.models.Personal;
import com.gestionbar.backend.repositories.PersonalRepository;
import com.gestionbar.backend.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
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
    
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @GetMapping("/personal")
    public List<Personal> obtenerPersonal() {
        return personalRepository.findAll();
    }

    @PostMapping("/personal")
    public ResponseEntity<Personal> agregarPersonal(@RequestBody Personal personal) {
        personal.setEstado(1);
        if (personal.getPin() != null && !personal.getPin().isEmpty()) {
            personal.setPin(passwordEncoder.encode(personal.getPin()));
        }
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
            
            if (personalDetalles.getPin() != null && !personalDetalles.getPin().isEmpty()) {
                // Solo reencriptar si el PIN que llega no parece un hash de BCrypt
                // (por ejemplo si el frontend envía el PIN plano al actualizar)
                if (!personalDetalles.getPin().startsWith("$2a$")) {
                    personal.setPin(passwordEncoder.encode(personalDetalles.getPin()));
                }
            } else {
                // Si viene vacío o nulo, podríamos mantener el PIN anterior
            }

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
        
        try {
            // Utilizamos el PIN como principal (username) y como credencial
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(pin, pin)
            );
            
            // Si la autenticación es exitosa, el principal es nuestro objeto Personal
            Personal usuario = (Personal) authentication.getPrincipal();
            
            Map<String, Object> usuarioData = new HashMap<>();
            usuarioData.put("id", usuario.getId());
            usuarioData.put("nombre", usuario.getNombre());
            usuarioData.put("rol", usuario.getRol());
            usuarioData.put("estado", usuario.getEstado());

            Map<String, Object> extraClaims = new HashMap<>();
            extraClaims.put("rol", usuario.getRol());

            String token = jwtUtil.generateToken(String.valueOf(usuario.getId()), extraClaims);

            Map<String, Object> responseData = new HashMap<>();
            responseData.put("token", token);
            responseData.put("usuario", usuarioData);

            return ResponseEntity.ok(responseData);
            
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Código incorrecto o usuario inactivo"));
        }
    }
}
