import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

function App() {
  const [contactos, setContactos] = useState([]);
  const [form, setForm] = useState({ nombre: '', telefono: '', email: '' });
  const [editando, setEditando] = useState(null);

  const cargarContactos = async () => {
    const res = await fetch(`${API_URL}/api/contactos`);
    setContactos(await res.json());
  };

  useEffect(() => { cargarContactos(); }, []);

  const guardar = async (e) => {
    e.preventDefault();
    const url = editando ? `${API_URL}/api/contactos/${editando}` : `${API_URL}/api/contactos`;
    const method = editando ? 'PUT' : 'POST';
    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    setForm({ nombre: '', telefono: '', email: '' });
    setEditando(null);
    cargarContactos();
  };

  const editar = (contacto) => {
    setForm({ nombre: contacto.nombre, telefono: contacto.telefono, email: contacto.email || '' });
    setEditando(contacto.id);
  };

  const eliminar = async (id) => {
    await fetch(`${API_URL}/api/contactos/${id}`, { method: 'DELETE' });
    cargarContactos();
  };

  return (
    <main className="container">
      <section className="card">
        <h1>Agenda de Contactos</h1>
        <p>Proyecto simple con React, Vite, Express y PostgreSQL.</p>
        <form onSubmit={guardar} className="form">
          <input placeholder="Nombre" value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })} />
          <input placeholder="Teléfono" value={form.telefono} onChange={e => setForm({ ...form, telefono: e.target.value })} />
          <input placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
          <button>{editando ? 'Actualizar contacto' : 'Agregar contacto'}</button>
        </form>
      </section>

      <section className="grid">
        {contactos.map(c => (
          <article className="contacto" key={c.id}>
            <h2>{c.nombre}</h2>
            <p>Tel: {c.telefono}</p>
            <p>Email: {c.email || 'Sin email'}</p>
            <button onClick={() => editar(c)}>Editar</button>
            <button className="danger" onClick={() => eliminar(c.id)}>Eliminar</button>
          </article>
        ))}
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
