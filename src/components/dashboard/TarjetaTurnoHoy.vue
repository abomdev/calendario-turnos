<template>
  <div class="tarjeta-turno" :class="turno ? `shade-${turno.shade}` : ''">
    <div class="card-content">
      <div class="fecha-container">
        <div class="etiqueta-hoy">
          <span>HOY</span>
        </div>
        <span class="fecha">{{ fechaFormateada }}</span>
        <div v-if="feriadoHoy" class="feriado-badge">
          <svg class="icon-feriado" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="16" x2="12" y2="12"/>
            <line x1="12" y1="8" x2="12.01" y2="8"/>
          </svg>
          {{ feriadoHoy.nombre }}
        </div>
      </div>
      
      <div class="turno-info">
        <div v-if="turno" class="turno-icono">
          <!-- Sol para Turno Día / Extra Día -->
          <svg v-if="turno.id === 'D' || turno.id === 'ED'" viewBox="0 0 24 24" fill="none" class="icon-lg" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M8 22H16" />
            <path d="M5 19H19" />
            <path d="M2 16H22" />
            <path d="M10 6.34141C10.6256 6.12031 11.2987 6 12 6C15.3137 6 18 8.68629 18 12C18 13.5217 17.4335 14.911 16.5 15.9687H7.5C6.56645 14.911 6 13.5217 6 12C6 11.2987 6.12031 10.6256 6.34141 10" />
            <path d="M12 2V3" />
            <path d="M22 12L21 12" />
            <path d="M3 12L2 12" />
            <path d="M19.0708 4.92969L18.678 5.32252" />
            <path d="M5.32178 5.32227L4.92894 4.92943" />
          </svg>
          
          <!-- Luna para Turno Noche / Extra Noche -->
          <svg v-else-if="turno.id === 'N' || turno.id === 'EN'" viewBox="0 0 24 24" fill="none" class="icon-lg" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21.25 12C21.25 17.11 17.11 21.25 12 21.25C6.89 21.25 2.75 17.11 2.75 12C2.75 6.89 6.89 2.75 12 2.75"/>
            <path d="M15.5 14.25C12.32 14.25 9.75 11.68 9.75 8.5C9.75 6.41 10.86 4.58 12.53 3.57"/>
          </svg>
          
          <!-- Descanso / Té -->
          <img v-else-if="turno.id === 'L'" src="/tea.svg" alt="Descanso" class="icon-lg icon-img" />
          
          <!-- Vacaciones / Dormir -->
          <img v-else-if="turno.id === 'V'" src="/sleeping.svg" alt="Vacaciones" class="icon-lg icon-img" />

          <!-- Badge de extra -->
          <div v-if="turno.id === 'ED' || turno.id === 'EN'" class="badge-extra"></div>
        </div>
        <div v-else class="turno-icono">
          <HelpCircle class="icon-lg" />
        </div>

        <div class="turno-texto">
          <div class="turno-header-row">
            <h2 class="turno-nombre">{{ turno ? turno.nombre : 'Sin configurar' }}</h2>
          </div>
          <p v-if="!turno" class="turno-desc">Configura el inicio del ciclo</p>
        </div>
      </div>
      
      <!-- Próximo turno incrustado al final de la tarjeta -->
      <ProximoTurno v-if="proximoInfo" :proximoInfo="proximoInfo" variant="inline" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { HelpCircle } from '@lucide/vue'
import { getFeriado } from '@/utils/feriados'
import ProximoTurno from './ProximoTurno.vue'

defineProps({
  turno: {
    type: Object,
    default: null
  },
  proximoInfo: {
    type: Object,
    default: null
  }
})

const fechaFormateada = computed(() => {
  return format(new Date(), "EEEE d 'de' MMMM", { locale: es })
})

const feriadoHoy = computed(() => getFeriado(new Date()))

