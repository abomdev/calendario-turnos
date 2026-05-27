import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useConfigStore = defineStore('config', () => {
  const nombre = ref('')
  const fechaInicioCiclo = ref('') // Formato YYYY-MM-DD
  const horaNotificacion = ref('20:00')
  const notificacionesActivas = ref(false)

  return {
    nombre,
    fechaInicioCiclo,
    horaNotificacion,
    notificacionesActivas
  }
}, {
  persist: true
})
