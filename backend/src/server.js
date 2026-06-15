import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { pool } from './db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ origin: process.env.FRONTEND_URL || '*' }));
app.use(express.json());

app.get('/', (_req, res) => {
  res.json({ message: 'API Agenda de Contactos funcionando' });
});

app.get('/api/contactos', async (_req, res) => {
  try {
    const result = await pool.query('SELECT * FROM contactos ORDER BY id DESC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener contactos' });
  }
});

app.post('/api/contactos', async (req, res) => {
  try {
    const { nombre, telefono, email } = req.body;
    if (!nombre || !telefono) {
      return res.status(400).json({ error: 'Nombre y teléfono son obligatorios' });
    }
    const result = await pool.query(
      'INSERT INTO contactos (nombre, telefono, email) VALUES ($1, $2, $3) RETURNING *',
      [nombre, telefono, email || null]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear contacto' });
  }
});

app.put('/api/contactos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, telefono, email } = req.body;
    const result = await pool.query(
      'UPDATE contactos SET nombre=$1, telefono=$2, email=$3 WHERE id=$4 RETURNING *',
      [nombre, telefono, email || null, id]
    );
    if (result.rowCount === 0) return res.status(404).json({ error: 'Contacto no encontrado' });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar contacto' });
  }
});

app.delete('/api/contactos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM contactos WHERE id=$1', [id]);
    res.json({ message: 'Contacto eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar contacto' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor en puerto ${PORT}`);
});
