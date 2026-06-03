<template>
  <div class="strip-semanal">
    <div class="header-semana">
      <h3>ESTA SEMANA</h3>
    </div>

    <div class="strip-grid">
      <div 
        v-for="dia in diasSemana" 
        :key="dia.fechaStr"
        class="dia-col"
      >
        <span class="dia-nombre" :class="{ 'es-hoy': dia.esHoy }">{{ dia.nombre }}</span>

        <div 
          class="dia-card"
          :class="[
            dia.esHoy ? 'is-today' : '',
            dia.turno ? `shade-${dia.turno.shade}` : ''
          ]"
          :title="dia.turno?.nombre"
        >
          <!-- Icono de turno superior -->
          <div class="turno-icon" v-if="dia.turno">
            <template v-if="dia.turno.id !== 'L'">
              <!-- Día / Extra Día -->
              <svg v-if="dia.turno.id === 'D' || dia.turno.id === 'ED'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <path d="M8 22H16M5 19H19M2 16H22"/>
                <path d="M10 6.34C10.63 6.12 11.3 6 12 6C15.31 6 18 8.69 18 12C18 13.52 17.43 14.91 16.5 15.97H7.5C6.57 14.91 6 13.52 6 12C6 11.3 6.12 10.63 6.34 10"/>
                <path d="M12 2V3M22 12H21M3 12H2M19.07 4.93L18.68 5.32M5.32 5.32L4.93 4.93"/>
              </svg>
              <!-- Noche / Extra Noche -->
              <svg v-else-if="dia.turno.id === 'N' || dia.turno.id === 'EN'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21.25 12C21.25 17.11 17.11 21.25 12 21.25C6.89 21.25 2.75 17.11 2.75 12C2.75 6.89 6.89 2.75 12 2.75"/>
                <path d="M15.5 14.25C12.32 14.25 9.75 11.68 9.75 8.5C9.75 6.41 10.86 4.58 12.53 3.57"/>
              </svg>
              <!-- Vacaciones -->
              <img v-else-if="dia.turno.id === 'V'" src="/sleeping.svg" alt="Vacaciones" />
            </template>
            <!-- Descanso usa tea.svg -->
            <template v-else-if="dia.turno.id === 'L'">
              <img src="/tea.svg" alt="Descanso" />
            </template>
          </div>
          <div class="turno-icon-vacio" v-else></div>

          <!-- Número inferior -->
          <span class="dia-numero">{{ dia.numero }}</span>

          <!-- Badge de extra -->
          <div v-if="dia.turno && (dia.turno.id === 'ED' || dia.turno.id === 'EN')" class="badge-extra"></div>
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
    
    // Nombres cortos LU, MA, MI...
    let nombreCorto = format(fecha, 'eeeeee', { locale: es })
    if (nombreCorto.length > 2) {
      nombreCorto = nombreCorto.substring(0, 2)
    }

    return {
      fechaStr,
      nombre: nombreCorto,
      numero: format(fecha, 'd'),
      turno,
      esHoy: esHoyVal
    }
  })
})
</script>

<style scoped>
.strip-semanal {
  background-color: var(--bg-card);
  border-radius: var(--radius-ios-card);
  padding: 1.25rem 1rem;
  border: 1px solid var(--glass-border);
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.header-semana h3 {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 1.2px;
  text-transform: uppercase;
  color: var(--text-secondary);
  margin: 0;
}

.strip-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
}

.dia-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
}

.dia-nombre {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--text-secondary);
}

.dia-nombre.es-hoy {
  color: #fff;
  font-weight: 700;
}

.dia-card {
  width: 100%;
  aspect-ratio: 1 / 1.5;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  background-color: transparent;
  border: 1px dashed rgba(255, 255, 255, 0.15);
  color: var(--text-secondary);
  transition: transform 0.2s ease;
  position: relative;
  overflow: hidden;
}

/* "Hoy" - Borde blanco brillante */
.dia-card.is-today {
  box-shadow: inset 0 0 0 2px #fff;
  border-color: transparent !important;
}

/* Día — tonos cálidos */
.dia-card.shade-dia {
  background: linear-gradient(155deg, var(--cal-dia-from) 0%, var(--cal-dia-mid) 52%, var(--cal-dia-to) 100%);
  border: 1px solid rgba(255, 179, 161, 0.35);
  color: #fff;
}

/* Noche — tonos fríos */
.dia-card.shade-noche {
  background: linear-gradient(155deg, var(--cal-noche-from) 0%, var(--cal-noche-mid) 48%, var(--cal-noche-to) 100%);
  border: 1px solid rgba(155, 102, 255, 0.35);
  color: #fff;
}

/* Descanso */
.dia-card.shade-descanso {
  background-color: transparent;
  border: 1px dashed rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.5);
}

/* Vacaciones */
.dia-card.shade-vacaciones {
  background: linear-gradient(155deg, var(--cal-vacaciones-from) 0%, var(--cal-vacaciones-to) 100%);
  border: 1px solid rgba(45, 212, 160, 0.4);
  color: #fff;
}

.turno-icon {
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.turno-icon svg, .turno-icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.turno-icon-vacio {
  width: 16px;
  height: 16px;
}

.dia-numero {
  font-size: 1.1rem;
  font-weight: 700;
  line-height: 1;
}

/* Badge de extra — esquina inferior derecha */
.badge-extra {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 0;
  height: 0;
  border-bottom: 12px solid rgba(255, 255, 255, 0.35);
  border-left: 12px solid transparent;
}
</style>
