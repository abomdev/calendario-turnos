<template>
  <main class="configuracion-view">
    <header class="header">
      <h1>Configuración</h1>
    </header>
    
    <!-- Sección Perfil -->
    <div class="seccion-grupo">
      <span class="seccion-titulo">PERFIL</span>
      <div class="grupo-card">
        <div class="tabla-fila clickable" @click="openSheet('name')">
          <div class="fila-izquierda">
            <div class="icon-wrapper bg-persona">
              <svg class="icon-row" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <span class="fila-label">Nombre</span>
          </div>
          <div class="fila-derecha">
            <span class="fila-valor">{{ config.nombre || 'No configurado' }}</span>
            <span class="chevron-arrow">›</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Sección Ciclo -->
    <div class="seccion-grupo">
      <span class="seccion-titulo">CICLO DE TURNOS</span>
      <div class="grupo-card">
        <div class="tabla-fila clickable" @click="openSheet('date')">
          <div class="fila-izquierda">
            <div class="icon-wrapper bg-ciclo">
              <svg class="icon-row" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </div>
            <span class="fila-label">Inicio de Ciclo</span>
          </div>
          <div class="fila-derecha">
            <span class="fila-valor">{{ formatFechaCiclo(config.fechaInicioCiclo) }}</span>
            <span class="chevron-arrow">›</span>
          </div>
        </div>
        <div class="ayuda-fila">
          <p class="ayuda-texto">Selecciona tu último turno de día. <br> Se generará el ciclo de 4 días. <br> 1 turno de día, 1 de noche y 2 días de descanso.</p>
        </div>
      </div>
    </div>

    <!-- Sección Notificaciones -->
    <div class="seccion-grupo">
      <span class="seccion-titulo">NOTIFICACIONES</span>
      <div class="grupo-card">
        <div class="tabla-fila">
          <div class="fila-izquierda">
            <div class="icon-wrapper bg-notif">
              <svg class="icon-row" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
            </div>
            <span class="fila-label">Recordatorios</span>
          </div>
          <div class="fila-derecha">
            <label class="switch">
              <input 
                type="checkbox" 
                v-model="config.notificacionesActivas"
                @change="manejarToggleNotificaciones"
              >
              <span class="slider round"></span>
            </label>
          </div>
        </div>

        <div 
          v-if="config.notificacionesActivas"
          class="tabla-fila clickable animate-slide-down" 
          @click="openSheet('time')"
        >
          <div class="fila-izquierda">
            <div class="icon-wrapper bg-hora">
              <svg class="icon-row" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <span class="fila-label">Hora de aviso</span>
          </div>
          <div class="fila-derecha">
            <span class="fila-valor">{{ config.horaNotificacion || '21:00' }}</span>
            <span class="chevron-arrow">›</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Sección Vacaciones -->
    <div class="seccion-grupo">
      <span class="seccion-titulo">PERIODO DE VACACIONES</span>
      <div class="grupo-card">
        <!-- Botón agregar -->
        <div class="tabla-fila clickable btn-agregar-fila" @click="openSheet('vacation')">
          <div class="fila-izquierda">
            <div class="icon-wrapper bg-vac">
              <svg class="icon-row" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </div>
            <span class="fila-label color-green">Agregar período de vacaciones</span>
          </div>
          <div class="fila-derecha">
            <span class="chevron-arrow">›</span>
          </div>
        </div>

        <!-- Lista de períodos de vacaciones -->
        <template v-if="turnosStore.vacaciones.length > 0">
          <div 
            v-for="periodo in sortedVacaciones" 
            :key="periodo.id" 
            class="tabla-fila fila-vacaciones"
          >
            <div class="fila-izquierda">
              <div class="vac-icon-dot"></div>
              <div class="vac-texto">
                <span class="vac-fechas">{{ formatFechaPeriodo(periodo.inicio) }} - {{ formatFechaPeriodo(periodo.fin) }}</span>
                <span class="vac-dias">({{ calcularDias(periodo.inicio, periodo.fin) }} días)</span>
              </div>
            </div>
            <div class="fila-derecha">
              <button @click.stop="eliminarPeriodo(periodo.id)" class="btn-eliminar-row">
                <Trash2 class="btn-eliminar-icon" />
                Eliminar
              </button>
            </div>
          </div>
        </template>
        <div v-else class="fila-empty">
          <span>No hay vacaciones programadas</span>
        </div>
      </div>
    </div>

    <!-- Sección Soporte / Acerca de -->
    <div class="seccion-grupo">
      <div class="seccion-titulo">SOPORTE Y CONTACTO</div>
      <div class="seccion-card">
        
        <!-- Reportar un error -->
        <a href="mailto:franciscogonzalez.contacto@gmail.com" class="tabla-fila clickeable" style="text-decoration: none;">
          <div class="fila-izquierda">
            <div class="icon-wrapper bg-notif">
              <Bug class="icon-row" />
            </div>
            <span class="fila-label">Reportar un problema</span>
          </div>
          <div class="fila-derecha">
            <span class="chevron-arrow">›</span>
          </div>
        </a>

        <div class="divider-line"></div>

        <!-- Redes Sociales -->
        <div class="tabla-fila redes-fila">
          <span class="redes-texto">Desarrollado por Francisco González</span>
          <div class="redes-iconos">
            <a href="https://github.com/abomdev" target="_blank" class="red-link">
              <Icon icon="mdi:github" class="red-icon" />
            </a>
            <a href="https://www.linkedin.com/in/franciscogonzalezcorrea" target="_blank" class="red-link">
              <Icon icon="mdi:linkedin" class="red-icon" />
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- SHEET BOTTOM MODAL (ESTILO iOS) -->
    <Transition name="fade">
      <div v-if="activeSheet" class="backdrop" @click="closeSheet"></div>
    </Transition>

    <Transition name="slide-up">
      <div v-if="activeSheet" class="bottom-sheet" @click.stop>
        <!-- Manilla iOS para deslizar -->
        <div class="sheet-handle-bar">
          <div class="handle"></div>
        </div>

        <!-- Header del Sheet -->
        <div class="sheet-header">
          <button class="sheet-btn-cancelar" @click="closeSheet">Cancelar</button>
          <span class="sheet-titulo">{{ getSheetTitle() }}</span>
          <button class="sheet-btn-guardar" @click="saveSheet">Aceptar</button>
        </div>

        <!-- Cuerpo del Sheet -->
        <div class="sheet-body">
          <!-- Formulario Nombre -->
          <div v-if="activeSheet === 'name'" class="sheet-input-wrapper">
            <input 
              v-model="tempNombre" 
              type="text" 
              placeholder="Escribe tu nombre completo" 
              class="sheet-input"
              autofocus
              @keyup.enter="saveSheet"
            />
          </div>

          <!-- Formulario Fecha Inicio -->
          <div v-if="activeSheet === 'date'" class="sheet-input-wrapper">
            <p class="sheet-body-help">Elige el día de tu último turno de día:</p>
            <input 
              v-model="tempFechaInicioCiclo" 
              type="date" 
              class="sheet-input input-date-native"
            />
          </div>

          <!-- Formulario Hora Notificación -->
          <div v-if="activeSheet === 'time'" class="sheet-input-wrapper">
            <p class="sheet-body-help">Hora de recordatorio diaria:</p>
            <input 
              v-model="tempHoraNotificacion" 
              type="time" 
              class="sheet-input input-time-native"
            />
          </div>

          <!-- Formulario Vacaciones -->
          <div v-if="activeSheet === 'vacation'" class="sheet-vacation-form">
            <div class="vac-input-group">
              <label>Fecha de Inicio</label>
              <input 
                v-model="tempVacInicio" 
                type="date" 
                class="sheet-input"
              />
            </div>
            <div class="vac-input-group">
              <label>Fecha de Fin</label>
              <input 
                v-model="tempVacFin" 
                type="date" 
                class="sheet-input"
              />
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </main>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Bug, Trash2 } from '@lucide/vue'
import { Icon } from '@iconify/vue'
import { useConfigStore } from '@/stores/configStore'
import { useTurnosStore } from '@/stores/turnosStore'
import { useNotificaciones } from '@/composables/useNotificaciones'
import { format, parseISO, differenceInDays } from 'date-fns'
import { es } from 'date-fns/locale'

