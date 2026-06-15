CREATE TABLE IF NOT EXISTS contactos (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  telefono VARCHAR(30) NOT NULL,
  email VARCHAR(120),
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO contactos (nombre, telefono, email) VALUES
('Ana López', '7821234567', 'ana@example.com'),
('Carlos Pérez', '7827654321', 'carlos@example.com')
ON CONFLICT DO NOTHING;
