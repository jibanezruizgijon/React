package com.gestionbar.backend.models;

import lombok.Data;

@Data
public class ApiResponse {
    private boolean exito;
    private String mensaje;
    private Object data;

    public ApiResponse(boolean exito) {
        this.exito = exito;
    }

    public ApiResponse(boolean exito, String mensaje) {
        this.exito = exito;
        this.mensaje = mensaje;
    }

    public ApiResponse(boolean exito, Object data) {
        this.exito = exito;
        this.data = data;
    }
}