const config = useConfigStore()
const turnosStore = useTurnosStore()
const { solicitarPermisos, enviarNotificacion } = useNotificaciones()

// Control del sheet modal
const activeSheet = ref(null)

// Variables temporales de edición
const tempNombre = ref('')
const tempFechaInicioCiclo = ref('')
const tempHoraNotificacion = ref('')
const tempVacInicio = ref('')
const tempVacFin = ref('')

const sortedVacaciones = computed(() => {
  return [...turnosStore.vacaciones].sort((a, b) => b.inicio.localeCompare(a.inicio))
})

function formatFechaCiclo(fechaStr) {
  if (!fechaStr) return 'No configurado'
  try {
    return format(parseISO(fechaStr), "d 'de' MMMM, yyyy", { locale: es })
  } catch (e) {
    return fechaStr
  }
}

function formatFechaPeriodo(fechaStr) {
  try {
    return format(parseISO(fechaStr), "d 'de' MMM", { locale: es })
  } catch (e) {
    return fechaStr
  }
}

function calcularDias(inicioStr, finStr) {
  try {
    const inicio = parseISO(inicioStr)
    const fin = parseISO(finStr)
    return differenceInDays(fin, inicio) + 1
  } catch (e) {
    return 0
  }
}

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

function openSheet(type) {
  activeSheet.value = type
  if (type === 'name') {
    tempNombre.value = config.nombre || ''
  } else if (type === 'date') {
    tempFechaInicioCiclo.value = config.fechaInicioCiclo || ''
  } else if (type === 'time') {
    tempHoraNotificacion.value = config.horaNotificacion || '21:00'
  } else if (type === 'vacation') {
    tempVacInicio.value = ''
    tempVacFin.value = ''
  }
}

