package com.example.backend;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/api/employees")
@CrossOrigin(origins = "http://localhost:5173")
public class EmployeeController {

    // Repositorio para los datos de los empleados
    @Autowired 
    private EmployeeRepository empleadoRepositorio;

    // Ruta para obtener todos los empleados
    @GetMapping
    public List<Employee> findAll() {
        return empleadoRepositorio.findAll();
    }

    // Ruta para eliminar un empleado por su ID
    @DeleteMapping("/{id}")
    public String eliminarEmpleado(@PathVariable Long id) {
        empleadoRepositorio.deleteById(id);
        return "Empleado eliminado correctamente";
    };
}