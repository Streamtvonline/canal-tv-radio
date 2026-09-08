const ADMIN_USER = "admin";
const ADMIN_PASS = "programacion26%";

function login() {
  const u = document.getElementById('login-user').value;
  const p = document.getElementById('login-pass').value;

  if (u === ADMIN_USER && p === ADMIN_PASS) {
    sessionStorage.setItem('authenticated', 'true');
    showPanel();
  } else {
    document.getElementById('login-error').classList.remove('hidden');
  }
}

function logout() {
  sessionStorage.removeItem('authenticated');
  location.reload();
}

function showPanel() {
  document.getElementById('login-screen').classList.add('hidden');
  document.getElementById('admin-panel').classList.remove('hidden');
  renderLists();
}

// Verificar autenticación
if (sessionStorage.getItem('authenticated') === 'true') {
  showPanel();
}

function renderLists() {
  const tv = JSON.parse(localStorage.getItem('tvPlaylist')) || [];
  const radio = JSON.parse(localStorage.getItem('radioPlaylist')) || [];

  document.getElementById('tv-list').innerHTML = tv.map((item, idx) => `
    <li class="flex justify-between items-center bg-gray-700 p-2 rounded text-sm">
      <span>${item.title}</span>
      <button onclick="removeTv(${idx})" class="text-red-400 font-bold">Eliminar</button>
    </li>
  `).join('');

  document.getElementById('radio-list').innerHTML = radio.map((item, idx) => `
    <li class="flex justify-between items-center bg-gray-700 p-2 rounded text-sm">
      <span>${item.title}</span>
      <button onclick="removeRadio(${idx})" class="text-red-400 font-bold">Eliminar</button>
    </li>
  `).join('');
}

function addTvProgram() {
  const title = document.getElementById('tv-title').value;
  const url = document.getElementById('tv-url').value;
  if (!title || !url) return;

  const list = JSON.parse(localStorage.getItem('tvPlaylist')) || [];
  list.push({ title, url });
  localStorage.setItem('tvPlaylist', JSON.stringify(list));
  renderLists();
}

function removeTv(idx) {
  const list = JSON.parse(localStorage.getItem('tvPlaylist')) || [];
  list.splice(idx, 1);
  localStorage.setItem('tvPlaylist', JSON.stringify(list));
  renderLists();
}

function addRadioProgram() {
  const title = document.getElementById('radio-title').value;
  const url = document.getElementById('radio-url').value;
  if (!title || !url) return;

  const list = JSON.parse(localStorage.getItem('radioPlaylist')) || [];
  list.push({ title, url });
  localStorage.setItem('radioPlaylist', JSON.stringify(list));
  renderLists();
}

function removeRadio(idx) {
  const list = JSON.parse(localStorage.getItem('radioPlaylist')) || [];
  list.splice(idx, 1);
  localStorage.setItem('radioPlaylist', JSON.stringify(list));
  renderLists();
}

function saveBannersAndLogo() {
  const logo = document.getElementById('input-logo').value;
  const bannerTop = document.getElementById('input-banner-top').value;

  if (logo) localStorage.setItem('channelLogo', logo);
  if (bannerTop) localStorage.setItem('bannerTop', bannerTop);
  alert("Logos y banners guardados correctamente.");
}

function addNews() {
  const title = document.getElementById('news-title').value;
  const img = document.getElementById('news-img').value;
  const body = document.getElementById('news-body').value;

  const list = JSON.parse(localStorage.getItem('newsList')) || [];
  list.unshift({ title, img, body });
  localStorage.setItem('newsList', JSON.stringify(list));
  alert("Noticia publicada exitosamente.");
}