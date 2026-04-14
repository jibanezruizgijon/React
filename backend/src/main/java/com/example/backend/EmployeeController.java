package com.example.backend;

import java.util.List;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/employes")
public class EmployeeController {

    public List<Employee> findAll(){
        return List.of(
            new Employee(1L, "Aitor", "Administrador"),
            new Employee(2L, "Elena", "Camarero"),
            new Employee(3L, "Iker", "Camarero")
        );
    };
}
