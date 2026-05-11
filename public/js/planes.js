// Cargar planes y proyectos al abrir la página
document.addEventListener('DOMContentLoaded', async () => {
    await cargarProyectosSelect();
    cargarPlanes();
});

async function cargarProyectosSelect() {
    try {
        const response = await getProyectos();
        const proyectos = response.data || [];
        const select = document.getElementById('proyectoPlane');
        select.innerHTML = '<option value="">Selecciona un proyecto</option>' + proyectos.map(proyecto => `
            <option value="${proyecto.idproyectos}">${proyecto.nombre}</option>
        `).join('');
    } catch (error) {
        console.error('Error al cargar proyectos para el select:', error);
    }
}

// Manejar envío del formulario
document.getElementById('formularioPlane').addEventListener('submit', async (e) => {
    e.preventDefault();

    const plan = {
        nombre: document.getElementById('nombrePlane').value,
        descripcion: document.getElementById('descripcionPlane').value,
        alcance: document.getElementById('alcancePlane').value,
        objetivos: document.getElementById('objetivosPlane').value,
        fecha_inicio: document.getElementById('fechaInicioPlane').value,
        fecha_fin: document.getElementById('fechaFinPlane').value,
        responsable: document.getElementById('responsablePlane').value,
        proyecto_id: document.getElementById('proyectoPlane').value || null
    };

    try {
        await crearPlane(plan);
        mostrarAlerta('Plan de auditoría agregado exitosamente', 'success');
        document.getElementById('formularioPlane').reset();
        cargarPlanes();
    } catch (error) {
        mostrarAlerta('Error al agregar plan: ' + error.message, 'error');
    }
});

async function cargarPlanes() {
    try {
        const response = await getPlanes();
        const planes = response.data || [];
        const contenedor = document.getElementById('listaPlanes');

        if (planes.length === 0) {
            contenedor.innerHTML = '<p style="color: #999; text-align: center;">No hay planes de auditoría registrados</p>';
            return;
        }

        contenedor.innerHTML = planes.map(plan => `
            <div class="list-item">
                <div class="list-item-content">
                    <h3>${plan.nombre}</h3>
                    <p><strong>Proyecto:</strong> ${plan.proyecto_nombre || 'Sin proyecto asignado'}</p>
                    <p><strong>Descripción:</strong> ${plan.descripcion || 'N/A'}</p>
                    <p><strong>Alcance:</strong> ${plan.alcance || 'N/A'}</p>
                    <p><strong>Objetivos:</strong> ${plan.objetivos || 'N/A'}</p>
                    <p><strong>Fechas:</strong> ${plan.fecha_inicio} al ${plan.fecha_fin}</p>
                    <p><strong>Responsable:</strong> ${plan.responsable || 'N/A'}</p>
                </div>
                <div class="list-item-actions">
                    <button class="btn btn-secondary btn-small" onclick="editarPlane(${plan.idplanes_auditoria})">Editar</button>
                    <button class="btn btn-danger btn-small" onclick="eliminarPlane(${plan.idplanes_auditoria})">Eliminar</button>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error al cargar planes:', error);
    }
}

function editarPlane(id) {
    alert('Función de edición en desarrollo - ID: ' + id);
}

function eliminarPlane(id) {
    if (confirm('¿Está seguro de que desea eliminar este plan?')) {
        alert('Función de eliminación en desarrollo - ID: ' + id);
    }
}
