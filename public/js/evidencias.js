// Cargar evidencias y no conformidades al abrir la página
document.addEventListener('DOMContentLoaded', async () => {
    await cargarNoConformidadesSelect();
    cargarEvidencias();
});

async function cargarNoConformidadesSelect() {
    try {
        const response = await getNoConformidades();
        const items = response.data || [];
        const select = document.getElementById('noConformidadEvidencia');
        select.innerHTML = '<option value="">Selecciona una no conformidad</option>' + items.map(item => `
            <option value="${item.idno_conformidades}">${item.titulo}</option>
        `).join('');
    } catch (error) {
        console.error('Error al cargar no conformidades para el select:', error);
    }
}

// Manejar envío del formulario
document.getElementById('formularioEvidencia').addEventListener('submit', async (e) => {
    e.preventDefault();

    const evidencia = {
        nombre_evidencia: document.getElementById('nombreEvidencia').value,
        descripcion: document.getElementById('descripcionEvidencia').value,
        tipo_evidencia: document.getElementById('tipoEvidencia').value,
        url_evidencia: document.getElementById('urlEvidencia').value,
        fecha_obtencion: document.getElementById('fechaEvidencia').value,
        autor_auditor: document.getElementById('autorEvidencia').value,
        proceso_relacionado: document.getElementById('procesoRelacionado').value,
        hallazgo_asociado: document.getElementById('hallazgoEvidencia').value,
        no_conformidad_id: document.getElementById('noConformidadEvidencia').value || null
    };

    try {
        await crearEvidencia(evidencia);
        mostrarAlerta('Evidencia agregada exitosamente', 'success');
        document.getElementById('formularioEvidencia').reset();
        cargarEvidencias();
    } catch (error) {
        mostrarAlerta('Error al agregar evidencia: ' + error.message, 'error');
    }
});

async function cargarEvidencias() {
    try {
        const response = await getEvidencias();
        const evidencias = response.data || [];
        const contenedor = document.getElementById('listaEvidencias');

        if (evidencias.length === 0) {
            contenedor.innerHTML = '<p style="color: #999; text-align: center;">No hay evidencias registradas</p>';
            return;
        }

        contenedor.innerHTML = evidencias.map(evidencia => `
            <div class="list-item">
                <div class="list-item-content">
                    <h3>${evidencia.nombre_evidencia}</h3>
                    <p><strong>No Conformidad:</strong> ${evidencia.no_conformidad_titulo || 'N/A'}</p>
                    <p><strong>Auditoría:</strong> ${evidencia.auditoria_codigo || 'N/A'}</p>
                    <p><strong>Descripción:</strong> ${evidencia.descripcion || 'N/A'}</p>
                    <p><strong>Tipo:</strong> ${evidencia.tipo_evidencia}</p>
                    <p><strong>Proceso:</strong> ${evidencia.proceso_relacionado || 'N/A'}</p>
                    <p><strong>Hallazgo:</strong> ${evidencia.hallazgo_asociado || 'N/A'}</p>
                    <p><strong>Fecha:</strong> ${evidencia.fecha_obtencion}</p>
                    <p><strong>Autor:</strong> ${evidencia.autor_auditor || 'N/A'}</p>
                    ${evidencia.url_evidencia ? `<p><strong>Ubicación:</strong> ${evidencia.url_evidencia}</p>` : ''}
                </div>
                <div class="list-item-actions">
                    <button class="btn btn-secondary btn-small" onclick="editarEvidencia(${evidencia.idbiblioteca_evidencias})">Editar</button>
                    <button class="btn btn-danger btn-small" onclick="eliminarEvidencia(${evidencia.idbiblioteca_evidencias})">Eliminar</button>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error al cargar evidencias:', error);
    }
}

function editarEvidencia(id) {
    alert('Función de edición en desarrollo - ID: ' + id);
}

function eliminarEvidencia(id) {
    if (confirm('¿Está seguro de que desea eliminar esta evidencia?')) {
        alert('Función de eliminación en desarrollo - ID: ' + id);
    }
}
