import { useRef, useState } from "react";
import axios from "axios";
import API_URL from "../../api/rutaApi";
import { playCoinSound } from "../../utils/coinSound";

import dia1 from "../../assets/dailyBonus/dia1.png";
import dia2 from "../../assets/dailyBonus/dia2.png";
import dia3 from "../../assets/dailyBonus/dia3.png";
import dia4 from "../../assets/dailyBonus/dia4.png";
import dia5 from "../../assets/dailyBonus/dia5.png";
import dia6 from "../../assets/dailyBonus/dia6.png";
import dia7 from "../../assets/dailyBonus/dia7.png";
import botonReclamar from "../../assets/dailyBonus/botonReclamar.png";
import chip from "../../assets/dailyBonus/chip.png";

const DAY_IMAGES = [dia1, dia2, dia3, dia4, dia5, dia6, dia7];
const FLYING_CHIPS_COUNT = 7;
const FLIGHT_DURATION_MS = 650;

// Fichas volando del botón "Reclamar" hasta el contador de fichas de la nav (#nav-chips-target,
// ver Nav/nav.jsx). Son <img> position:fixed insertadas directo en el body (no React state) porque
// son puramente decorativas y se auto-destruyen solas al terminar la transición.
function flyChipsToNav(originRect) {
  const target = document.getElementById("nav-chips-target");
  if (!target) return;
  const targetRect = target.getBoundingClientRect();
  const targetX = targetRect.left + targetRect.width / 2;
  const targetY = targetRect.top + targetRect.height / 2;
  const originX = originRect.left + originRect.width / 2;
  const originY = originRect.top + originRect.height / 2;

  for (let i = 0; i < FLYING_CHIPS_COUNT; i++) {
    const img = document.createElement("img");
    img.src = chip;
    img.style.position = "fixed";
    img.style.left = "0";
    img.style.top = "0";
    img.style.width = "32px";
    img.style.height = "32px";
    img.style.zIndex = "9999";
    img.style.pointerEvents = "none";
    img.style.transform = `translate(${originX - 16}px, ${originY - 16}px) scale(1)`;
    img.style.opacity = "1";
    img.style.transition = `transform ${FLIGHT_DURATION_MS}ms cubic-bezier(0.32, 0, 0.67, 0) ${i * 45}ms, opacity ${FLIGHT_DURATION_MS}ms ease-in ${i * 45}ms`;
    document.body.appendChild(img);

    const scatterX = (Math.random() - 0.5) * 60;
    const scatterY = (Math.random() - 0.5) * 40;
    requestAnimationFrame(() => {
      img.style.transform = `translate(${originX - 16 + scatterX}px, ${originY - 16 + scatterY}px) scale(1)`;
      requestAnimationFrame(() => {
        img.style.transform = `translate(${targetX - 16}px, ${targetY - 16}px) scale(0.3)`;
        img.style.opacity = "0.2";
      });
    });

    setTimeout(() => img.remove(), FLIGHT_DURATION_MS + i * 45 + 120);
  }
}

export default function DailyBonusModal({ day, onClose, onClaimed }) {
  const [claiming, setClaiming] = useState(false);
  const buttonRef = useRef(null);
  const dayImage = DAY_IMAGES[Math.min(Math.max(day, 1), 7) - 1];

  const handleClaim = async () => {
    if (claiming) return;
    setClaiming(true);
    try {
      const { data } = await axios.post(`${API_URL}/daily-bonus/claim`);
      playCoinSound();
      if (buttonRef.current) {
        flyChipsToNav(buttonRef.current.getBoundingClientRect());
      }
      setTimeout(() => {
        onClaimed?.(data);
      }, FLIGHT_DURATION_MS + FLYING_CHIPS_COUNT * 45);
    } catch (error) {
      setClaiming(false);
      onClaimed?.({ error: error?.response?.data?.message || "No se pudo reclamar el bono diario" });
    }
  };

  return (
    <div className="fixed inset-0 z-[200] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-[662px] flex flex-col items-center">
        <button
          type="button"
          onClick={onClose}
          className="absolute -top-3 -right-3 z-10 w-10 h-10 rounded-full bg-surface-container-high border border-outline-variant/30 text-white flex items-center justify-center cursor-pointer hover:bg-surface-variant transition-colors"
          aria-label="Cerrar"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        <img src={dayImage} alt={`Bono Diario - Día ${day}`} className="w-full select-none" draggable={false} />

        <button
          ref={buttonRef}
          type="button"
          onClick={handleClaim}
          disabled={claiming}
          className="mt-0 w-2/3 max-w-[322px] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed transition-transform hover:scale-105 active:scale-95"
        >
          <img src={botonReclamar} alt="Reclamar Bono" className="w-full select-none" draggable={false} />
        </button>
      </div>
    </div>
  );
}