function getDescripcion(id) {
  const desc = {
    'D': 'Turno base diurno',
    'N': 'Turno base nocturno',
    'L': 'Día libre de descanso',
    'ED': 'Turno extra agregado manualmente',
    'EN': 'Turno extra agregado manualmente',
    'V': 'Estás de vacaciones'
  }
  return desc[id] || ''
}
</script>

<style scoped>
.tarjeta-turno {
  position: relative;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-ios-card);
  padding: 1.5rem;
  overflow: hidden;
  box-shadow: var(--shadow-ios);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

.card-content {
  position: relative;
  z-index: 2;
}

.fecha-container {
  display: flex;
  flex-direction: column;
  margin-bottom: 1.25rem;
}

.etiqueta-hoy {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 1.5px;
  color: var(--text-secondary);
  margin-bottom: 0.15rem;
}

.dot-hoy {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #3d79f2; /* iOS Blue */
}

.shade-dia .dot-hoy {
  background-color: var(--cal-dia-to);
}

.shade-noche .dot-hoy {
  background-color: var(--cal-noche-from);
}

.shade-vacaciones .dot-hoy {
  background-color: var(--cal-vacaciones-from);
}

.fecha {
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--text-primary);
  text-transform: capitalize;
}

.feriado-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  margin-top: 0.6rem;
  align-self: flex-start;
  background: var(--cal-feriado-bg);
  border: 1px solid rgba(232, 184, 74, 0.4);
  padding: 0.35rem 0.75rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--cal-feriado);
  letter-spacing: 0.1px;
}

.icon-feriado {
  width: 14px;
  height: 14px;
}

.turno-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.turno-icono {
  width: 46px;
  height: 46px;
  border-radius: var(--radius-ios-inner);
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: var(--text-primary);
  flex-shrink: 0;
  position: relative;
  overflow: hidden;
}

.shade-dia .turno-icono {
  background: linear-gradient(135deg, var(--cal-dia-from), var(--cal-dia-to));
  border-color: rgba(255, 179, 161, 0.2);
  color: #fff;
}

.shade-noche .turno-icono {
  background: linear-gradient(135deg, var(--cal-noche-from), var(--cal-noche-to));
  border-color: rgba(155, 102, 255, 0.2);
  color: #fff;
}

.shade-vacaciones .turno-icono {
  background: linear-gradient(135deg, var(--cal-vacaciones-from), var(--cal-vacaciones-to));
  border-color: rgba(45, 212, 160, 0.2);
  color: #fff;
}

.shade-descanso .turno-icono {
  background: rgba(255, 255, 255, 0.06);
  border: 1px dashed rgba(255, 255, 255, 0.2);
}

.icon-lg {
  width: 22px;
  height: 22px;
}

.icon-img {
  object-fit: contain;
}

.turno-texto {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.turno-header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}

.turno-nombre {
  font-size: 1.35rem;
  font-weight: 700;
  margin: 0;
  color: var(--text-primary);
  letter-spacing: -0.2px;
}

.turno-chip {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: var(--text-secondary);
}

.chip-dia {
  background-color: var(--cal-dia-from);
  box-shadow: 0 0 8px var(--cal-dia-from);
}

.chip-noche {
  background-color: var(--cal-noche-from);
  box-shadow: 0 0 8px var(--cal-noche-from);
}

.chip-vacaciones {
  background-color: var(--cal-vacaciones-from);
  box-shadow: 0 0 8px var(--cal-vacaciones-from);
}

.chip-descanso {
  background-color: #fff;
  opacity: 0.6;
}

.turno-desc {
  font-size: 0.85rem;
  color: var(--text-secondary);
  margin-top: 0.1rem;
  margin-bottom: 0;
}

/* Badge de extra — esquina inferior derecha */
.badge-extra {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 0;
  height: 0;
  border-bottom: 14px solid rgba(255, 255, 255, 0.35);
  border-left: 14px solid transparent;
}
</style>
