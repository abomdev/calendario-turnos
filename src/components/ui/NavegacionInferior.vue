<template>
  <div class="bottom-nav-wrapper">
    <nav class="bottom-nav" aria-label="Navegación principal">
      <RouterLink
        v-for="item in navItems"
        :key="item.to"
        :to="item.to"
        class="nav-item"
        active-class="active"
        :exact="item.exact"
      >
        <span class="nav-bubble">
          <component :is="item.icon" class="icon" aria-hidden="true" />
        </span>
        <span class="nav-label">{{ item.label }}</span>
      </RouterLink>
    </nav>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { Home, Calendar, Settings } from '@lucide/vue'

const navItems = [
  { to: '/',             label: 'Inicio',       icon: Home,     exact: true },
  { to: '/calendario',   label: 'Calendario',   icon: Calendar, exact: false },
  { to: '/configuracion', label: 'Config',      icon: Settings, exact: false },
]
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
}

.bottom-nav {
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  padding: 0.5rem 0.75rem 0.625rem;
  background-color: #2a2a2a;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 9999px;
  box-shadow:
    0 4px 24px rgba(0, 0, 0, 0.4),
    0 0 0 1px rgba(61, 121, 242, 0.15),
    0 1px 3px rgba(0, 0, 0, 0.25);
  pointer-events: auto;
}

/* ── Cada item ── */
.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
  text-decoration: none;
  flex: 1;
  padding: 0;
  transition: opacity 0.2s ease;
}

/* ── Burbuja del ícono ── */
.nav-bubble {
  width: 40px;
  height: 40px;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  transition:
    background-color 0.25s ease,
    box-shadow 0.25s ease,
    transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* ── Label ── */
.nav-label {
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.01em;
  color: var(--text-secondary, #888);
  white-space: nowrap;
  transition: color 0.25s ease;
}

/* ── Ícono base ── */
.icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  stroke-width: 2px;
  color: var(--text-secondary, #888);
  transition: color 0.25s ease;
}

/* ── Estado ACTIVO ── */
.nav-item.active .nav-bubble {
  background-color: var(--text-primary, #f3f4f6);
  box-shadow:
    0 -4px 12px rgba(0, 0, 0, 0.35),
    0 2px 6px rgba(0, 0, 0, 0.2);
  transform: translateY(-4px);
}

.nav-item.active .icon {
  color: var(--bg-color, #16171d);
  stroke-width: 2.25px;
}

.nav-item.active .nav-label {
  color: var(--text-primary, #f3f4f6);
  font-weight: 700;
}
</style>
