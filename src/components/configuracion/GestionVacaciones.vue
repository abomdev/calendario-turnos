<template>
  <div class="gestion-vacaciones">
    <div class="section-header">
      <Calendar class="icon-primary" />
      <h2>Períodos de Vacaciones</h2>
    </div>

    <!-- Formulario para agregar -->
    <form @submit.prevent="agregarPeriodo" class="form-agregar">
      <div class="fechas-row">
        <div class="input-group">
          <label for="vac-inicio">Inicio</label>
          <input 
            id="vac-inicio"
            type="date" 
            v-model="fechaInicio" 
            class="input"
            required
          />
        </div>
        <div class="input-group">
          <label for="vac-fin">Fin</label>
          <input 
            id="vac-fin"
            type="date" 
            v-model="fechaFin" 
            class="input"
            required
          />
        </div>
      </div>

      <button type="submit" class="btn-primary">
        <Plus class="icon-sm" />
        <span>Agregar Vacaciones</span>
      </button>
    </form>

    <!-- Listado de vacaciones -->
    <div class="lista-vacaciones" v-if="turnosStore.vacaciones.length > 0">
      <div 
        v-for="periodo in sortedVacaciones" 
        :key="periodo.id" 
        class="periodo-item"
      >
        <div class="periodo-info">
          <span class="fechas">
            {{ formatFecha(periodo.inicio) }} al {{ formatFecha(periodo.fin) }}
          </span>
          <span class="dias-count">
            ({{ calcularDias(periodo.inicio, periodo.fin) }} días)
          </span>
        </div>
        <button 
          @click="eliminarPeriodo(periodo.id)" 
          class="btn-eliminar"
          title="Eliminar período"
        >
          <Trash2 class="icon-sm" />
        </button>
      </div>
    </div>
    <p v-else class="empty-text">No tienes vacaciones programadas.</p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useTurnosStore } from '@/stores/turnosStore'
import { Calendar, Plus, Trash2 } from '@lucide/vue'
import { format, parseISO, differenceInDays } from 'date-fns'
import { es } from 'date-fns/locale'

const turnosStore = useTurnosStore()

const fechaInicio = ref('')
const fechaFin = ref('')

const sortedVacaciones = computed(() => {
  return [...turnosStore.vacaciones].sort((a, b) => b.inicio.localeCompare(a.inicio))
})

function formatFecha(fechaStr) {
  try {
    return format(parseISO(fechaStr), "d 'de' MMM, yyyy", { locale: es })
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

function agregarPeriodo() {
  if (!fechaInicio.value || !fechaFin.value) return

  if (fechaFin.value < fechaInicio.value) {
    alert('La fecha de fin no puede ser anterior a la de inicio.')
    return
  }

  turnosStore.addVacaciones(fechaInicio.value, fechaFin.value)
  fechaInicio.value = ''
  fechaFin.value = ''
}

function eliminarPeriodo(id) {
  if (confirm('¿Estás seguro de que quieres eliminar este período de vacaciones?')) {
    turnosStore.removeVacaciones(id)
  }
}
</script>

<style scoped>
.gestion-vacaciones {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.section-header h2 {
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0;
}

.icon-primary {
  color: var(--color-primary);
  width: 24px;
  height: 24px;
}

.form-agregar {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.fechas-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

@media (max-width: 480px) {
  .fechas-row {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.input-group label {
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--text-secondary);
}

.input {
  background-color: var(--bg-card);
  border: 1px solid var(--color-primary-light);
  color: var(--text-primary);
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-family: inherit;
  font-size: 1rem;
  width: 100%;
}

.btn-primary {
  background-color: var(--color-primary);
  border: none;
  color: var(--bg-color); /* Contrasta contra el amarillo primario */
  padding: 0.85rem;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: background-color 0.2s, transform 0.1s;
}

.btn-primary:active {
  transform: scale(0.98);
}

.icon-sm {
  width: 18px;
  height: 18px;
}

.lista-vacaciones {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.periodo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--color-primary-light);
  border-left: 4px solid var(--color-vacaciones);
  padding: 0.75rem 1rem;
  border-radius: 8px;
}

@media (max-width: 480px) {
  .periodo-item {
    padding: 0.65rem 0.75rem;
  }
  .fechas {
    font-size: 0.85rem;
  }
}

.periodo-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.fechas {
  font-size: 0.95rem;
  font-weight: 600;
}

.dias-count {
  font-size: 0.8rem;
  color: var(--text-secondary);
}

.btn-eliminar {
  background: none;
  border: none;
  color: #ef4444;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
}

.btn-eliminar:hover {
  background-color: rgba(239, 68, 68, 0.1);
}

.empty-text {
  font-size: 0.9rem;
  color: var(--text-secondary);
  text-align: center;
  margin: 1rem 0;
}
</style>
