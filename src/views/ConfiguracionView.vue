<template>
  <main class="configuracion-view">
    <header class="header">
      <h1>Configuración</h1>
    </header>
    
    <div class="card">
      <div class="form-group">
        <label for="nombre">Nombre Completo</label>
        <input 
          id="nombre"
          v-model="config.nombre" 
          type="text" 
          placeholder="Ejemplo: Francisco González" 
          class="input" 
        />
      </div>

      <div class="form-group">
        <label for="fecha">Fecha de Inicio del Ciclo</label>
        <p class="help-text">Elige la fecha en que tuviste tu último turno de Día. A partir de aquí se generará el patrón: Día (D) - Noche (N) - Descanso (R) - Descanso (R).</p>
        <input 
          id="fecha"
          v-model="config.fechaInicioCiclo" 
          type="date" 
          class="input" 
        />
      </div>

      <div class="form-group">
        <label for="hora">Hora de Notificación (Recordatorio para mañana)</label>
        <p class="help-text">¿A qué hora te gustaría recibir un recordatorio de tu turno del día siguiente?</p>
        <input 
          id="hora"
          v-model="config.horaNotificacion" 
          type="time" 
          class="input" 
          :disabled="!config.notificacionesActivas"
        />
      </div>

      <div class="form-group toggle-group">
        <div class="toggle-text">
          <label for="notif">Activar Notificaciones</label>
          <p class="help-text">Recibe alertas en tu dispositivo a la hora configurada.</p>
        </div>
        <label class="switch">
          <input 
            type="checkbox" 
            id="notif" 
            v-model="config.notificacionesActivas"
            @change="manejarToggleNotificaciones"
          >
          <span class="slider round"></span>
        </label>
      </div>
    </div>

    <div class="card mt-6">
      <GestionVacaciones />
    </div>
  </main>
</template>

<script setup>
import { useConfigStore } from '@/stores/configStore'
import { useNotificaciones } from '@/composables/useNotificaciones'
import GestionVacaciones from '@/components/configuracion/GestionVacaciones.vue'

const config = useConfigStore()
const { solicitarPermisos, enviarNotificacion } = useNotificaciones()

async function manejarToggleNotificaciones(e) {
  if (e.target.checked) {
    const concedido = await solicitarPermisos()
    if (!concedido) {
      config.notificacionesActivas = false
      alert('Debes permitir las notificaciones en tu navegador/dispositivo para usar esta función.')
    } else {
      enviarNotificacion('Notificaciones Activas', 'Recibirás recordatorios a la hora configurada.')
    }
  }
}
</script>

<style scoped>
.configuracion-view {
  padding: 1.5rem;
}

.header h1 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
}

.card {
  background-color: var(--bg-card);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid var(--color-primary-light);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.mt-6 {
  margin-top: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

label {
  font-weight: 500;
  font-size: 0.95rem;
  color: var(--text-primary);
}

.help-text {
  font-size: 0.8rem;
  color: var(--text-secondary);
  line-height: 1.4;
  margin-bottom: 0.25rem;
}

.input {
  background-color: var(--bg-color); /* Más oscuro que var(--bg-card) */
  border: 1px solid var(--color-primary-light);
  color: var(--text-primary);
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-family: inherit;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.input:focus {
  outline: none;
  border-color: var(--color-primary);
}

.input:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Fix for date/time picker on Chrome in dark mode */
::-webkit-calendar-picker-indicator {
  opacity: 0.6;
  cursor: pointer;
  filter: invert(1);
}

/* Toggle Switch Styles */
.toggle-group {
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: var(--bg-card);
  border: 1px solid var(--color-primary-light);
  padding: 1rem;
  border-radius: 12px;
}

.toggle-text {
  flex: 1;
}

.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 28px;
  flex-shrink: 0;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--color-primary-light);
  transition: .3s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: .3s;
}

input:checked + .slider {
  background-color: var(--text-primary);
}

input:focus + .slider {
  box-shadow: 0 0 1px var(--text-secondary);
}

input:checked + .slider:before {
  transform: translateX(22px);
  background-color: var(--bg-color);
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
