<template>
  <div class="strip-semanal">
    <div class="header-semana">
      <h3>Esta Semana</h3>
    </div>

    <div class="strip-grid">
      <div 
        v-for="dia in diasSemana" 
        :key="dia.fechaStr"
        class="dia-col"
        :class="{ 'es-hoy': dia.esHoy }"
      >
        <span class="dia-nombre">{{ dia.nombre }}</span>

        <div 
          class="dia-celda"
          :class="dia.turno ? `shade-${dia.turno.shade}` : 'shade-none'"
        >
          <svg v-if="dia.turno?.id === 'D' || dia.turno?.id === 'ED'"
            viewBox="0 0 24 24" fill="none" class="celda-icon"
            stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M8 22H16M5 19H19M2 16H22"/>
            <path d="M10 6.34C10.63 6.12 11.3 6 12 6C15.31 6 18 8.69 18 12C18 13.52 17.43 14.91 16.5 15.97H7.5C6.57 14.91 6 13.52 6 12C6 11.3 6.12 10.63 6.34 10"/>
            <path d="M12 2V3M22 12H21M3 12H2M19.07 4.93L18.68 5.32M5.32 5.32L4.93 4.93"/>
          </svg>
          <svg v-else-if="dia.turno?.id === 'N' || dia.turno?.id === 'EN'"
            viewBox="0 0 24 24" fill="none" class="celda-icon"
            stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21.25 12C21.25 17.11 17.11 21.25 12 21.25C6.89 21.25 2.75 17.11 2.75 12C2.75 6.89 6.89 2.75 12 2.75"/>
            <path d="M15.5 14.25C12.32 14.25 9.75 11.68 9.75 8.5C9.75 6.41 10.86 4.58 12.53 3.57"/>
          </svg>
          <img v-else-if="dia.turno?.id === 'L'" src="/tea.svg" alt="Descanso" class="celda-icon icon-img" />
          <img v-else-if="dia.turno?.id === 'V'" src="/sleeping.svg" alt="Vacaciones" class="celda-icon icon-img" />
          <span class="numero">{{ dia.numero }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { startOfWeek, addDays, format, isToday } from 'date-fns'
import { es } from 'date-fns/locale'
import { useTurnos } from '@/composables/useTurnos'

const { getTurnoEfectivo } = useTurnos()

const diasSemana = computed(() => {
  const inicioSemana = startOfWeek(new Date(), { weekStartsOn: 1 })
  return Array.from({ length: 7 }).map((_, index) => {
    const fecha       = addDays(inicioSemana, index)
    const fechaStr    = format(fecha, 'yyyy-MM-dd')
    const turno       = getTurnoEfectivo(fecha)
    const esHoyVal    = isToday(fecha)
    return {
      fechaStr,
      nombre: format(fecha, 'eeeeee', { locale: es }),
      numero: format(fecha, 'd'),
      turno,
      esHoy: esHoyVal
    }
  })
})
</script>

<style scoped>
.strip-semanal {
  background-color: var(--cal-bg-panel);
  border-radius: 12px;
  padding: 1.25rem 1rem;
  border: 1px solid rgba(155, 102, 255, 0.2);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.header-semana h3 {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--text-secondary);
  margin: 0;
}

.strip-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
}

.dia-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
}

.dia-nombre {
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--text-secondary);
}

.dia-col.es-hoy .dia-nombre {
  color: var(--text-primary);
  font-weight: 800;
}

.dia-celda {
  width: 100%;
  aspect-ratio: 0.75;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  border: 1px solid var(--color-primary-light);
  background-color: var(--bg-card);
  transition: transform 0.15s;
  box-sizing: border-box;
  color: var(--text-primary);
}

.es-hoy .dia-celda {
  box-shadow: inset 0 0 0 2px #fff;
}

.dia-celda.shade-dia {
  background: linear-gradient(155deg, var(--cal-dia-from) 0%, var(--cal-dia-mid) 52%, var(--cal-dia-to) 100%);
  border-color: rgba(255, 179, 161, 0.35);
  color: #fff;
}

.dia-celda.shade-noche {
  background: linear-gradient(155deg, var(--cal-noche-from) 0%, var(--cal-noche-mid) 48%, var(--cal-noche-to) 100%);
  border-color: rgba(155, 102, 255, 0.35);
  color: #fff;
}

.dia-celda.shade-descanso {
  background-color: transparent;
  border-style: dashed;
  border-color: #444;
  opacity: 0.7;
}

.dia-celda.shade-vacaciones {
  background-color: var(--bg-card);
  background-image: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 4px,
    rgba(255, 255, 255, 0.04) 4px,
    rgba(255, 255, 255, 0.04) 8px
  );
}

.dia-celda.shade-none {
  border-style: dashed;
  border-color: #2e2e2e;
  opacity: 0.4;
}

.celda-icon {
  width: 13px;
  height: 13px;
  flex-shrink: 0;
}

.shade-dia .celda-icon,
.shade-noche .celda-icon {
  filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.2));
}

.icon-img {
  object-fit: contain;
}

.numero {
  font-size: 0.88rem;
  font-weight: 700;
  line-height: 1;
}
</style>
