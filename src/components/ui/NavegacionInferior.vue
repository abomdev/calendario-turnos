<template>
  <nav class="bottom-nav">
    <RouterLink to="/" class="nav-item" active-class="active">
      <Home class="icon" />
      <span>Inicio</span>
    </RouterLink>
    <RouterLink to="/calendario" class="nav-item" active-class="active">
      <Calendar class="icon" />
      <span>Calendario</span>
    </RouterLink>
    <RouterLink to="/configuracion" class="nav-item" active-class="active">
      <Settings class="icon" />
      <span>Configuración</span>
    </RouterLink>
  </nav>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { Home, Calendar, Settings } from '@lucide/vue'
</script>

<style scoped>
.bottom-nav {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: var(--bg-card);
  padding: 0.75rem 0;
  border-top: 1px solid var(--color-primary-light);
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: #8b8ba7;
  gap: 0.25rem;
  font-size: 0.75rem;
  transition: color 0.2s ease;
}

.icon {
  width: 24px;
  height: 24px;
}

.nav-item.active {
  color: var(--color-primary);
}
</style>
