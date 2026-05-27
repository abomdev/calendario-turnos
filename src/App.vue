<template>
  <div class="app-layout">
    <RouterView />
    <NavegacionInferior />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import NavegacionInferior from './components/ui/NavegacionInferior.vue'
import { useNotificaciones } from '@/composables/useNotificaciones'

const { iniciarObservador } = useNotificaciones()

onMounted(() => {
  iniciarObservador()
})
</script>

<style scoped>
.app-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
}

.app-layout > *:first-child {
  flex: 1;
  overflow-y: auto;
}
</style>
