<template>
  <main class="dashboard-view">
    <header class="header">
      <div class="saludo">
        <template v-if="configStore.nombre">
          <p class="saludo-sub">{{ saludoPeriodo }}</p>
          <h1 class="saludo-nombre">{{ configStore.nombre }}</h1>
        </template>
        <template v-else>
          <h1 class="saludo-nombre">{{ saludoPeriodo }}</h1>
        </template>
      </div>
    </header>

    <div v-if="!configStore.fechaInicioCiclo" class="alert-config">
      <p>Aún no has configurado tu ciclo de turnos.</p>
      <RouterLink to="/configuracion" class="btn-config">Configurar ahora</RouterLink>
    </div>

    <div v-else class="contenido">
      <TarjetaTurnoHoy :turno="turnoHoy" :proximoInfo="proximoTurno" />
      <StripSemanal />
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

const saludoPeriodo = computed(() => {
  const hora = new Date().getHours()
  if (hora >= 6 && hora < 12) {
    return 'Buenos días'
  } else if (hora >= 12 && hora < 20) {
    return 'Buenas tardes'
  } else {
    return 'Buenas noches'
  }
})
</script>

<style src="@/components/calendar/calendar-theme.css"></style>

<style scoped>
.dashboard-view {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
}

.header {
  padding-top: 0.5rem;
  padding-bottom: 0.25rem;
}

.saludo-sub {
  color: var(--text-secondary);
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 0.15rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.saludo-nombre {
  font-size: 2.25rem;
  font-weight: 800;
  color: var(--text-primary);
  line-height: 1.15;
  letter-spacing: -0.5px;
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
