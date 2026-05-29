<template>
  <main class="calendario-view">
    <header class="header">
      <h1>Calendario</h1>
    </header>

    <div v-if="!configStore.fechaInicioCiclo" class="alert-config">
      <p>Configura la fecha de inicio del ciclo para ver tus turnos.</p>
      <RouterLink to="/configuracion" class="btn-config">Ir a Configuración</RouterLink>
    </div>

    <template v-else>
      <div class="leyenda">
        <div class="item-leyenda" v-for="(tipo, key) in tiposBase" :key="key">
          <span class="color-dot" :class="`dot-${tipo.shade}`"></span>
          <span>{{ tipo.nombre }}</span>
        </div>
        <div class="item-leyenda">
          <span class="color-dot" :style="{ backgroundColor: 'var(--color-vacaciones)' }"></span>
          <span>Vacaciones</span>
        </div>
        <div class="item-leyenda">
          <span class="color-dot dot-feriado"></span>
          <span>Feriado</span>
        </div>
        <div class="item-leyenda">
          <span class="color-dot extra-dot"></span>
          <span>Turno Extra</span>
        </div>
      </div>

      <CalendarioMensual 
        v-model:mesActual="mesActual"
        @seleccionar-dia="abrirModal"
      />

      <ModalAsignarTurno 
        :visible="modalVisible"
        :fecha="diaSeleccionado"
        @close="cerrarModal"
      />
    </template>
  </main>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useConfigStore } from '@/stores/configStore'
import CalendarioMensual from '@/components/calendar/CalendarioMensual.vue'
import ModalAsignarTurno from '@/components/modals/ModalAsignarTurno.vue'
import { TIPOS_TURNO } from '@/utils/turnos'

const configStore = useConfigStore()

const mesActual = ref(new Date())
const modalVisible = ref(false)
const diaSeleccionado = ref(null)

const tiposBase = computed(() => {
  return {
    D: TIPOS_TURNO['D'],
    N: TIPOS_TURNO['N'],
    L: TIPOS_TURNO['L']
  }
})

function abrirModal(fecha) {
  diaSeleccionado.value = fecha
  modalVisible.value = true
}

function cerrarModal() {
  modalVisible.value = false
  diaSeleccionado.value = null
}
</script>

<style src="@/components/calendar/calendar-theme.css"></style>

<style scoped>
.calendario-view {
  padding: 1.5rem 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.header h1 {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
}

.leyenda {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  background-color: var(--bg-card);
  border: 1px solid var(--color-primary-light);
  padding: 0.75rem 1rem;
  border-radius: 12px;
  font-size: 0.8rem;
  color: var(--text-secondary);
}

.item-leyenda {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.color-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
  flex-shrink: 0;
}

.color-dot.dot-dia {
  background: linear-gradient(135deg, var(--cal-dia-from), var(--cal-dia-to));
}

.color-dot.dot-noche {
  background: linear-gradient(135deg, var(--cal-noche-from), var(--cal-noche-to));
}

.color-dot.dot-descanso {
  background: transparent;
  border: 1.5px dashed #555;
}

.color-dot.dot-feriado {
  background-color: var(--cal-feriado);
  border-radius: 4px;
}

.extra-dot {
  background-color: var(--text-secondary);
  border-radius: 0;
  clip-path: polygon(100% 0, 0% 100%, 100% 100%);
  width: 12px;
  height: 12px;
}

.alert-config {
  background-color: var(--color-primary-light);
  border: 1px dashed #555;
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.btn-config {
  background-color: var(--text-primary);
  color: var(--bg-color);
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
}
</style>
