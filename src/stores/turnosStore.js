import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTurnosStore = defineStore('turnos', () => {
  // Mapa de fecha YYYY-MM-DD a ID de turno extra ('ED' o 'EN')
  const turnosExtra = ref({})
  
  // Lista de periodos de vacaciones { id, inicio, fin } (inicio/fin son YYYY-MM-DD)
  const vacaciones = ref([])

  function setTurnoExtra(fechaStr, tipoTurnoId) {
    turnosExtra.value[fechaStr] = tipoTurnoId
  }

  function removeTurnoExtra(fechaStr) {
    delete turnosExtra.value[fechaStr]
  }

  function addVacaciones(inicio, fin) {
    const nuevoPeriodo = {
      id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36) + Math.random().toString(36).substring(2, 5),
      inicio,
      fin
    }
    vacaciones.value.push(nuevoPeriodo)
  }

  function removeVacaciones(id) {
    vacaciones.value = vacaciones.value.filter(v => v.id !== id)
  }

  return {
    turnosExtra,
    vacaciones,
    setTurnoExtra,
    removeTurnoExtra,
    addVacaciones,
    removeVacaciones
  }
}, {
  persist: true
})
