import { watch, onMounted } from 'vue'
import { useConfigStore } from '@/stores/configStore'
import { useTurnos } from '@/composables/useTurnos'
import { addDays, format, startOfDay } from 'date-fns'

export function useNotificaciones() {
  const configStore = useConfigStore()
  const { getTurnoEfectivo } = useTurnos()

  /**
   * Solicita permisos al usuario para mostrar notificaciones
   */
  async function solicitarPermisos() {
    if (!('Notification' in window)) {
      alert('Este navegador no soporta notificaciones de escritorio')
      return false
    }

    if (Notification.permission === 'granted') {
      return true
    }

    if (Notification.permission !== 'denied') {
      const permission = await Notification.requestPermission()
      return permission === 'granted'
    }

    return false
  }

  /**
   * Dispara la notificación
   */
  function enviarNotificacion(titulo, cuerpo) {
    if (Notification.permission === 'granted') {
      // Intentar usar el service worker si está disponible
      navigator.serviceWorker.ready.then(registration => {
        registration.showNotification(titulo, {
          body: cuerpo,
          icon: '/pwa-192x192.png',
          vibrate: [200, 100, 200]
        })
      }).catch(() => {
        // Fallback a notificación normal
        new Notification(titulo, {
          body: cuerpo,
          icon: '/pwa-192x192.png'
        })
      })
    }
  }

  /**
   * Revisa si es momento de notificar (se llama cada minuto)
   */
  function revisarNotificacion() {
    if (!configStore.notificacionesActivas || !configStore.fechaInicioCiclo) return

    const ahora = new Date()
    const horaActual = format(ahora, 'HH:mm')

    // Si coincide con la hora configurada
    if (horaActual === configStore.horaNotificacion) {
      
      // Validar que no hayamos notificado ya hoy (usando localStorage simple)
      const ultimaNotif = localStorage.getItem('nurseshift_ultima_notif')
      const hoyStr = format(ahora, 'yyyy-MM-dd')
      
      if (ultimaNotif === hoyStr) return // Ya notificamos hoy

      // Calcular el turno de MAÑANA (como recordatorio)
      const manana = addDays(ahora, 1)
      const turnoManana = getTurnoEfectivo(manana)

      if (turnoManana && turnoManana.id !== 'L') {
        enviarNotificacion(
          '¡Recordatorio de Turno!', 
          `Mañana tienes turno de ${turnoManana.nombre}`
        )
        localStorage.setItem('nurseshift_ultima_notif', hoyStr)
      } else {
        enviarNotificacion(
          '¡Mañana descansas!', 
          'Disfruta tu día libre 😊'
        )
        localStorage.setItem('nurseshift_ultima_notif', hoyStr)
      }
    }
  }

  /**
   * Inicia el intervalo de comprobación si las notificaciones están activas
   */
  function iniciarObservador() {
    // Revisar cada minuto (60000 ms)
    setInterval(revisarNotificacion, 60000)
  }

  return {
    solicitarPermisos,
    iniciarObservador,
    enviarNotificacion
  }
}
