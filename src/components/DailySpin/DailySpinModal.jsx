import { useEffect, useRef } from "react";
import axios from "axios";
import API_URL from "../../api/rutaApi";

const DAILY_SPIN_URL = "https://ruletadiaria.s3.us-east-2.amazonaws.com/Ruletadiaria/index.html";

// Puente con el build de Unity (cargado cross-origin desde S3, por eso todo esto es via
// window.postMessage en vez de SendMessage directo):
// - Unity -> aca: {type:'daily-spin-request'} cuando el jugador toca GIRAR. Unity manda esto
//   apenas se hace click, todavia sin girar - espera nuestra respuesta antes de animar.
// - Aca -> Unity: {type:'daily-spin-result', index, amount} con lo que devolvio el backend, para
//   que Unity gire hasta el sector correcto. Requiere que el index.html publicado en S3 tenga el
//   pequeño listener que reenvia esto a unityInstance.SendMessage('DailySpinWheel',
//   'ReceiveSpinResult', ...) - ver Assets/Plugins/WebGL/DailySpinBridge.jslib en el proyecto Unity.
// - Unity -> aca: {type:'daily-spin-finished', amount} cuando termina de girar y parpadear.
export default function DailySpinModal({ onClose, onResult }) {
  const iframeRef = useRef(null);
  const claimingRef = useRef(false);

  useEffect(() => {
    const handleMessage = async (event) => {
      if (!event.data || typeof event.data !== "object") return;
      const iframeWindow = iframeRef.current?.contentWindow;
      if (!iframeWindow || event.source !== iframeWindow) return;

      if (event.data.type === "daily-spin-request") {
        if (claimingRef.current) return;
        claimingRef.current = true;
        try {
          const { data } = await axios.post(`${API_URL}/daily-spin/claim`);
          iframeWindow.postMessage(
            { type: "daily-spin-result", index: data.segmentIndex, amount: data.amount },
            "*"
          );
        } catch (error) {
          claimingRef.current = false;
          onResult?.({ error: error?.response?.data?.message || "No se pudo reclamar el giro diario" });
          onClose?.();
        }
      }

      if (event.data.type === "daily-spin-finished") {
        claimingRef.current = false;
        onResult?.({ amount: event.data.amount });
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [onClose, onResult]);

  return (
    <div className="fixed inset-0 z-[200] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-[520px] aspect-square">
        <button
          type="button"
          onClick={onClose}
          className="absolute -top-3 -right-3 z-10 w-10 h-10 rounded-full bg-surface-container-high border border-outline-variant/30 text-white flex items-center justify-center cursor-pointer hover:bg-surface-variant transition-colors"
          aria-label="Cerrar"
        >
          <span className="material-symbols-outlined">close</span>
        </button>
        <iframe
          ref={iframeRef}
          src={DAILY_SPIN_URL}
          title="Ruleta diaria"
          className="w-full h-full border-0 rounded-xl"
          allow="autoplay"
        />
      </div>
    </div>
  );
}
