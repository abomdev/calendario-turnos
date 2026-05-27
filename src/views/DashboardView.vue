<template>
  <main class="dashboard-view">
    <header class="header">
      <div class="saludo">
        <p class="saludo-texto">{{ saludoDinamico }}</p>
        <h1 class="titulo">Tu turno de hoy</h1>
      </div>
    </header>

    <div v-if="!configStore.fechaInicioCiclo" class="alert-config">
      <p>Aún no has configurado tu ciclo de turnos.</p>
      <RouterLink to="/configuracion" class="btn-config">Configurar ahora</RouterLink>
    </div>

    <div v-else class="contenido">
      <TarjetaTurnoHoy :turno="turnoHoy" />
      <StripSemanal />
      <ProximoTurno v-if="proximoTurno" :proximoInfo="proximoTurno" />
    </div>
  </main>
</template>

<script setup>
import { computed } from 'vue'
import { useConfigStore } from '@/stores/configStore'
import { useTurnos } from '@/composables/useTurnos'
import TarjetaTurnoHoy from '@/components/dashboard/TarjetaTurnoHoy.vue'
import StripSemanal from '@/components/dashboard/StripSemanal.vue'
import ProximoTurno from '@/components/dashboard/ProximoTurno.vue'

const configStore = useConfigStore()
const { getTurnoHoy, getProximoTurno } = useTurnos()

const turnoHoy = computed(() => getTurnoHoy())
const proximoTurno = computed(() => getProximoTurno())

const saludoDinamico = computed(() => {
  const hora = new Date().getHours()
  let saludo = '¡Hola!'
  if (hora >= 6 && hora < 12) {
    saludo = 'Buenos días'
  } else if (hora >= 12 && hora < 20) {
    saludo = 'Buenas tardes'
  } else {
    saludo = 'Buenas noches'
  }
  return `${saludo}${configStore.nombre ? ', ' + configStore.nombre : ''}`
})
</script>

<style scoped>
.dashboard-view {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-bottom: 5rem; /* Evitar que el nav tape el contenido */
}

.header .saludo-texto {
  color: var(--text-secondary);
  font-size: 1rem;
  margin-bottom: 0.25rem;
}

.header .titulo {
  color: var(--text-primary);
  font-size: 1.75rem;
  font-weight: 700;
}

.contenido {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
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
  transition: opacity 0.2s;
}

.btn-config:active {
  opacity: 0.8;
}
</style>
