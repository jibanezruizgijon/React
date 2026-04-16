package com.gestionbar.backend.controllers;

import com.gestionbar.backend.models.*;
import com.gestionbar.backend.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/mesas/{mesaId}/cuenta")
public class CuentaController {

    @Autowired
    private MesaRepository mesaRepository;

    @Autowired
    private CuentaRepository cuentaRepository;

    @Autowired
    private CuentaProductoRepository cuentaProductoRepository;

    @Autowired
    private ProductoRepository productoRepository;

    @GetMapping
    public ResponseEntity<List<Map<String, Object>>> obtenerCuenta(@PathVariable Long mesaId) {
        Optional<Mesa> optMesa = mesaRepository.findById(mesaId);
        if (optMesa.isEmpty()) return ResponseEntity.notFound().build();

        Optional<Cuenta> optCuenta = cuentaRepository.findByMesaAndEstado(optMesa.get(), "abierta");
        if (optCuenta.isEmpty()) {
            return ResponseEntity.ok(Collections.emptyList());
        }

        List<CuentaProducto> lineas = cuentaProductoRepository.findByCuenta(optCuenta.get());
        List<Map<String, Object>> response = mapLineasToFrontend(lineas);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/productos")
    public ResponseEntity<ApiResponse> guardarPedido(@PathVariable Long mesaId, @RequestBody Map<String, Object> payload) {
        Optional<Mesa> optMesa = mesaRepository.findById(mesaId);
        if (optMesa.isEmpty()) return ResponseEntity.notFound().build();

        Mesa mesa = optMesa.get();
        if (mesa.getEstado().equals("libre")) {
            mesa.setEstado("ocupada");
            mesaRepository.save(mesa);
        }

        Cuenta cuenta = cuentaRepository.findByMesaAndEstado(mesa, "abierta").orElseGet(() -> {
            Cuenta c = new Cuenta();
            c.setMesa(mesa);
            c.setEstado("abierta");
            return cuentaRepository.save(c);
        });

        // Parse frontend payload { id: .., cantidad: .. }
        Map<String, Object> prodData = (Map<String, Object>) payload.get("producto");
        Integer productoIdInt = (Integer) (prodData != null ? prodData.get("id") : payload.get("id"));
        if(productoIdInt == null) return ResponseEntity.badRequest().build();
        
        Long productoId = productoIdInt.longValue();
        Integer cantidad = (Integer) (payload.get("cantidad") != null ? payload.get("cantidad") : 1);

        Optional<Producto> optProd = productoRepository.findById(productoId);
        if (optProd.isPresent()) {
            Producto prod = optProd.get();
            // Buscar si ya existe la linea
            List<CuentaProducto> lineas = cuentaProductoRepository.findByCuenta(cuenta);
            Optional<CuentaProducto> lineaExistente = lineas.stream()
                .filter(cp -> cp.getProducto().getId().equals(prod.getId())).findFirst();

            if (lineaExistente.isPresent()) {
                CuentaProducto cp = lineaExistente.get();
                cp.setCantidad(cp.getCantidad() + cantidad);
                cuentaProductoRepository.save(cp);
            } else {
                CuentaProducto cp = new CuentaProducto();
                cp.setCuenta(cuenta);
                cp.setProducto(prod);
                cp.setCantidad(cantidad);
                cuentaProductoRepository.save(cp);
            }
        }

        List<Map<String, Object>> actualizadas = mapLineasToFrontend(cuentaProductoRepository.findByCuenta(cuenta));
        return ResponseEntity.ok(new ApiResponse(true, actualizadas));
    }

    @PutMapping("/productos/{productoIdCuenta}")
    public ResponseEntity<ApiResponse> actualizarCantidadProducto(@PathVariable Long mesaId, @PathVariable Long productoIdCuenta, @RequestBody Map<String, Integer> payload) {
        Integer delta = payload.get("delta");
        
        Optional<CuentaProducto> optCp = cuentaProductoRepository.findById(productoIdCuenta);
        if (optCp.isPresent()) {
            CuentaProducto cp = optCp.get();
            Cuenta cuenta = cp.getCuenta();
            if(!cuenta.getMesa().getId().equals(mesaId)) return ResponseEntity.badRequest().build();

            int nuevaCantidad = cp.getCantidad() + delta;
            if (nuevaCantidad <= 0) {
                cuentaProductoRepository.delete(cp);
            } else {
                cp.setCantidad(nuevaCantidad);
                cuentaProductoRepository.save(cp);
            }
            List<Map<String, Object>> actualizadas = mapLineasToFrontend(cuentaProductoRepository.findByCuenta(cuenta));
            return ResponseEntity.ok(new ApiResponse(true, actualizadas));
        }

        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/productos/{productoIdCuenta}")
    public ResponseEntity<ApiResponse> eliminarProductoCuenta(@PathVariable Long mesaId, @PathVariable Long productoIdCuenta) {
         Optional<CuentaProducto> optCp = cuentaProductoRepository.findById(productoIdCuenta);
         if (optCp.isPresent()) {
             Cuenta cuenta = optCp.get().getCuenta();
             cuentaProductoRepository.delete(optCp.get());
             List<Map<String, Object>> actualizadas = mapLineasToFrontend(cuentaProductoRepository.findByCuenta(cuenta));
             return ResponseEntity.ok(new ApiResponse(true, actualizadas));
         }
         return ResponseEntity.notFound().build();
    }

    @PostMapping("/cerrar")
    public ResponseEntity<ApiResponse> cerrarCuenta(@PathVariable Long mesaId) {
        Optional<Mesa> optMesa = mesaRepository.findById(mesaId);
        if (optMesa.isEmpty()) return ResponseEntity.notFound().build();

        Mesa mesa = optMesa.get();
        mesa.setEstado("libre");
        mesaRepository.save(mesa);

        Optional<Cuenta> optCuenta = cuentaRepository.findByMesaAndEstado(mesa, "abierta");
        if (optCuenta.isPresent()) {
            Cuenta c = optCuenta.get();
            c.setEstado("cerrada");
            cuentaRepository.save(c);
        }

        return ResponseEntity.ok(new ApiResponse(true, "Cuenta cerrada exitosamente"));
    }

    private List<Map<String, Object>> mapLineasToFrontend(List<CuentaProducto> lineas) {
        return lineas.stream().map(cp -> {
            Map<String, Object> m = new HashMap<>();
            m.put("id", cp.getId()); // ID de la linea
            m.put("id_producto", cp.getProducto().getId());
            m.put("nombre", cp.getProducto().getNombre());
            m.put("precio", cp.getProducto().getPrecio());
            m.put("cantidad", cp.getCantidad());
            return m;
        }).collect(Collectors.toList());
    }
}
