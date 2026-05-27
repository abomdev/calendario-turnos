import { useConfigStore } from '@/stores/configStore'
import { useTurnosStore } from '@/stores/turnosStore'
import { obtenerTurnoBase } from '@/utils/generadorCiclo'
import { TIPOS_TURNO } from '@/utils/turnos'
import { format, addDays, isBefore, startOfDay } from 'date-fns'

export function useTurnos() {
  const configStore = useConfigStore()
  const turnosStore = useTurnosStore()

  /**
   * Obtiene el turno efectivo para una fecha dada (base o extra)
   * @param {Date} fecha 
   * @returns {Object|null} Objeto del tipo de turno o null
   */
  function getTurnoEfectivo(fecha) {
    if (!configStore.fechaInicioCiclo) return null

    const fechaStr = format(fecha, 'yyyy-MM-dd')
    
    // 1. Revisar si la fecha está dentro de algún período de vacaciones (máxima prioridad)
    const esVacaciones = turnosStore.vacaciones.some(v => {
      return fechaStr >= v.inicio && fechaStr <= v.fin
    })
    if (esVacaciones) {
      return TIPOS_TURNO.V
    }

    // 2. Revisar si hay un turno extra asignado para esta fecha
    const extraId = turnosStore.turnosExtra[fechaStr]
    if (extraId && TIPOS_TURNO[extraId]) {
      return TIPOS_TURNO[extraId]
    }

    // 3. Si no hay extra ni vacaciones, calcular el turno base del ciclo
    const baseId = obtenerTurnoBase(fecha, configStore.fechaInicioCiclo)
    if (baseId && TIPOS_TURNO[baseId]) {
      return TIPOS_TURNO[baseId]
    }

    return null
  }

  /**
   * Obtiene el turno del día de hoy
   * @returns {Object|null}
   */
  function getTurnoHoy() {
    return getTurnoEfectivo(new Date())
  }

  /**
   * Busca el próximo turno que sea diferente al de hoy, o simplemente el próximo turno
   * de trabajo (ignorando descansos y vacaciones).
   * @returns {Object} { fecha, turno }
   */
  function getProximoTurno() {
    if (!configStore.fechaInicioCiclo) return null
    
    let fechaActual = startOfDay(new Date())
    
    // Buscamos hasta 30 días en el futuro para encontrar un turno de trabajo
    for (let i = 1; i <= 30; i++) {
      const fechaFutura = addDays(fechaActual, i)
      const turnoFuturo = getTurnoEfectivo(fechaFutura)
      
      if (turnoFuturo && turnoFuturo.id !== 'L' && turnoFuturo.id !== 'V') {
        return {
          fecha: fechaFutura,
          turno: turnoFuturo
        }
      }
    }
    
    return null
  }

  return {
    getTurnoEfectivo,
    getTurnoHoy,
    getProximoTurno
  }
}
