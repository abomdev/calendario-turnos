<template>
  <div class="proximo-turno" :class="proximoInfo ? `shade-${proximoInfo.turno.shade}` : ''" v-if="proximoInfo">
    <div class="icono-mini">
      <!-- Sol -->
      <svg v-if="proximoInfo.turno.id === 'D' || proximoInfo.turno.id === 'ED'"
        viewBox="0 0 24 24" fill="none" class="icon-sm"
        stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
        <path d="M8 22H16M5 19H19M2 16H22"/>
        <path d="M10 6.34C10.63 6.12 11.3 6 12 6C15.31 6 18 8.69 18 12C18 13.52 17.43 14.91 16.5 15.97H7.5C6.57 14.91 6 13.52 6 12C6 11.3 6.12 10.63 6.34 10"/>
        <path d="M12 2V3M22 12H21M3 12H2M19.07 4.93L18.68 5.32M5.32 5.32L4.93 4.93"/>
      </svg>
      <!-- Luna -->
      <svg v-else-if="proximoInfo.turno.id === 'N' || proximoInfo.turno.id === 'EN'"
        viewBox="0 0 24 24" fill="none" class="icon-sm"
        stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21.25 12C21.25 17.11 17.11 21.25 12 21.25C6.89 21.25 2.75 17.11 2.75 12C2.75 6.89 6.89 2.75 12 2.75"/>
        <path d="M15.5 14.25C12.32 14.25 9.75 11.68 9.75 8.5C9.75 6.41 10.86 4.58 12.53 3.57"/>
      </svg>
    </div>

    <div class="contenido">
      <span class="etiqueta">PRÓXIMO TURNO DE TRABAJO</span>
      <h3 class="nombre-turno">{{ proximoInfo.turno.nombre }}</h3>
      <p class="fecha-turno">{{ format(proximoInfo.fecha, "EEEE d 'de' MMMM", { locale: es }) }}</p>
    </div>
  </div>
</template>

<script setup>
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

const props = defineProps({
  proximoInfo: {
    type: Object,
    default: null
  }
})
</script>

<style scoped>
.proximo-turno {
  background-color: var(--bg-card);
  border-radius: 12px;
  padding: 1.25rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  border: 1px solid var(--color-primary-light);
  border-left: 4px solid #3a3a3a;
}

/* Día → borde izq. blanco */
.proximo-turno.shade-dia   { border-left-color: var(--text-primary); }
/* Noche → borde izq. gris medio */
.proximo-turno.shade-noche { border-left-color: #555; }

.icono-mini {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  background-color: var(--color-primary-light);
  border: 1px solid #3a3a3a;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  color: var(--text-primary);
}

/* Noche → ícono tenue */
.shade-noche .icono-mini { color: var(--text-secondary); }

.icon-sm {
  width: 22px;
  height: 22px;
}

.contenido {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.etiqueta {
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 1px;
  color: var(--text-secondary);
  margin-bottom: 0.25rem;
}

.nombre-turno {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
  color: var(--text-primary);
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
</style>
