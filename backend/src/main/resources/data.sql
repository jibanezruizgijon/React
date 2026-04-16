-- Limpiar base de datos si es necesario (el ddl-auto=update de Hibernate ya crea todo, esto solo inserta si esta vacía)
-- Insertar Categorías
INSERT IGNORE INTO categoria (id, nombre) VALUES (1, 'Bebidas');
INSERT IGNORE INTO categoria (id, nombre) VALUES (2, 'Entrantes');
INSERT IGNORE INTO categoria (id, nombre) VALUES (3, 'Platos');
INSERT IGNORE INTO categoria (id, nombre) VALUES (4, 'Vinos');

-- Insertar Mesas
INSERT IGNORE INTO mesa (id, n_mesa, capacidad, estado) VALUES (1, 1, 4, 'libre');
INSERT IGNORE INTO mesa (id, n_mesa, capacidad, estado) VALUES (2, 2, 3, 'libre');
INSERT IGNORE INTO mesa (id, n_mesa, capacidad, estado) VALUES (3, 3, 5, 'libre');
INSERT IGNORE INTO mesa (id, n_mesa, capacidad, estado) VALUES (4, 4, 2, 'libre');
INSERT IGNORE INTO mesa (id, n_mesa, capacidad, estado) VALUES (5, 5, 3, 'libre');
INSERT IGNORE INTO mesa (id, n_mesa, capacidad, estado) VALUES (6, 6, 4, 'reservada');

-- Insertar Productos
INSERT IGNORE INTO producto (id, nombre, precio, stock, id_categoria) VALUES (1, 'Fanta 33cl', 2.50, 70, 1);
INSERT IGNORE INTO producto (id, nombre, precio, stock, id_categoria) VALUES (2, 'CocaCola 33cl', 2.50, 83, 1);
INSERT IGNORE INTO producto (id, nombre, precio, stock, id_categoria) VALUES (3, 'Berenjena rellena', 10.99, 20, 2);
INSERT IGNORE INTO producto (id, nombre, precio, stock, id_categoria) VALUES (4, 'Pasta a la carbonara', 8.99, 15, 3);
INSERT IGNORE INTO producto (id, nombre, precio, stock, id_categoria) VALUES (5, 'Brocheta de ciervo', 12.50, 10, 3);
INSERT IGNORE INTO producto (id, nombre, precio, stock, id_categoria) VALUES (6, 'Empanadillas de la Abuela', 10.50, 25, 2);
INSERT IGNORE INTO producto (id, nombre, precio, stock, id_categoria) VALUES (7, 'Vino Tinto Copa', 6.00, 40, 4);

-- Insertar Personal
INSERT IGNORE INTO personal (id, nombre, correo, telefono, estado, rol, pin) VALUES (1, 'Aitor Tilla Pérez', 'aitor@gmail.com', '600305001', 1, 'Administrador', '1234');
INSERT IGNORE INTO personal (id, nombre, correo, telefono, estado, rol, pin) VALUES (2, 'Elena Nito Gil', 'elena@gmail.com', '702642054', 1, 'Camarero', '5678');
INSERT IGNORE INTO personal (id, nombre, correo, telefono, estado, rol, pin) VALUES (3, 'Paco Meralgo Manzano', 'paco@gmail.com', '611252745', 1, 'Camarero', '0000');
INSERT IGNORE INTO personal (id, nombre, correo, telefono, estado, rol, pin) VALUES (4, 'Armando Bronca Segura', 'armando@gmail.com', '600345722', 0, 'Cocinero', '1111');
