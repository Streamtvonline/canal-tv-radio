// Carga inicial de datos desde LocalStorage o Valores por defecto
let tvPlaylist = JSON.parse(localStorage.getItem('tvPlaylist')) || [
  { title: "Programa Demostración Archive.org", url: "https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4" }
];

let radioPlaylist = JSON.parse(localStorage.getItem('radioPlaylist')) || [
  { title: "Emisión de Radio 24h Demo", url: "https://archive.org/download/testmp3test/test.mp3" }
];

let currentTvIndex = 0;
let currentRadioIndex = 0;

const tvPlayer = document.getElementById('tv-player');
const radioPlayer = document.getElementById('radio-player');

// Cambiar de Pestañas
function switchTab(tab) {
  document.getElementById('section-tv').classList.add('hidden');
  document.getElementById('section-radio').classList.add('hidden');
  document.getElementById('section-news').classList.add('hidden');

  document.getElementById(`section-${tab}`).classList.remove('hidden');
}

// Reproducción continua de TV con 3 segundos de pausa
function playTv() {
  if (tvPlaylist.length === 0) return;
  const current = tvPlaylist[currentTvIndex];
  tvPlayer.src = current.url;
  document.getElementById('current-program-title').innerText = "Reproduciendo ahora: " + current.title;
  
  tvPlayer.play().catch(() => {
    console.log("Auto-play bloqueado por el navegador. El usuario debe interactuar primero.");
  });
}

tvPlayer.addEventListener('ended', () => {
  document.getElementById('current-program-title').innerText = "Cargando siguiente programa en 3 segundos...";
  setTimeout(() => {
    currentTvIndex = (currentTvIndex + 1) % tvPlaylist.length;
    playTv();
  }, 3000); // 3 segundos exactos de transición
});

// Reproducción continua de Radio
function playRadio() {
  if (radioPlaylist.length === 0) return;
  const current = radioPlaylist[currentRadioIndex];
  radioPlayer.src = current.url;
  document.getElementById('radio-status').innerText = "Sintonizando: " + current.title;
  radioPlayer.play().catch(() => {});
}

radioPlayer.addEventListener('ended', () => {
  currentRadioIndex = (currentRadioIndex + 1) % radioPlaylist.length;
  playRadio();
});

// Mantener reproducción en segundo plano y pantalla de bloqueo (Mobile / PC)
if ('mediaSession' in navigator) {
  navigator.mediaSession.metadata = new MediaMetadata({
    title: 'Transmisión en Vivo 24/7',
    artist: 'Canal de TV y Radio',
    album: 'Señal en Línea'
  });
}

// Cargar Logo y Banners al iniciar
window.addEventListener('DOMContentLoaded', () => {
  const logo = localStorage.getItem('channelLogo');
  const bannerTop = localStorage.getItem('bannerTop');

  if (logo) {
    document.getElementById('channel-logo').src = logo;
    document.getElementById('player-watermark').src = logo;
  }
  if (bannerTop) {
    document.getElementById('top-banner-container').innerHTML = `<img src="${bannerTop}" class="max-h-20 mx-auto rounded">`;
  }

  loadNews();
  playTv();
  playRadio();
});

function loadNews() {
  const news = JSON.parse(localStorage.getItem('newsList')) || [];
  const container = document.getElementById('news-grid');
  container.innerHTML = news.map(item => `
    <div class="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 shadow-lg">
      <img src="${item.img}" class="w-full h-48 object-cover">
      <div class="p-4 space-y-2">
        <h3 class="font-bold text-lg">${item.title}</h3>
        <p class="text-sm text-gray-300">${item.body}</p>
      </div>
    </div>
  `).join('');
}