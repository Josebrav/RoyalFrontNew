// Efecto de "fichas" generado con Web Audio API (sin archivo de audio): una serie corta de
// tonos ascendentes tipo campanita, pensado para el click de "Reclamar Bono" del Bono Diario.
let sharedCtx = null;

function getContext() {
  if (!sharedCtx) {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return null;
    sharedCtx = new AudioCtx();
  }
  if (sharedCtx.state === 'suspended') {
    sharedCtx.resume();
  }
  return sharedCtx;
}

export function playCoinSound() {
  const ctx = getContext();
  if (!ctx) return;

  const notes = [880, 1108, 1318, 1568];
  const startTime = ctx.currentTime;

  notes.forEach((freq, i) => {
    const noteStart = startTime + i * 0.07;
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();

    oscillator.type = 'triangle';
    oscillator.frequency.setValueAtTime(freq, noteStart);

    gain.gain.setValueAtTime(0, noteStart);
    gain.gain.linearRampToValueAtTime(0.18, noteStart + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, noteStart + 0.22);

    oscillator.connect(gain);
    gain.connect(ctx.destination);

    oscillator.start(noteStart);
    oscillator.stop(noteStart + 0.24);
  });
}