function getSheetTitle() {
  const titles = {
    name: 'Editar Nombre',
    date: 'Inicio del Ciclo',
    time: 'Hora de Aviso',
    vacation: 'Agregar Vacaciones'
  }
  return titles[activeSheet.value] || ''
}

function saveSheet() {
  if (activeSheet.value === 'name') {
    config.nombre = tempNombre.value
  } else if (activeSheet.value === 'date') {
    config.fechaInicioCiclo = tempFechaInicioCiclo.value
  } else if (activeSheet.value === 'time') {
    config.horaNotificacion = tempHoraNotificacion.value
  } else if (activeSheet.value === 'vacation') {
    if (!tempVacInicio.value || !tempVacFin.value) return
    if (tempVacFin.value < tempVacInicio.value) {
      alert('La fecha de fin no puede ser anterior a la de inicio.')
      return
    }
    turnosStore.addVacaciones(tempVacInicio.value, tempVacFin.value)
  }
  closeSheet()
}

function closeSheet() {
  activeSheet.value = null
}

function eliminarPeriodo(id) {
  if (confirm('¿Estás seguro de que quieres eliminar este período de vacaciones?')) {
    turnosStore.removeVacaciones(id)
  }
}
</script>

<style src="@/components/calendar/calendar-theme.css"></style>

<style scoped>
.configuracion-view {
  padding: 1.5rem 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.header h1 {
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
  letter-spacing: -0.5px;
}

/* Secciones estilo iOS Grouped Table */
.seccion-grupo {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.seccion-titulo {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-secondary);
  letter-spacing: 0.8px;
  padding-left: 0.75rem;
}

.grupo-card {
  background-color: var(--bg-card);
  border-radius: var(--radius-ios-card);
  border: 1px solid var(--glass-border);
  overflow: hidden;
}

.tabla-fila {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.85rem 1rem;
  position: relative;
  transition: background-color 0.15s ease;
}

/* Línea de separación inset estilo iOS */
.tabla-fila:not(:last-child)::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 3.25rem;
  right: 0;
  height: 1px;
  background-color: var(--glass-border);
}

.tabla-fila.clickable:active {
  background-color: rgba(255, 255, 255, 0.05);
}

.fila-izquierda {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  min-width: 0;
}

.icon-wrapper {
  width: 28px;
  height: 28px;
  border-radius: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  flex-shrink: 0;
}

.icon-row {
  width: 16px;
  height: 16px;
}

/* Paleta de iconos — gradientes difuminados estilo turno */
.bg-persona {
  /* Turno día: coral → rojo suave */
  background: linear-gradient(135deg, var(--cal-dia-from), var(--cal-dia-mid));
}

.bg-ciclo {
  /* Turno noche: púrpura → azul */
  background: linear-gradient(135deg, var(--cal-noche-from), var(--cal-noche-to));
}

