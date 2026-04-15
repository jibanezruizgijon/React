package com.example.backend;

import jakarta.persistence.*;

@Entity // Indica que esta clase es una tabla de BD
@Table(name = "empleados") // Opcional: define el nombre exacto de la tabla
public class Employee {

    @Id // Marca este campo como la clave primaria
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Autoincremental en MySQL
    private Long id;

    @Column(nullable = false, length = 100) // No puede ser nulo
    private String name;

    @Column(nullable = false)
    private String role;

    // Constructor vacío (Obligatorio para JPA)
    public Employee() {
    }

    // Constructor con parámetros
    public Employee(String name, String role) {
        this.name = name;
        this.role = role;
    }

    // Getters y Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
}