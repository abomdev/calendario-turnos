<template>
  <div class="tarjeta-turno" :class="turno ? `shade-${turno.shade}` : ''">
    <div class="fecha-container">
      <span class="etiqueta">HOY</span>
      <span class="fecha">{{ fechaFormateada }}</span>
      <span v-if="feriadoHoy" class="feriado-hoy">{{ feriadoHoy.nombre }}</span>
    </div>
    
    <div class="turno-info">
      <div v-if="turno" class="turno-icono">
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
        
        <svg v-else-if="turno.id === 'N' || turno.id === 'EN'" viewBox="0 0 24 24" fill="none" class="icon-lg" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M13.5 8H16.5L13.5 11H16.5" />
          <path d="M18 2H22L18 6H22" />
          <path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25V22.75C17.9371 22.75 22.75 17.9371 22.75 12H21.25ZM2.75 12C2.75 6.89137 6.89137 2.75 12 2.75V1.25C6.06294 1.25 1.25 6.06294 1.25 12H2.75ZM15.5 14.25C12.3244 14.25 9.75 11.6756 9.75 8.5H8.25C8.25 12.5041 11.4959 15.75 15.5 15.75V14.25ZM20.4253 11.469C19.4172 13.1373 17.5882 14.25 15.5 14.25V15.75C18.1349 15.75 20.4407 14.3439 21.7092 12.2447L20.4253 11.469ZM9.75 8.5C9.75 6.41182 10.8627 4.5828 12.531 3.57467L11.7553 2.29085C9.65609 3.5593 8.25 5.86509 8.25 8.5H9.75ZM12 2.75C11.9115 2.75 11.8077 2.71008 11.7324 2.63168C11.6686 2.56527 11.6538 2.50244 11.6503 2.47703C11.6461 2.44587 11.6482 2.35557 11.7553 2.29085L12.531 3.57467C13.0342 3.27065 13.196 2.71398 13.1368 2.27627C13.0754 1.82126 12.7166 1.25 12 1.25V2.75ZM21.7092 12.2447C21.6444 12.3518 21.5541 12.3539 21.523 12.3497C21.4976 12.3462 21.4347 12.3314 21.3683 12.2676C21.2899 12.1923 21.25 12.0885 21.25 12H22.75C22.75 11.2834 22.1787 10.9246 21.7237 10.8632C21.286 10.804 20.7293 10.9658 20.4253 11.469L21.7092 12.2447ZM12 21.25C10.3139 21.25 8.73533 20.7996 7.37554 20.013L6.62446 21.3114C8.2064 22.2265 10.0432 22.75 12 22.75V21.25ZM3.98703 16.6245C3.20043 15.2647 2.75 13.6861 2.75 12H1.25C1.25 13.9568 1.77351 15.7936 2.68862 17.3755L3.98703 16.6245Z" fill="currentColor" />
        </svg>
        <img v-else-if="turno.id === 'L'" src="/tea.svg" alt="Descanso" class="icon-lg icon-img" />
        <img v-else-if="turno.id === 'V'" src="/sleeping.svg" alt="Vacaciones" class="icon-lg icon-img" />
      </div>
      <div v-else class="turno-icono">
        <HelpCircle class="icon-lg" />
      </div>

      <div class="turno-texto">
        <h2 class="turno-nombre">{{ turno ? turno.nombre : 'Sin configurar' }}</h2>
        <p class="turno-desc">{{ turno ? getDescripcion(turno.id) : 'Configura el inicio del ciclo' }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { HelpCircle } from '@lucide/vue'
import { getFeriado } from '@/utils/feriados'

defineProps({
  turno: {
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
  background: var(--bg-card);
  border-radius: 16px;
  padding: 1.5rem;
  position: relative;
  overflow: hidden;
  border: 1px solid var(--color-primary-light);
  border-left: 6px solid #3a3a3a;
}

/* Día y noche — mismo tono que “Próximo turno” */
.tarjeta-turno.shade-dia,
.tarjeta-turno.shade-noche {
  background-color: var(--bg-card);
  border-radius: 12px;
  padding: 1.25rem;
  box-shadow: none;
}

.tarjeta-turno.shade-dia {
  border: 1px solid rgba(255, 179, 161, 0.35);
  border-left: 4px solid var(--cal-dia-to);
}

.tarjeta-turno.shade-noche {
  border: 1px solid rgba(155, 102, 255, 0.35);
  border-left: 4px solid var(--cal-noche-from);
}

.tarjeta-turno.shade-descanso {
  background-color: var(--bg-card);
  border: 1px dashed #555;
  border-left: 4px solid var(--text-secondary);
}

.tarjeta-turno.shade-vacaciones {
  background-color: var(--cal-bg-panel);
  background-image: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 4px,
    rgba(255, 255, 255, 0.04) 4px,
    rgba(255, 255, 255, 0.04) 8px
  );
  border-color: rgba(155, 102, 255, 0.2);
  border-left-color: rgba(255, 255, 255, 0.5);
}

.shade-dia .turno-nombre {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--cal-dia-from);
}

.shade-noche .turno-nombre {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--cal-noche-from);
}

.shade-dia .fecha-container,
.shade-noche .fecha-container {
  margin-bottom: 1rem;
}

.fecha-container {
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 1;
}

.etiqueta {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 2px;
  color: var(--text-secondary);
  margin-bottom: 0.25rem;
}

.fecha {
  font-size: 1.1rem;
  color: var(--text-secondary);
  text-transform: capitalize;
}

.feriado-hoy {
  margin-top: 0.35rem;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--cal-feriado);
}

.shade-dia .feriado-hoy,
.shade-noche .feriado-hoy {
  color: #ffe6a8;
}

.turno-info {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  position: relative;
  z-index: 1;
}

.turno-icono {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  background-color: var(--color-primary-light);
  border: 1px solid #3a3a3a;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--text-primary);
}

.shade-dia .turno-icono {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  background: linear-gradient(135deg, var(--cal-dia-from), var(--cal-dia-to));
  border-color: rgba(255, 179, 161, 0.35);
  color: #fff;
}

.shade-noche .turno-icono {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  background: linear-gradient(135deg, var(--cal-noche-from), var(--cal-noche-to));
  border-color: rgba(155, 102, 255, 0.35);
  color: #fff;
}

.shade-dia .icon-lg,
.shade-noche .icon-lg {
  width: 22px;
  height: 22px;
}

.icon-lg {
  width: 32px;
  height: 32px;
}

.icon-img {
  object-fit: contain;
}

.turno-texto {
  display: flex;
  flex-direction: column;
}

.turno-nombre {
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0;
  color: var(--text-primary);
}

.turno-desc {
  font-size: 0.85rem;
  color: var(--text-secondary);
  margin: 0;
}
</style>
