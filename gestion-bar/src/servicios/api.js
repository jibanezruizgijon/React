// api.js
// Servicio simulado basado en el esquema de base de datos
// Tablas simuladas: mesa, Producto, personal, Categoria, alergenos

// --- Datos Simulados ---
const categorias = [
  { id: 1, nombre: 'Bebidas' },
  { id: 2, nombre: 'Entrantes' },
  { id: 3, nombre: 'Platos' },
  { id: 4, nombre: 'Vinos' }
];

const alergenos = [
  { id: 1, nombre: 'Gluten' },
  { id: 2, nombre: 'Lácteos' },
  { id: 3, nombre: 'Frutos Secos' }
];

let baseMesas = [
  { id: 1, nMesa: 1, capacidad: 4, estado: 'libre' },
  { id: 2, nMesa: 2, capacidad: 3, estado: 'ocupada' },
  { id: 3, nMesa: 3, capacidad: 5, estado: 'ocupada' },
  { id: 4, nMesa: 4, capacidad: 2, estado: 'libre' },
  { id: 5, nMesa: 5, capacidad: 3, estado: 'ocupada' },
  { id: 6, nMesa: 6, capacidad: 4, estado: 'reservada' },
];

let baseProductos = [
  { id: 1, nombre: 'Fanta 33cl', precio: 2.50, stock: 70, id_categoria: 1 },
  { id: 2, nombre: 'CocaCola 33cl', precio: 2.50, stock: 83, id_categoria: 1 },
  { id: 3, nombre: 'Berenjena rellena', precio: 10.99, stock: 20, id_categoria: 2 },
  { id: 4, nombre: 'Pasta a la carbonara', precio: 8.99, stock: 15, id_categoria: 3 },
  { id: 5, nombre: 'Brocheta de ciervo', precio: 12.50, stock: 10, id_categoria: 3 },
  { id: 6, nombre: 'Empanadillas de la Abuela', precio: 10.50, stock: 25, id_categoria: 2 },
  { id: 7, nombre: 'Vino Tinto Copa', precio: 6.00, stock: 40, id_categoria: 4 },
];

let basePersonal = [
  { id: 1, nombre: 'Aitor Tilla Pérez', correo: 'aitor@gmail.com', telefono: '600305001', estado: 1, rol: 'Administrador', pin: '1234' },
  { id: 2, nombre: 'Elena Nito Gil', correo: 'elena@gmail.com', telefono: '702642054', estado: 1, rol: 'Camarero', pin: '5678' },
  { id: 3, nombre: 'Paco Meralgo Manzano', correo: 'paco@gmail.com', telefono: '611252745', estado: 1, rol: 'Camarero', pin: '0000' },
  { id: 4, nombre: 'Armando Bronca Segura', correo: 'armando@gmail.com', telefono: '600345722', estado: 0, rol: 'Cocinero', pin: '1111' },
];

let cuentasActivas = {
  // id_mesa : array de { producto, cantidad }
  2: [
    { id: 3, id_producto: 3, nombre: 'Berenjena rellena', precio: 10.99, cantidad: 1 },
    { id: 4, id_producto: 4, nombre: 'Pasta a la carbonara', precio: 8.99, cantidad: 1 }
  ],
  3: [],
  5: []
};

// --- API Methods ---
export const obtenerMesas = async () => {
  return new Promise(resolve => setTimeout(() => resolve([...baseMesas]), 300));
};

export const actualizarEstadoMesa = async (id, estado) => {
  baseMesas = baseMesas.map(m => m.id === id ? { ...m, estado } : m);
  if (estado === 'libre') {
    delete cuentasActivas[id];
  } else if (estado === 'ocupada' && !cuentasActivas[id]) {
    cuentasActivas[id] = [];
  }
  return Promise.resolve({ exito: true });
};

export const obtenerProductos = async () => {
  return new Promise(resolve => {
    // Join manual para incluir nombres de categoría
    const prodConCats = baseProductos.map(p => ({
      ...p,
      categoria: categorias.find(c => c.id === p.id_categoria)?.nombre || 'Sin Categoría'
    }));
    setTimeout(() => resolve(prodConCats), 300);
  });
};

export const obtenerCuentaMesa = async (mesaId) => {
  return new Promise(resolve => setTimeout(() => resolve(cuentasActivas[mesaId] || []), 200));
};

export const guardarPedido = async (mesaId, producto, cantidad = 1) => {
  if (!cuentasActivas[mesaId]) cuentasActivas[mesaId] = [];
  
  const ctx = cuentasActivas[mesaId];
  const prodIndex = ctx.findIndex(p => p.id_producto === producto.id);
  
  if (prodIndex >= 0) {
    ctx[prodIndex].cantidad += parseInt(cantidad, 10);
  } else {
    ctx.push({
      id: Date.now(), // Fake ID
      id_producto: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      cantidad: parseInt(cantidad, 10)
    });
  }
  return Promise.resolve({ exito: true, cuenta: [...ctx] });
};

export const actualizarCantidadProducto = async (mesaId, productoIdCuenta, delta) => {
  if (!cuentasActivas[mesaId]) return Promise.resolve({ exito: false });
  const ctx = cuentasActivas[mesaId];
  const index = ctx.findIndex(p => p.id === productoIdCuenta);
  
  if (index >= 0) {
    ctx[index].cantidad += delta;
    if (ctx[index].cantidad <= 0) {
      ctx.splice(index, 1);
    }
  }
  return Promise.resolve({ exito: true, cuenta: [...ctx] });
};

export const eliminarProductoCuenta = async (mesaId, productoIdCuenta) => {
  if (!cuentasActivas[mesaId]) return Promise.resolve({ exito: false });
  const ctx = cuentasActivas[mesaId];
  cuentasActivas[mesaId] = ctx.filter(p => p.id !== productoIdCuenta);
  return Promise.resolve({ exito: true, cuenta: [...cuentasActivas[mesaId]] });
};

export const cerrarCuenta = async (mesaId) => {
  // Liberar mesa 
  baseMesas = baseMesas.map(m => m.id === mesaId ? { ...m, estado: 'libre' } : m);
  delete cuentasActivas[mesaId];
  return Promise.resolve({ exito: true });
};

export const validarAcceso = async (pin) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const usuario = basePersonal.find(p => p.pin === pin && p.estado === 1);
      if (usuario) {
        resolve({
          id: usuario.id,
          nombre: usuario.nombre,
          rol: usuario.rol,    // Retornamos Administrador o Camarero
          estado: usuario.estado
        });
      } else {
        reject(new Error('Código incorrecto o usuario inactivo'));
      }
    }, 400);
  });
};

// Admin Endpoints
export const obtenerPersonal = async () => {
  return new Promise(resolve => setTimeout(() => resolve([...basePersonal]), 300));
};

export const agregarPersonal = async (nuevo) => {
  const p = { ...nuevo, id: Date.now(), estado: 1 };
  basePersonal.push(p);
  return Promise.resolve({ exito: true, trabajador: p });
};

export const eliminarPersonal = async (id) => {
  basePersonal = basePersonal.filter(p => p.id !== id);
  return Promise.resolve({ exito: true });
};

export const actualizarPersonal = async (actualizado) => {
  basePersonal = basePersonal.map(p => p.id === actualizado.id ? actualizado : p);
  return Promise.resolve({ exito: true });
};
