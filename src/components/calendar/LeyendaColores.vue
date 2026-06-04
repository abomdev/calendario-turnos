<template>
  <div class="leyenda-container">
    <button class="leyenda-header" @click="toggleLeyenda" :aria-expanded="isExpanded">
      <div class="leyenda-header-left">
        <Info class="leyenda-info-icon" />
        <span class="leyenda-title">Información</span>
      </div>
      <ChevronUp v-if="isExpanded" class="leyenda-icon" />
      <ChevronDown v-else class="leyenda-icon" />
    </button>
    
    <Transition name="expand">
      <div v-show="isExpanded" class="leyenda-body">
        <p class="leyenda-intro">1 turno de día, 1 de noche y 2 días de descanso. <br> Los colores indican lo siguiente:</p>
        <div class="leyenda-grid">
          <div class="item-leyenda">
          <span class="color-dot dot-dia"></span>
          <div class="leyenda-text">
            <span class="leyenda-name">Día</span>
            <span class="leyenda-desc">Jornada diurna del ciclo</span>
          </div>
        </div>
        
        <div class="item-leyenda">
          <span class="color-dot dot-noche"></span>
          <div class="leyenda-text">
            <span class="leyenda-name">Noche</span>
            <span class="leyenda-desc">Jornada nocturna del ciclo</span>
          </div>
        </div>
        
        <div class="item-leyenda">
          <span class="color-dot dot-extra"></span>
          <div class="leyenda-text">
            <span class="leyenda-name">Extra</span>
            <span class="leyenda-desc">Turno asignado fuera del ciclo</span>
          </div>
        </div>
        
        <div class="item-leyenda">
          <span class="color-dot dot-descanso"></span>
          <div class="leyenda-text">
            <span class="leyenda-name">Descanso</span>
            <span class="leyenda-desc">Días libres del ciclo</span>
          </div>
        </div>
        
        <div class="item-leyenda">
          <span class="color-dot dot-vacaciones"></span>
          <div class="leyenda-text">
            <span class="leyenda-name">Vacaciones</span>
            <span class="leyenda-desc">Período de vacaciones programadas</span>
          </div>
        </div>
        
        <div class="item-leyenda">
          <span class="color-dot dot-feriado"></span>
          <div class="leyenda-text">
            <span class="leyenda-name">Feriado</span>
            <span class="leyenda-desc">Día festivo nacional o regional</span>
          </div>
        </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { ChevronDown, ChevronUp, Info } from '@lucide/vue'

const isExpanded = ref(false)

onMounted(() => {
  const stored = localStorage.getItem('leyenda-abierta')
  if (stored !== null) {
    isExpanded.value = stored === 'true'
  }
})

function toggleLeyenda() {
  isExpanded.value = !isExpanded.value
  localStorage.setItem('leyenda-abierta', isExpanded.value)
}
</script>

<style scoped>
.leyenda-container {
  background-color: var(--bg-card);
  border: 1px solid var(--color-primary-light);
  border-radius: 12px;
  overflow: hidden;
  margin-top: 1rem;
}

.leyenda-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: transparent;
  border: none;
  color: var(--text-primary);
  font-family: inherit;
  cursor: pointer;
  text-align: left;
}

.leyenda-header-left {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.leyenda-info-icon {
  width: 16px;
  height: 16px;
  color: var(--text-secondary);
  flex-shrink: 0;
}

.leyenda-title {
  font-size: 0.95rem;
  font-weight: 600;
}

.leyenda-icon {
  width: 20px;
  height: 20px;
  color: var(--text-secondary);
}

.leyenda-body {
  padding: 0 1rem 1rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.leyenda-intro {
  font-size: 0.85rem;
  color: var(--text-secondary);
  line-height: 1.4;
  margin: 0;
}

.leyenda-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem 0.5rem;
}

.item-leyenda {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.leyenda-text {
  display: flex;
  flex-direction: column;
}

.leyenda-name {
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--text-primary);
  line-height: 1.1;
}

.leyenda-desc {
  display: none;
}

/* Dots and Indicators */
.color-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: inline-block;
  flex-shrink: 0;
  margin-top: 0.25rem;
}

.dot-wrapper {
  position: relative;
  width: 12px;
  height: 12px;
  margin-top: 0.25rem;
}

.dot-wrapper .color-dot {
  margin-top: 0;
}

.color-dot.dot-dia {
  background: linear-gradient(135deg, var(--cal-dia-from), var(--cal-dia-to));
}

.color-dot.dot-noche {
  background: linear-gradient(135deg, var(--cal-noche-from), var(--cal-noche-to));
}

.color-dot.dot-descanso {
  background: transparent;
  border: 1.5px dashed #555;
  box-sizing: border-box;
}

.color-dot.dot-vacaciones {
  background: linear-gradient(135deg, var(--cal-vacaciones-from), var(--cal-vacaciones-to));
}

.color-dot.dot-feriado {
  background-color: var(--cal-feriado);
  border-radius: 4px;
}

.color-dot.dot-extra {
  background-color: var(--text-secondary);
  border-radius: 0;
  clip-path: polygon(100% 0, 0% 100%, 100% 100%);
}

.extra-triangle {
  position: absolute;
  top: -2px;
  right: -2px;
  width: 8px;
  height: 8px;
  background-color: var(--text-secondary);
  clip-path: polygon(100% 0, 0% 100%, 100% 100%);
}

/* Transitions */
.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s ease;
  max-height: 500px;
  opacity: 1;
}

.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
  padding-bottom: 0;
  overflow: hidden;
}
</style>
