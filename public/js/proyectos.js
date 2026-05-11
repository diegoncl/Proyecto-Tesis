// Cargar proyectos al abrir la página
document.addEventListener('DOMContentLoaded', cargarProyectos);

// Manejar envío del formulario
document.getElementById('formularioProyecto').addEventListener('submit', async (e) => {
    e.preventDefault();

    const proyecto = {
        nombre: document.getElementById('nombreProyecto').value,
        descripcion: document.getElementById('descripcionProyecto').value,
        fecha_inicio: document.getElementById('fechaInicioProyecto').value,
        fecha_fin: document.getElementById('fechaFinProyecto').value
    };

    try {
        await crearProyecto(proyecto);
        mostrarAlerta('Proyecto agregado exitosamente', 'success');
        document.getElementById('formularioProyecto').reset();
        cargarProyectos();
    } catch (error) {
        mostrarAlerta('Error al agregar proyecto: ' + error.message, 'error');
    }
});

async function cargarProyectos() {
    try {
        const response = await getProyectos();
        const proyectos = response.data || [];
        const contenedor = document.getElementById('listaProyectos');

        if (proyectos.length === 0) {
            contenedor.innerHTML = '<p style="color: #999; text-align: center;">No hay proyectos registrados</p>';
            return;
        }

        contenedor.innerHTML = proyectos.map(proyecto => `
            <div class="list-item">
                <div class="list-item-content">
                    <h3>${proyecto.nombre}</h3>
                    <p><strong>Descripción:</strong> ${proyecto.descripcion || 'N/A'}</p>
                    <p><strong>Fechas:</strong> ${proyecto.fecha_inicio} al ${proyecto.fecha_fin}</p>
                </div>
                <div class="list-item-actions">
                    <button class="btn btn-secondary btn-small" onclick="editarProyecto(${proyecto.idproyectos})">Editar</button>
                    <button class="btn btn-danger btn-small" onclick="eliminarProyecto(${proyecto.idproyectos})">Eliminar</button>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error al cargar proyectos:', error);
    }
}

function editarProyecto(id) {
    alert('Función de edición en desarrollo - ID: ' + id);
}

function eliminarProyecto(id) {
    if (confirm('¿Está seguro de que desea eliminar este proyecto?')) {
        alert('Función de eliminación en desarrollo - ID: ' + id);
    }
}
