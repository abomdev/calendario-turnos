<template>
  <main class="dashboard-view">
    <header class="header">
      <div class="saludo">
        <template v-if="configStore.nombre">
          <p class="saludo-sub">Bienvenido/a</p>
          <h1 class="saludo-nombre">{{ configStore.nombre }}</h1>
        </template>
        <template v-else>
          <h1 class="saludo-nombre">Bienvenido/a</h1>
        </template>
      </div>
    </header>

    <PanelBienvenida v-if="!configStore.fechaInicioCiclo" />

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
import PanelBienvenida from '@/components/dashboard/PanelBienvenida.vue'

const configStore = useConfigStore()
const { getTurnoHoy, getProximoTurno } = useTurnos()

const turnoHoy = computed(() => getTurnoHoy())
const proximoTurno = computed(() => getProximoTurno())


</script>

<style src="@/components/calendar/calendar-theme.css"></style>

<style scoped>
.dashboard-view {
  padding: 1.5rem 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.header {
  padding-top: 0.5rem;
  padding-bottom: 0.25rem;
}

.saludo-sub {
  color: var(--text-secondary);
  font-size: 0.9rem;
  font-weight: 300;
  margin-bottom: 0.15rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.saludo-nombre {
  font-size: 2rem;
  font-weight: 800;
  color: var(--text-primary);
  line-height: 1.15;
  letter-spacing: -0.5px;
  margin: 0;
}

.contenido {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

</style>
