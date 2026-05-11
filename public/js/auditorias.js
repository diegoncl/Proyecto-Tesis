// Funciones específicas para auditorías

document.addEventListener('DOMContentLoaded', async () => {
    await cargarPlanesSelect();
    await cargarUsuariosSelect();
    cargarAuditorias();
});

document.getElementById('formularioAuditoria').addEventListener('submit', async (e) => {
    e.preventDefault();

    const auditoria = {
        codigo: document.getElementById('codigoAuditoria').value,
        tipos_auditorias_id: null,
        tipo: document.getElementById('tipoAuditoria').value,
        auditor: document.getElementById('auditorAuditoria').value,
        auditor_id: document.getElementById('auditorIdAuditoria').value || null,
        plan_auditoria_id: document.getElementById('planAuditoria').value || null,
        fecha_programada: document.getElementById('fechaProgramadaAuditoria').value,
        fecha_ejecucion: document.getElementById('fechaEjecucionAuditoria').value,
        estado: document.getElementById('estadoAuditoria').value,
        puntuacion_total: document.getElementById('puntuacionAuditoria').value,
    };

    try {
        await crearAuditoria(auditoria);
        mostrarAlerta('Auditoría agregada exitosamente', 'success');
        document.getElementById('formularioAuditoria').reset();
        cargarAuditorias();
    } catch (error) {
        mostrarAlerta('Error al agregar auditoría: ' + error.message, 'error');
    }
});

async function cargarAuditorias() {
    try {
        const response = await getAuditorias();
        const auditorias = response.data || [];
        const contenedor = document.getElementById('listaAuditorias');

        if (auditorias.length === 0) {
            contenedor.innerHTML = '<p style="color: #999; text-align: center;">No hay auditorías registradas</p>';
            return;
        }

        contenedor.innerHTML = auditorias.map(item => `
            <div class="list-item">
                <div class="list-item-content">
                    <h3>${item.codigo || 'Sin código'}</h3>
                    <p><strong>Tipo de Auditoría:</strong> ${item.tipo || 'N/A'}</p>
                    <p><strong>Auditor:</strong> ${item.auditor || 'N/A'}</p>
                    <p><strong>Fecha Programada:</strong> ${item.fecha_programada || 'N/A'}</p>
                    <p><strong>Fecha Ejecución:</strong> ${item.fecha_ejecucion || 'N/A'}</p>
                    <p><strong>Estado:</strong> ${item.estado || 'N/A'}</p>
                    <p><strong>Puntuación:</strong> ${item.puntuacion_total || 'N/A'}</p>
                </div>
                <div class="list-item-actions">
                    <button class="btn btn-secondary btn-small" onclick="editarAuditoria(${item.idauditorias})">Editar</button>
                    <button class="btn btn-danger btn-small" onclick="eliminarAuditoria(${item.idauditorias})">Eliminar</button>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error al cargar auditorías:', error);
    }
}

async function cargarPlanesSelect() {
    try {
        const response = await getPlanes();
        const planes = response.data || [];
        const select = document.getElementById('planAuditoria');
        select.innerHTML = '<option value="">Selecciona un plan</option>' + planes.map(plan => `
            <option value="${plan.idplanes_auditoria}">${plan.nombre}${plan.proyecto_nombre ? ' (' + plan.proyecto_nombre + ')' : ''}</option>
        `).join('');
    } catch (error) {
        console.error('Error al cargar planes:', error);
    }
}

async function cargarUsuariosSelect() {
    try {
        const response = await getUsuarios();
        const usuarios = response.data || [];
        const select = document.getElementById('auditorIdAuditoria');
        select.innerHTML = '<option value="">Selecciona un auditor</option>' + usuarios.map(usuario => `
            <option value="${usuario.idusuarios}">${usuario.nombre}</option>
        `).join('');
    } catch (error) {
        console.error('Error al cargar usuarios:', error);
    }
}

function editarAuditoria(id) {
    alert('Función de edición en desarrollo - ID: ' + id);
}

function eliminarAuditoria(id) {
    if (confirm('¿Está seguro de que desea eliminar esta auditoría?')) {
        alert('Función de eliminación en desarrollo - ID: ' + id);
    }
}