// frontend.js

// Registrar el Service Worker para PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/serviceWorker.js')
      .then(reg => console.log('✅ Service Worker registrado en:', reg.scope))
      .catch(err => console.error('❌ Error al registrar Service Worker:', err));
  });
}

// Soporte para botón de instalación PWA (opcional)
let deferredPrompt;
const installBtn = document.getElementById('installBtn');

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  if (installBtn) {
    installBtn.style.display = 'block';
    installBtn.addEventListener('click', () => {
      installBtn.style.display = 'none';
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(choice => {
        if (choice.outcome === 'accepted') {
          console.log('✅ Instalación aceptada');
        } else {
          console.log('❌ Instalación rechazada');
        }
        deferredPrompt = null;
      });
    });
  }
});
