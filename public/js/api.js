// API Base URL
const API_BASE = 'http://localhost:4000/api';

// Proyectos
async function getProyectos() {
    try {
        const response = await fetch(`${API_BASE}/proyectos`);
        if (!response.ok) throw new Error('Error al obtener proyectos');
        const data = await response.json();
        return { data: data.body || data };
    } catch (error) {
        console.error('Error:', error);
        return { data: [] };
    }
}

async function getProyecto(id) {
    try {
        const response = await fetch(`${API_BASE}/proyectos/${id}`);
        if (!response.ok) throw new Error('Error al obtener proyecto');
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

async function crearProyecto(data) {
    try {
        const response = await fetch(`${API_BASE}/proyectos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Error al crear proyecto');
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

async function actualizarProyecto(id, data) {
    try {
        const response = await fetch(`${API_BASE}/proyectos/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Error al actualizar proyecto');
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

// Planes de Auditoría
async function getPlanes() {
    try {
        const response = await fetch(`${API_BASE}/planesAuditoria`);
        if (!response.ok) throw new Error('Error al obtener planes');
        const data = await response.json();
        return { data: data.body || data };
    } catch (error) {
        console.error('Error:', error);
        return { data: [] };
    }
}

async function getPlane(id) {
    try {
        const response = await fetch(`${API_BASE}/planesAuditoria/${id}`);
        if (!response.ok) throw new Error('Error al obtener plan');
        const data = await response.json();
        return data.body || data;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

async function crearPlane(data) {
    try {
        const response = await fetch(`${API_BASE}/planesAuditoria`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Error al crear plan');
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

async function actualizarPlane(id, data) {
    try {
        const response = await fetch(`${API_BASE}/planesAuditoria/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Error al actualizar plan');
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

// No Conformidades
async function getNoConformidades() {
    try {
        const response = await fetch(`${API_BASE}/noConformidades`);
        if (!response.ok) throw new Error('Error al obtener no conformidades');
        const data = await response.json();
        return { data: data.body || data };
    } catch (error) {
        console.error('Error:', error);
        return { data: [] };
    }
}

async function getNoConformidad(id) {
    try {
        const response = await fetch(`${API_BASE}/noConformidades/${id}`);
        if (!response.ok) throw new Error('Error al obtener no conformidad');
        const data = await response.json();
        return data.body || data;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

async function crearNoConformidad(data) {
    try {
        const response = await fetch(`${API_BASE}/noConformidades`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Error al crear no conformidad');
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

async function actualizarNoConformidad(data) {
    try {
        const response = await fetch(`${API_BASE}/noConformidades`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Error al actualizar no conformidad');
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

// Auditorías
async function getAuditorias() {
    try {
        const response = await fetch(`${API_BASE}/auditorias`);
        if (!response.ok) throw new Error('Error al obtener auditorías');
        const data = await response.json();
        return { data: data.body || data };
    } catch (error) {
        console.error('Error:', error);
        return { data: [] };
    }
}

async function getAuditoria(id) {
    try {
        const response = await fetch(`${API_BASE}/auditorias/${id}`);
        if (!response.ok) throw new Error('Error al obtener auditoría');
        const data = await response.json();
        return data.body || data;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

// Usuarios
async function getUsuarios() {
    try {
        const response = await fetch(`${API_BASE}/usuarios`);
        if (!response.ok) throw new Error('Error al obtener usuarios');
        const data = await response.json();
        return { data: data.body || data };
    } catch (error) {
        console.error('Error:', error);
        return { data: [] };
    }
}

// Evidencias (Biblioteca de Evidencias)
async function getEvidencias() {
    try {
        const response = await fetch(`${API_BASE}/bibliotecaEvidencias`);
        if (!response.ok) throw new Error('Error al obtener evidencias');
        const data = await response.json();
        return { data: data.body || data };
    } catch (error) {
        console.error('Error:', error);
        return { data: [] };
    }
}

async function getEvidencia(id) {
    try {
        const response = await fetch(`${API_BASE}/bibliotecaEvidencias/${id}`);
        if (!response.ok) throw new Error('Error al obtener evidencia');
        const data = await response.json();
        return data.body || data;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

async function crearAuditoria(data) {
    try {
        const response = await fetch(`${API_BASE}/auditorias`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Error al crear auditoría');
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

// Evidencias (Biblioteca de Evidencias)
async function crearEvidencia(data) {
    try {
        const response = await fetch(`${API_BASE}/bibliotecaEvidencias`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Error al crear evidencia');
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

async function actualizarEvidencia(data) {
    try {
        const response = await fetch(`${API_BASE}/bibliotecaEvidencias`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Error al actualizar evidencia');
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

// Utilidades
function mostrarAlerta(mensaje, tipo = 'success') {
    const alerta = document.createElement('div');
    alerta.className = `alert alert-${tipo}`;
    alerta.textContent = mensaje;
    document.body.insertBefore(alerta, document.body.firstChild);
    setTimeout(() => alerta.remove(), 3000);
}
