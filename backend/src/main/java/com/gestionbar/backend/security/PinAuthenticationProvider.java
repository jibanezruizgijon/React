package com.gestionbar.backend.security;

import com.gestionbar.backend.models.Personal;
import com.gestionbar.backend.repositories.PersonalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class PinAuthenticationProvider implements AuthenticationProvider {

    @Autowired
    private PersonalRepository personalRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String pinPlano = authentication.getCredentials().toString();

        List<Personal> activos = personalRepository.findAllByEstado(1);

        for (Personal p : activos) {
            if (p.getPin() != null) {
                boolean match = false;
                
                // Comprobación segura con hash BCrypt
                try {
                    if (passwordEncoder.matches(pinPlano, p.getPin())) {
                        match = true;
                    }
                } catch (IllegalArgumentException e) {
                    // Puede lanzar error si no es un hash de BCrypt válido, ignoramos
                }
                
                // Fallback: Si no es un hash válido, comprobamos texto plano para migrar usuarios existentes sin problemas
                if (!match && p.getPin().equals(pinPlano)) {
                    match = true;
                    // Opcionalmente podríamos actualizar la contraseña a encriptada aquí mismo:
                    // p.setPin(passwordEncoder.encode(pinPlano));
                    // personalRepository.save(p);
                }
                
                if (match) {
                    return new UsernamePasswordAuthenticationToken(p, pinPlano, new ArrayList<>());
                }
            }
        }

        throw new BadCredentialsException("Código incorrecto o usuario inactivo");
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return UsernamePasswordAuthenticationToken.class.isAssignableFrom(authentication);
    }
}
