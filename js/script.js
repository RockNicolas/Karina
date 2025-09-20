const inicio = new Date("2025-08-01 20:00:00"); 

function atualizarContador() {
  const agora = new Date();
  const diff = agora - inicio;

  const anos = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
  const meses = Math.floor((diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
  const dias = Math.floor((diff % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutos = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const segundos = Math.floor((diff % (1000 * 60)) / 1000);

  document.getElementById("contador").innerText =
    `${anos} anos, ${meses} meses, ${dias} dias, ${horas} horas, ${minutos} minutos e ${segundos} segundos`;
}

setInterval(atualizarContador, 1000);

const playPauseBtn = document.getElementById('play-pause');
const audio = document.getElementById('musica');

playPauseBtn.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    playPauseBtn.textContent = "⏸️";
  } else {
    audio.pause();
    playPauseBtn.textContent = "▶️";
  }
});

const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const progressBar = document.getElementById('progress-bar');

audio.addEventListener('loadedmetadata', () => {
  durationEl.textContent = formatTime(audio.duration);
});

audio.addEventListener('timeupdate', () => {
  currentTimeEl.textContent = formatTime(audio.currentTime);
  const progressPercent = (audio.currentTime / audio.duration) * 100;
  progressBar.style.width = progressPercent + "%";
});

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

document.addEventListener('DOMContentLoaded', () => {
  atualizarContador();
  audio.play().catch(() => {
    playPauseBtn.textContent = "▶️";
  });
});
