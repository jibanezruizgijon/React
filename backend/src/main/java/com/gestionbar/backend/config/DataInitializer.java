package com.gestionbar.backend.config;

import com.gestionbar.backend.models.Alergeno;
import com.gestionbar.backend.repositories.AlergenoRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;
import java.util.List;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner initAlergenos(AlergenoRepository alergenoRepository) {
        return args -> {
            if (alergenoRepository.count() == 0) {
                List<String> alergenosPorDefecto = Arrays.asList(
                        "Gluten",
                        "Crustáceos",
                        "Huevos",
                        "Pescado",
                        "Cacahuetes",
                        "Soja",
                        "Lácteos",
                        "Frutos de cáscara",
                        "Apio",
                        "Mostaza",
                        "Granos de sésamo",
                        "Dióxido de azufre y sulfitos",
                        "Altramuces",
                        "Moluscos"
                );

                for (String nombre : alergenosPorDefecto) {
                    Alergeno alergeno = new Alergeno();
                    alergeno.setNombre(nombre);
                    alergenoRepository.save(alergeno);
                }
            }
        };
    }
}
