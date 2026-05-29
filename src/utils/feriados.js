import { format } from 'date-fns'
import feriados2026 from '@/data/feriados2026.json'

const feriadosPorFecha = new Map(
  feriados2026.feriados.map((f) => [f.fecha, f])
)

/**
 * @param {Date | string} fecha
 * @returns {{ fecha: string, nombre: string, irrenunciable: boolean } | null}
 */
export function getFeriado(fecha) {
  if (!fecha) return null
  const fechaStr =
    typeof fecha === 'string' ? fecha : format(fecha, 'yyyy-MM-dd')
  return feriadosPorFecha.get(fechaStr) ?? null
}

export const ANIO_FERIADOS = feriados2026.anio
