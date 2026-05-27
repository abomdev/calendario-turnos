<template>
  <button 
    class="dia-turno" 
    :class="[
      esHoy && 'is-today',
      !esMesActual && 'is-other-month',
      tieneExtra && 'has-extra',
      turno && `shade-${turno.shade}`
    ]"
    @click="$emit('seleccionar', fecha)"
  >
    <span class="dia-numero">{{ numeroDia }}</span>

    <!-- Icono de turno: sol o luna SVG -->
    <span v-if="turno" class="turno-icon">
      <!-- Día -->
      <svg v-if="turno.id === 'D' || turno.id === 'ED'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
        <path d="M8 22H16M5 19H19M2 16H22"/>
        <path d="M10 6.34C10.63 6.12 11.3 6 12 6C15.31 6 18 8.69 18 12C18 13.52 17.43 14.91 16.5 15.97H7.5C6.57 14.91 6 13.52 6 12C6 11.3 6.12 10.63 6.34 10"/>
        <path d="M12 2V3M22 12H21M3 12H2M19.07 4.93L18.68 5.32M5.32 5.32L4.93 4.93"/>
      </svg>
      <!-- Noche -->
      <svg v-else-if="turno.id === 'N' || turno.id === 'EN'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
        <path d="M13.5 8H16.5L13.5 11H16.5M18 2H22L18 6H22"/>
        <path d="M21.25 12C21.25 17.11 17.11 21.25 12 21.25C6.89 21.25 2.75 17.11 2.75 12C2.75 6.89 6.89 2.75 12 2.75C11.91 2.75 11.81 2.71 11.73 2.63C11.65 2.55 11.65 2.36 11.76 2.29C9.66 3.56 8.25 5.87 8.25 8.5C8.25 12.5 11.5 15.75 15.5 15.75C17.59 15.75 19.42 14.86 20.68 13.44C21.71 12.28 21.25 12 21.25 12Z" fill="currentColor" opacity="0.3"/>
        <path d="M21.25 12C21.25 17.11 17.11 21.25 12 21.25C6.89 21.25 2.75 17.11 2.75 12C2.75 6.89 6.89 2.75 12 2.75"/>
        <path d="M15.5 14.25C12.32 14.25 9.75 11.68 9.75 8.5C9.75 6.41 10.86 4.58 12.53 3.57"/>
      </svg>
      <!-- Vacaciones -->
      <svg v-else-if="turno.id === 'V'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
        <path d="M17.5 8C17.5 8 19 9.5 19 11.5C19 13.5 17.5 15 17.5 15"/>
        <path d="M6.5 8C6.5 8 5 9.5 5 11.5C5 13.5 6.5 15 6.5 15"/>
        <circle cx="12" cy="12" r="3"/>
        <path d="M12 3V5M12 19V21M3 12H5M19 12H21"/>
      </svg>
    </span>

    <div v-if="tieneExtra" class="badge-extra"></div>
  </button>
</template>

<script setup>
import { computed } from 'vue'
import { isToday, isSameMonth, format } from 'date-fns'

const props = defineProps({
  fecha:      { type: Date,    required: true },
  mesActual:  { type: Date,    required: true },
  turno:      { type: Object,  default: null  },
  tieneExtra: { type: Boolean, default: false }
})

defineEmits(['seleccionar'])

const numeroDia  = computed(() => format(props.fecha, 'd'))
const esHoy      = computed(() => isToday(props.fecha))
const esMesActual = computed(() => isSameMonth(props.fecha, props.mesActual))
</script>

<style scoped>
.dia-turno {
  aspect-ratio: 1;
  border-radius: 8px;
  border: 1px solid var(--color-primary-light);
  background-color: var(--bg-card);
  color: var(--text-primary);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
  padding: 2px;
  gap: 1px;
  transition: transform 0.1s;
  overflow: hidden;
}

.dia-turno:active { transform: scale(0.93); }

.dia-turno.is-other-month { opacity: 0.25; }

/* "Hoy" — borde blanco nítido */
.dia-turno.is-today {
  box-shadow: inset 0 0 0 2px var(--text-primary);
}

/* ── Shade classes: sólo tonos de gris ── */
/* Día → ligeramente más claro que la tarjeta base */
.dia-turno.shade-dia {
  background-color: #323232;
}

/* Noche → más oscuro, casi negro */
.dia-turno.shade-noche {
  background-color: #1a1a1a;
  border-color: #3a3a3a;
}

/* Descanso → borde punteado, fondo transparente */
.dia-turno.shade-descanso {
  background-color: transparent;
  border-style: dashed;
  border-color: #444;
  opacity: 0.6;
}

/* Vacaciones → rayas diagonales sutiles */
.dia-turno.shade-vacaciones {
  background-image: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 4px,
    rgba(255,255,255,0.04) 4px,
    rgba(255,255,255,0.04) 8px
  );
}

.dia-numero {
  font-size: 1.05rem;
  font-weight: 700;
  z-index: 1;
  line-height: 1;
}

.turno-icon {
  width: 14px;
  height: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  color: var(--text-secondary);
}

.turno-icon svg {
  width: 100%;
  height: 100%;
}

/* Día → ícono más brillante */
.shade-dia .turno-icon { color: var(--text-primary); }

/* Noche → ícono tenue */
.shade-noche .turno-icon { color: #666; }

/* Vacaciones → ícono visible */
.shade-vacaciones .turno-icon { color: var(--text-secondary); }

/* Badge de extra — esquina triangular blanca */
.badge-extra {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 0;
  height: 0;
  border-bottom: 12px solid rgba(255,255,255,0.25);
  border-left: 12px solid transparent;
}
</style>
