<template>
  <div class="calendario-mensual">
    <div class="header-calendario">
      <button class="btn-nav" @click="mesAnterior">
        <ChevronLeft class="icon" />
      </button>
      <h2 class="mes-actual">{{ mesFormateado }}</h2>
      <button class="btn-nav" @click="mesSiguiente">
        <ChevronRight class="icon" />
      </button>
    </div>

    <div class="grid-dias-semana">
      <span v-for="dia in diasSemana" :key="dia" class="dia-semana">{{ dia }}</span>
    </div>

    <div class="grid-calendario">
      <DiaTurno 
        v-for="dia in diasGrid" 
        :key="dia.fecha.toISOString()"
        :fecha="dia.fecha"
        :mes-actual="mesActual"
        :turno="dia.turnoEfectivo"
        :tiene-extra="dia.tieneExtra"
        :feriado="dia.feriado"
        @seleccionar="$emit('seleccionar-dia', $event)"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval } from 'date-fns'
import { es } from 'date-fns/locale'
import { ChevronLeft, ChevronRight } from '@lucide/vue'
import DiaTurno from './DiaTurno.vue'
import { useTurnos } from '@/composables/useTurnos'
import { useTurnosStore } from '@/stores/turnosStore'
import { getFeriado } from '@/utils/feriados'

const props = defineProps({
  mesActual: {
    type: Date,
    required: true
  }
})

const emit = defineEmits(['update:mesActual', 'seleccionar-dia'])

const { getTurnoEfectivo } = useTurnos()
const turnosStore = useTurnosStore()

const diasSemana = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá', 'Do']

const mesFormateado = computed(() => {
  return format(props.mesActual, "MMMM yyyy", { locale: es })
})

const diasGrid = computed(() => {
  // Configurar para que la semana empiece en Lunes (weekStartsOn: 1)
  const inicioMes = startOfMonth(props.mesActual)
  const finMes = endOfMonth(props.mesActual)
  const inicioGrid = startOfWeek(inicioMes, { weekStartsOn: 1 })
  const finGrid = endOfWeek(finMes, { weekStartsOn: 1 })

  const diasIntervalo = eachDayOfInterval({ start: inicioGrid, end: finGrid })

    return diasIntervalo.map(fecha => {
      const fechaStr = format(fecha, 'yyyy-MM-dd')
      const turnoEfectivo = getTurnoEfectivo(fecha)
      const tieneExtra = !!turnosStore.turnosExtra[fechaStr] && turnoEfectivo?.id !== 'V'
      
      return {
        fecha,
        turnoEfectivo,
        tieneExtra,
        feriado: getFeriado(fechaStr)
      }
    })
})

function mesAnterior() {
  emit('update:mesActual', subMonths(props.mesActual, 1))
}

function mesSiguiente() {
  emit('update:mesActual', addMonths(props.mesActual, 1))
}
</script>

<style src="./calendar-theme.css"></style>

<style scoped>
.calendario-mensual {
  background-color: var(--cal-bg-panel);
  border-radius: 12px;
  padding: 1rem 0.5rem;
  border: 1px solid rgba(155, 102, 255, 0.2);
}

.header-calendario {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.mes-actual {
  font-size: 1.25rem;
  font-weight: 600;
  text-transform: capitalize;
  margin: 0;
}

.btn-nav {
  background-color: var(--color-primary-light);
  border: none;
  color: var(--text-primary);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.btn-nav:active {
  background-color: #dddddd;
}

.grid-dias-semana {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
  margin-bottom: 8px;
  text-align: center;
}

.dia-semana {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--text-secondary);
}

.grid-calendario {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
}
</style>
