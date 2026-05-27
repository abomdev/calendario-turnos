import { differenceInDays, parseISO, startOfDay } from 'date-fns'
import { CICLO_BASE } from './turnos'

/**
 * Calcula el turno base de una fecha dado el inicio del ciclo.
 * @param {Date} fechaTarget - Fecha a consultar
 * @param {string} fechaInicioCicloStr - Fecha de inicio en formato YYYY-MM-DD
 * @returns {string|null} ID del turno base ('D', 'N', 'L') o null si no aplica
 */
export function obtenerTurnoBase(fechaTarget, fechaInicioCicloStr) {
  if (!fechaInicioCicloStr) return null
  
  const inicio = startOfDay(parseISO(fechaInicioCicloStr))
  const target = startOfDay(fechaTarget)
  
  const diff = differenceInDays(target, inicio)
  
  // Calcular el índice correctamente incluso si la diferencia es negativa
  const index = ((diff % CICLO_BASE.length) + CICLO_BASE.length) % CICLO_BASE.length
  
  return CICLO_BASE[index]
}
