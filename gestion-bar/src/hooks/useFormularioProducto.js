import { useState, useCallback } from 'react';

export const useFormularioProducto = (productoInicial = null) => {
  const [formData, setFormData] = useState({
    nombre: productoInicial?.nombre || '',
    categoria: productoInicial?.categoria || '',
    precio: productoInicial?.precio || '',
    stock: productoInicial?.stock || '',
    alergenos: productoInicial?.alergenos || []
  });
  const [errores, setErrores] = useState({});
  const [touched, setTouched] = useState({});

  const resetForm = useCallback((producto) => {
    if (producto) {
      setFormData({
        nombre: producto.nombre || '',
        categoria: producto.categoria || '',
        precio: producto.precio || '',
        stock: producto.stock || '',
        alergenos: producto.alergenos || []
      });
    } else {
      setFormData({
        nombre: '',
        categoria: '',
        precio: '',
        stock: '',
        alergenos: []
      });
    }
    setErrores({});
    setTouched({});
  }, []);

  const setAlergenos = useCallback((nuevosAlergenos) => {
    setFormData(prev => ({ ...prev, alergenos: nuevosAlergenos }));
  }, []);

  const validarCampo = (name, value) => {
    let error = null;
    const valString = String(value);

    if (name === 'nombre') {
      if (valString.trim() === '') error = 'El nombre es obligatorio';
      else if (valString.length > 100) error = 'El nombre no puede superar los 100 caracteres';
    } else if (name === 'categoria' && valString.trim() === '') {
      error = 'La categoría es obligatoria';
    } else if (name === 'precio') {
      if (valString === '') error = 'El precio es obligatorio';
      else if (parseFloat(valString) <= 0) error = 'El precio debe ser mayor que cero';
      else if (parseFloat(valString) > 9999.99) error = 'El precio no puede superar 9.999,99 €';
    } else if (name === 'stock') {
      if (valString === '') error = 'El stock es obligatorio';
      else if (parseInt(valString, 10) < 0) error = 'El stock no puede ser negativo';
      else if (parseInt(valString, 10) > 9999) error = 'El stock no puede superar 9.999 unidades';
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Marcar como tocado
    setTouched(prev => ({ ...prev, [name]: true }));
    
    // Validar con cada cambio de letra
    const error = validarCampo(name, value);
    setErrores(prev => ({
      ...prev,
      [name]: error
    }));

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validarFormulario = () => {
    const nuevosErrores = {};
    const nombresCampos = ['nombre', 'categoria', 'precio', 'stock'];
    
    nombresCampos.forEach(campo => {
      const error = validarCampo(campo, formData[campo]);
      if (error) nuevosErrores[campo] = error;
    });
    
    setErrores(nuevosErrores);
    setTouched({
      nombre: true, categoria: true, precio: true, stock: true
    });
    
    return Object.keys(nuevosErrores).length === 0;
  };

  return {
    formData,
    errores,
    touched,
    handleChange,
    validarFormulario,
    resetForm,
    setAlergenos
  };
};
