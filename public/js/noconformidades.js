// Cargar no conformidades y auditorías al abrir la página
document.addEventListener('DOMContentLoaded', async () => {
    await cargarAuditoriasSelect();
    cargarNoConformidades();
});

async function cargarAuditoriasSelect() {
    try {
        const response = await getAuditorias();
        const auditorias = response.data || [];
        const select = document.getElementById('auditoriaNC');
        select.innerHTML = '<option value="">Selecciona una auditoría</option>' + auditorias.map(item => `
            <option value="${item.idauditorias}">${item.codigo || 'Auditoría ' + item.idauditorias} - ${item.tipo || 'Sin tipo'}</option>
        `).join('');
    } catch (error) {
        console.error('Error al cargar auditorías para el select:', error);
    }
}

// Manejar envío del formulario
document.getElementById('formularioNoConformidad').addEventListener('submit', async (e) => {
    e.preventDefault();

    const noConformidad = {
        titulo: document.getElementById('tituloNC').value,
        descripcion: document.getElementById('descripcionNC').value,
        causa_raiz: document.getElementById('causaNC').value,
        severidad: document.getElementById('severidadNC').value,
        plan_accion: document.getElementById('planAccionNC').value,
        fecha_limite_correccion: document.getElementById('fechaLimiteNC').value,
        responsable: document.getElementById('responsableNC').value,
        auditoria_id: document.getElementById('auditoriaNC').value || null,
        estado: document.getElementById('estadoNC').value
    };

    try {
        await crearNoConformidad(noConformidad);
        mostrarAlerta('No conformidad agregada exitosamente', 'success');
        document.getElementById('formularioNoConformidad').reset();
        cargarNoConformidades();
    } catch (error) {
        mostrarAlerta('Error al agregar no conformidad: ' + error.message, 'error');
    }
});

async function cargarNoConformidades() {
    try {
        const response = await getNoConformidades();
        const items = response.data || [];
        const contenedor = document.getElementById('listaNoConformidades');

        if (items.length === 0) {
            contenedor.innerHTML = '<p style="color: #999; text-align: center;">No hay no conformidades registradas</p>';
            return;
        }

        contenedor.innerHTML = items.map(item => `
            <div class="list-item">
                <div class="list-item-content">
                    <h3>${item.titulo}</h3>
                    <p><strong>Auditoría:</strong> ${item.auditoria_codigo || 'N/A'} ${item.auditoria_tipo ? '(' + item.auditoria_tipo + ')' : ''}</p>
                    <p><strong>Plan:</strong> ${item.plan_nombre || 'N/A'}</p>
                    <p><strong>Descripción:</strong> ${item.descripcion || 'N/A'}</p>
                    <p><strong>Causa:</strong> ${item.causa_raiz || 'N/A'}</p>
                    <p><strong>Severidad:</strong> <span style="color: ${getSeveridadColor(item.severidad)}; font-weight: bold;">${item.severidad}</span></p>
                    <p><strong>Estado:</strong> ${item.estado}</p>
                    <p><strong>Responsable:</strong> ${item.responsable || 'N/A'}</p>
                    <p><strong>Fecha Límite:</strong> ${item.fecha_limite_correccion || 'N/A'}</p>
                </div>
                <div class="list-item-actions">
                    <button class="btn btn-secondary btn-small" onclick="editarNoConformidad(${item.idno_conformidades})">Editar</button>
                    <button class="btn btn-danger btn-small" onclick="eliminarNoConformidad(${item.idno_conformidades})">Eliminar</button>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error al cargar no conformidades:', error);
    }
}

function getSeveridadColor(severidad) {
    const colores = {
        'Crítica': '#dc3545',
        'Mayor': '#fd7e14',
        'Menor': '#ffc107',
        'Observación': '#17a2b8'
    };
    return colores[severidad] || '#667eea';
}

function editarNoConformidad(id) {
    alert('Función de edición en desarrollo - ID: ' + id);
}

function eliminarNoConformidad(id) {
    if (confirm('¿Está seguro de que desea eliminar esta no conformidad?')) {
        alert('Función de eliminación en desarrollo - ID: ' + id);
    }
}
