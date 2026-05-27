<template>
  <div v-if="visible" class="modal-overlay" @click.self="cerrar">
    <div class="modal-content">
      <div class="modal-header">
        <h3>{{ fechaFormateada }}</h3>
        <button class="btn-close" @click="cerrar">
          <X class="icon" />
        </button>
      </div>

      <div class="turno-base-info" v-if="esVacaciones">
        <p class="etiqueta">ESTADO DEL DÍA</p>
        <div class="turno-badge vacaciones-badge">
          🌴 Vacaciones
        </div>
        <p class="vacaciones-msg">Este día está programado como vacaciones. Puedes gestionar tus periodos de vacaciones en la pestaña de Configuración.</p>
      </div>

      <template v-else>
        <div class="turno-base-info" v-if="turnoBase">
          <p class="etiqueta">TURNO BASE (CICLO)</p>
          <div class="turno-badge" :style="{ backgroundColor: turnoBase.color, color: (turnoBase.id === 'D' || turnoBase.id === 'ED') ? 'var(--bg-color)' : '#fff' }">
            {{ turnoBase.nombre }}
          </div>
        </div>
        <div class="turno-base-info" v-else>
          <p class="etiqueta">TURNO BASE (CICLO)</p>
          <div class="turno-badge sin-asignar">No configurado</div>
        </div>

        <div class="opciones-extra">
          <p class="etiqueta">SOBRESCRIBIR CON EXTRA</p>
          
          <div class="botones-grid">
            <button 
              class="btn-extra" 
              :class="{ active: turnoExtraId === 'ED' }"
              @click="seleccionarExtra('ED')"
            >
              Extra Día
            </button>
            
            <button 
              class="btn-extra" 
              :class="{ active: turnoExtraId === 'EN' }"
              @click="seleccionarExtra('EN')"
            >
              Extra Noche
            </button>
            
            <button 
              class="btn-extra btn-quitar" 
              v-if="turnoExtraId"
              @click="quitarExtra"
            >
              Quitar Extra
            </button>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { X } from '@lucide/vue'
import { useTurnosStore } from '@/stores/turnosStore'
import { useConfigStore } from '@/stores/configStore'
import { obtenerTurnoBase } from '@/utils/generadorCiclo'
import { TIPOS_TURNO } from '@/utils/turnos'

const props = defineProps({
  visible: Boolean,
  fecha: Date
})

const emit = defineEmits(['close'])

const turnosStore = useTurnosStore()
const configStore = useConfigStore()

const fechaFormateada = computed(() => {
  if (!props.fecha) return ''
  return format(props.fecha, "EEEE d 'de' MMMM, yyyy", { locale: es })
})

const fechaStr = computed(() => {
  if (!props.fecha) return ''
  return format(props.fecha, 'yyyy-MM-dd')
})

const esVacaciones = computed(() => {
  if (!fechaStr.value) return false
  return turnosStore.vacaciones.some(v => {
    return fechaStr.value >= v.inicio && fechaStr.value <= v.fin
  })
})

const turnoBase = computed(() => {
  if (!props.fecha || !configStore.fechaInicioCiclo) return null
  const baseId = obtenerTurnoBase(props.fecha, configStore.fechaInicioCiclo)
  return TIPOS_TURNO[baseId]
})

const turnoExtraId = computed(() => {
  if (!fechaStr.value) return null
  return turnosStore.turnosExtra[fechaStr.value]
})

function cerrar() {
  emit('close')
}

function seleccionarExtra(id) {
  turnosStore.setTurnoExtra(fechaStr.value, id)
  cerrar()
}

function quitarExtra() {
  turnosStore.removeTurnoExtra(fechaStr.value)
  cerrar()
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  z-index: 100;
  display: flex;
  align-items: flex-end;
}

.modal-content {
  background-color: var(--bg-card);
  width: 100%;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  padding: 1.5rem;
  padding-bottom: 3rem; /* padding extra for bottom nav if overlapping */
  box-shadow: 0 -10px 25px rgba(0,0,0,0.5);
  animation: slideUp 0.3s ease-out;
}

@keyframes slideUp {
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.modal-header h3 {
  font-size: 1.25rem;
  margin: 0;
  text-transform: capitalize;
}

.btn-close {
  background: none;
  border: none;
  color: var(--text-primary);
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: var(--color-primary-light);
}

.etiqueta {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 1px;
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
}

.turno-base-info {
  margin-bottom: 1.5rem;
  padding: 1rem;
  background-color: var(--bg-card);
  border: 1px solid var(--color-primary-light);
  border-radius: 12px;
}

.turno-badge {
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-weight: 600;
  color: white;
}

.turno-badge.sin-asignar {
  background-color: var(--color-sin-asignar);
  color: var(--text-primary);
}

.opciones-extra {
  margin-top: 1.5rem;
}

.botones-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.btn-extra {
  background-color: var(--bg-card);
  border: 1px solid var(--color-primary-light);
  color: var(--text-primary);
  padding: 1rem;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-extra:nth-child(1) {
  /* Extra Dia */
}
.btn-extra:nth-child(1).active {
  background-color: var(--text-primary);
  border-color: var(--text-primary);
  color: #ffffff;
}

.btn-extra:nth-child(2) {
  /* Extra Noche */
}
.btn-extra:nth-child(2).active {
  background-color: var(--text-primary);
  border-color: var(--text-primary);
  color: #ffffff;
}

.btn-quitar {
  grid-column: 1 / -1;
  background-color: transparent;
  border-color: #ef4444;
  color: #ef4444;
}

.btn-quitar:active {
  background-color: rgba(239, 68, 68, 0.1);
}

.vacaciones-badge {
  background-color: var(--color-vacaciones);
  color: white;
}

.vacaciones-msg {
  font-size: 0.85rem;
  color: var(--text-secondary);
  margin-top: 0.75rem;
  line-height: 1.4;
}
</style>
