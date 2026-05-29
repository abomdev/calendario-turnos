<template>
  <div class="bottom-nav-wrapper">
    <nav class="bottom-nav" aria-label="Navegación principal">
      <RouterLink to="/" class="nav-item" active-class="active">
        <Home class="icon" aria-hidden="true" />
        <span class="nav-label">Inicio</span>
      </RouterLink>
      <RouterLink to="/calendario" class="nav-item" active-class="active">
        <Calendar class="icon" aria-hidden="true" />
        <span class="nav-label">Calendario</span>
      </RouterLink>
      <RouterLink to="/configuracion" class="nav-item" active-class="active">
        <Settings class="icon" aria-hidden="true" />
        <span class="nav-label">Configuración</span>
      </RouterLink>
    </nav>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { Home, Calendar, Settings } from '@lucide/vue'
</script>

<style scoped>
.bottom-nav-wrapper {
  position: fixed;
  bottom: max(1.25rem, env(safe-area-inset-bottom, 0px));
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 2rem);
  max-width: 22rem;
  z-index: 100;
  pointer-events: none;
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.bottom-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.25rem;
  padding: 0.375rem 0.5rem;
  background-color: #2a2a2a;
  border: 1px solid var(--color-primary-light);
  border-radius: 9999px;
  box-shadow:
    0 4px 24px rgba(0, 0, 0, 0.35),
    0 1px 3px rgba(0, 0, 0, 0.2);
  pointer-events: auto;
}

.nav-item {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem;
  border-radius: 9999px;
  text-decoration: none;
  color: var(--text-secondary);
  transition:
    background-color 0.25s ease,
    color 0.25s ease,
    padding 0.25s ease,
    box-shadow 0.25s ease;
  flex: 0 0 auto;
}

.nav-item.active {
  flex: 1 1 auto;
  padding: 0.625rem 1.125rem;
  background-color: var(--text-primary);
  color: var(--bg-color);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
}

.icon {
  width: 22px;
  height: 22px;
  flex-shrink: 0;
  stroke-width: 2.25px;
}

.nav-label {
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: -0.01em;
  white-space: nowrap;
  max-width: 0;
  opacity: 0;
  overflow: hidden;
  transition:
    max-width 0.3s ease,
    opacity 0.2s ease;
}

.nav-item.active .nav-label {
  max-width: 7.5rem;
  opacity: 1;
}
</style>
