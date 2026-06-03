<template>
  <div class="proximo-turno" :class="[proximoInfo ? `shade-${proximoInfo.turno.shade}` : '', `variant-${variant}`]" v-if="proximoInfo">
    <div class="icono-mini">
      <svg v-if="proximoInfo.turno.id === 'D' || proximoInfo.turno.id === 'ED'"
        viewBox="0 0 24 24" fill="none" class="icon-sm"
        stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
        <path d="M8 22H16M5 19H19M2 16H22"/>
        <path d="M10 6.34C10.63 6.12 11.3 6 12 6C15.31 6 18 8.69 18 12C18 13.52 17.43 14.91 16.5 15.97H7.5C6.57 14.91 6 13.52 6 12C6 11.3 6.12 10.63 6.34 10"/>
        <path d="M12 2V3M22 12H21M3 12H2M19.07 4.93L18.68 5.32M5.32 5.32L4.93 4.93"/>
      </svg>
      <svg v-else-if="proximoInfo.turno.id === 'N' || proximoInfo.turno.id === 'EN'"
        viewBox="0 0 24 24" fill="none" class="icon-sm"
        stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21.25 12C21.25 17.11 17.11 21.25 12 21.25C6.89 21.25 2.75 17.11 2.75 12C2.75 6.89 6.89 2.75 12 2.75"/>
        <path d="M15.5 14.25C12.32 14.25 9.75 11.68 9.75 8.5C9.75 6.41 10.86 4.58 12.53 3.57"/>
      </svg>
      <img v-else-if="proximoInfo.turno.id === 'L'" src="/tea.svg" alt="Descanso" class="icon-sm icon-img" />
      <img v-else-if="proximoInfo.turno.id === 'V'" src="/sleeping.svg" alt="Vacaciones" class="icon-sm icon-img" />

      <!-- Badge de extra -->
      <div v-if="proximoInfo.turno.id === 'ED' || proximoInfo.turno.id === 'EN'" class="badge-extra"></div>
    </div>

    <div class="contenido">
      <span class="etiqueta">PRÓXIMO TURNO DE TRABAJO</span>
      <div class="turno-fecha-flex">
        <h3 class="nombre-turno">{{ proximoInfo.turno.nombre }}</h3>
      </div>
    </div>
    
  </div>
</template>

<script setup>
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

defineProps({
  proximoInfo: {
    type: Object,
    default: null
  },
  variant: {
    type: String,
    default: 'card'
  }
})
</script>

<style scoped>
.proximo-turno {
  background-color: var(--bg-card);
  border-radius: var(--radius-ios-card);
  padding: 1rem 1.25rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  border: 1px solid var(--glass-border);
  transition: background-color 0.2s ease;
}

.proximo-turno.variant-inline {
  background: transparent;
  border: none;
  padding: 1.25rem 0 0 0;
  border-radius: 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: 1.25rem;
}

.icono-mini {
  width: 38px;
  height: 38px;
  border-radius: var(--radius-ios-inner);
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  color: var(--text-primary);
  position: relative;
  overflow: hidden;
}

.shade-dia .icono-mini {
  background: linear-gradient(135deg, var(--cal-dia-from), var(--cal-dia-to));
  border-color: rgba(255, 179, 161, 0.2);
  color: #fff;
}

.shade-noche .icono-mini {
  background: linear-gradient(135deg, var(--cal-noche-from), var(--cal-noche-to));
  border-color: rgba(155, 102, 255, 0.2);
  color: #fff;
}

.shade-vacaciones .icono-mini {
  background: linear-gradient(135deg, var(--cal-vacaciones-from), var(--cal-vacaciones-to));
  border-color: rgba(45, 212, 160, 0.2);
  color: #fff;
}

.icon-sm {
  width: 18px;
  height: 18px;
}

.icon-img {
  object-fit: contain;
}

.contenido {
  display: flex;
  flex-direction: column;
  min-width: 0;
  flex-grow: 1;
}

.etiqueta {
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.8px;
  color: var(--text-secondary);
  margin-bottom: 0.15rem;
  text-transform: uppercase;
}

.turno-fecha-flex {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.nombre-turno {
  font-size: 0.95rem;
  font-weight: 600;
  margin: 0;
  color: var(--text-primary);
}

.separador-dot {
  color: var(--text-secondary);
  font-weight: bold;
  font-size: 0.85rem;
}

.fecha-turno {
  font-size: 0.85rem;
  color: var(--text-secondary);
  text-transform: capitalize;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.chevron {
  color: rgba(255, 255, 255, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
}

.chevron svg {
  width: 16px;
  height: 16px;
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
