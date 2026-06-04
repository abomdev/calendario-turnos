<template>
  <div class="panel-bienvenida">
    <div class="panel-header">
      <div class="icon-wrapper">
        <CalendarDays class="header-icon" />
      </div>
      <h2>¡Bienvenido/a!</h2>
      <p class="subtitle">Configura tu Calendario en 3 pasos</p>
    </div>

    <div class="pasos-lista">
      <div class="paso-item">
        <div class="paso-number">1</div>
        <div class="paso-icon-box">
          <Calendar class="paso-icon" />
        </div>
        <div class="paso-text">
          <span class="paso-title">Configura tu ciclo</span>
          <span class="paso-desc">Elige el día de tu último turno de día y el sistema generará el patrón automáticamente.</span>
        </div>
      </div>

      <div class="paso-item">
        <div class="paso-number">2</div>
        <div class="paso-icon-box">
          <CalendarSearch class="paso-icon" />
        </div>
        <div class="paso-text">
          <span class="paso-title">Revisa tu calendario</span>
          <span class="paso-desc">Verás cada mes con tus turnos marcados por colores. Toca cualquier día para ajustarlo.</span>
        </div>
      </div>

      <div class="paso-item">
        <div class="paso-number">3</div>
        <div class="paso-icon-box">
          <Bell class="paso-icon" />
        </div>
        <div class="paso-text">
          <span class="paso-title">Activa recordatorios <span class="opcional">(opcional)</span></span>
          <span class="paso-desc">Recibe una notificación diaria la noche anterior a tu turno.</span>
        </div>
      </div>
    </div>

    <RouterLink to="/configuracion" class="btn-comenzar">
      Comenzar configuración
    </RouterLink>
  </div>
</template>

<script setup>
import { CalendarDays, CalendarSearch, Calendar, Bell, ArrowRight } from '@lucide/vue'
</script>

<style scoped>
.panel-bienvenida {
  background-color: var(--bg-card);
  border-radius: 16px;
  border: 1px solid var(--color-primary-light);
  padding: 1.75rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.panel-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0.5rem;
}

.icon-wrapper {
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, var(--cal-dia-from), var(--cal-noche-to));
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.header-icon {
  width: 32px;
  height: 32px;
  color: #fff;
}

.panel-header h2 {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--text-primary);
  margin: 0;
  letter-spacing: -0.5px;
}

.subtitle {
  font-size: 0.95rem;
  font-weight: 300;
  color: var(--text-secondary);
  margin: 0;
}

.pasos-lista {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.paso-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  position: relative;
}

.paso-number {
  position: absolute;
  left: -8px;
  top: -8px;
  background-color: var(--text-primary);
  color: var(--bg-color);
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 800;
  z-index: 2;
}

.paso-icon-box {
  width: 40px;
  height: 40px;
  background-color: var(--color-primary-light);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: var(--text-primary);
}

.paso-icon {
  width: 20px;
  height: 20px;
}

.paso-text {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding-top: 0.25rem;
}

.paso-title {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--text-primary);
}

.opcional {
  font-weight: 400;
  font-size: 0.8rem;
  color: var(--text-secondary);
}

.paso-desc {
  font-size: 0.85rem;
  color: var(--text-secondary);
  line-height: 1.4;
}

.btn-comenzar {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background-color: var(--text-primary);
  color: var(--bg-color);
  text-decoration: none;
  padding: 1rem;
  border-radius: 12px;
  font-weight: 700;
  font-size: 1rem;
  transition: opacity 0.2s, transform 0.1s;
  margin-top: 0.5rem;
}

.btn-comenzar:active {
  opacity: 0.8;
  transform: scale(0.98);
}

.btn-icon {
  width: 20px;
  height: 20px;
}
</style>
