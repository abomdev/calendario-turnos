<template>
  <main class="calendario-view">
    <header class="header">
      <h1>Calendario</h1>
    </header>

    <PanelBienvenida v-if="!configStore.fechaInicioCiclo" />

    <template v-else>


      <CalendarioMensual 
        v-model:mesActual="mesActual"
        @seleccionar-dia="abrirModal"
      />

      <LeyendaColores />

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
import LeyendaColores from '@/components/calendar/LeyendaColores.vue'
import PanelBienvenida from '@/components/dashboard/PanelBienvenida.vue'

const configStore = useConfigStore()

const mesActual = ref(new Date())
const modalVisible = ref(false)
const diaSeleccionado = ref(null)



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
  font-size: 2rem;
  font-weight: 800;
  letter-spacing: -0.5px;
  margin: 0;
  color: var(--text-primary);
}

</style>