.bg-notif {
  /* Rojo difuminado — acción de alerta */
  background: linear-gradient(135deg, #ff6b6b, #ff3b30);
}

.bg-hora {
  /* Gris azulado neutro */
  background: linear-gradient(135deg, #6e7eab, #5a6896);
}

.bg-vac {
  /* Vacaciones: verde suave */
  background: linear-gradient(135deg, var(--cal-vacaciones-from), var(--cal-vacaciones-to));
}

.fila-label {
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--text-primary);
}

.color-green {
  color: var(--cal-vacaciones-from);
  font-weight: 600;
}

.fila-derecha {
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

.fila-valor {
  font-size: 0.9rem;
  color: var(--text-secondary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 150px;
}

.chevron-arrow {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.15);
  font-weight: 500;
}

/* ── Redes Sociales ── */
.redes-fila {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1.25rem 1rem;
}

.redes-texto {
  font-size: 0.85rem;
  color: var(--text-secondary);
}

.redes-iconos {
  display: flex;
  gap: 0.4rem;
  align-items: center;
}

.red-link {
  color: var(--text-secondary);
  transition: color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.red-link:hover {
  color: var(--text-primary);
}

.red-icon {
  width: 20px;
  height: 20px;
}

.ayuda-fila {
  padding: 0.65rem 1rem 0.85rem 3.25rem;
}

.ayuda-texto {
  font-size: 0.78rem;
  color: var(--text-secondary);
  line-height: 1.4;
}

.fila-empty {
  padding: 1rem;
  text-align: center;
  color: var(--text-secondary);
  font-size: 0.85rem;
}

/* Fila especial vacaciones */
.fila-vacaciones::after {
  left: 1.5rem !important;
}

.vac-icon-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--cal-vacaciones-from);
  box-shadow: 0 0 6px var(--cal-vacaciones-from);
  flex-shrink: 0;
  margin-left: 0.4rem;
}

.vac-texto {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}

.vac-fechas {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-primary);
}

.vac-dias {
  font-size: 0.75rem;
  color: var(--text-secondary);
}

.btn-eliminar-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  background-color: rgba(239, 68, 68, 0.12);
  border: 1px solid #ef4444;
  color: #fca5a5;
  padding: 0.6rem 0.8rem;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  font-family: inherit;
  font-size: 0.8rem;
  width: auto;
  min-width: 90px;
}

.btn-eliminar-row:active {
  background-color: rgba(239, 68, 68, 0.22);
}

.btn-eliminar-icon {
  width: 18px;
  height: 18px;
}

/* Switch iOS */
.switch {
  position: relative;
  display: inline-block;
  width: 48px;
  height: 28px;
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
  background-color: #3a3a3c;
  transition: .2s;
  border-radius: 34px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 22px;
  width: 22px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: .2s;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

input:checked + .slider {
  background-color: #34c759; /* iOS green */
}

input:checked + .slider:before {
  transform: translateX(20px);
}

/* BACKDROP & BOTTOM SHEET (iOS Sheet style) */
.backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  z-index: 100;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}

.bottom-sheet {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  max-width: 600px;
  margin: 0 auto;
  background-color: #1c1c1e; /* iOS Dark Sheet color */
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  z-index: 101;
  padding: 0.5rem 1.25rem 2rem 1.25rem;
  box-shadow: 0 -8px 30px rgba(0,0,0,0.5);
  box-sizing: border-box;
}

.sheet-handle-bar {
  display: flex;
  justify-content: center;
  padding: 0.35rem 0 0.75rem 0;
}

.sheet-handle-bar .handle {
  width: 36px;
  height: 5px;
  background-color: rgba(255, 255, 255, 0.15);
  border-radius: 3px;
}

.sheet-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.sheet-titulo {
  font-size: 1.05rem;
  font-weight: 700;
  color: #fff;
}

.sheet-btn-cancelar {
  background: none;
  border: none;
  color: #0a84ff; /* iOS Blue accent in dark mode */
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
}

.sheet-btn-guardar {
  background: none;
  border: none;
  color: #0a84ff;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
}

.sheet-body {
  display: flex;
  flex-direction: column;
}

.sheet-input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.sheet-body-help {
  font-size: 0.85rem;
  color: var(--text-secondary);
}

.sheet-input {
  background-color: #2c2c2e;
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: #fff;
  padding: 0.85rem 1rem;
  border-radius: 10px;
  font-size: 1rem;
  font-family: inherit;
  width: 100%;
  box-sizing: border-box;
}

.sheet-input:focus {
  outline: none;
  border-color: #0a84ff;
}

.input-date-native, .input-time-native {
  color-scheme: dark;
}

/* Formulario vacaciones */
.sheet-vacation-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.vac-input-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.vac-input-group label {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-secondary);
}

/* Transiciones */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active, .slide-up-leave-active {
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.slide-up-enter-from, .slide-up-leave-to {
  transform: translateY(100%);
}

.animate-slide-down {
  animation: slideDown 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes slideDown {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
