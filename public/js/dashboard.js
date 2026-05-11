// Dashboard - Cargar estadísticas
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Cargar conteos
        const proyectos = await getProyectos();
        const planes = await getPlanes();
        const auditorias = await getAuditorias();
        const noConformidades = await getNoConformidades();
        const evidencias = await getEvidencias();

        // Actualizar contadores
        document.getElementById('proyectosCount').textContent = proyectos.data?.length || 0;
        document.getElementById('planesCount').textContent = planes.data?.length || 0;
        document.getElementById('auditoriasCount').textContent = auditorias.data?.length || 0;
        document.getElementById('noconformidadesCount').textContent = noConformidades.data?.length || 0;
        document.getElementById('evidenciasCount').textContent = evidencias.data?.length || 0;
    } catch (error) {
        console.error('Error al cargar estadísticas:', error);
    }
});
