import { useNavigate } from "react-router-dom";

const TABS = [
  { key: "bingo", label: "Bingo", to: "/admin/bingo-bots" },
  { key: "mines", label: "Minas", to: "/admin/mines-bots" },
  { key: "unity", label: "Juegos Unity", to: "/admin/unity-bots" },
];

/** Barra de tabs compartida por las 3 páginas de bots — cada una sigue siendo una página propia
 *  (no un tab-panel único) para no tener que tocar la de Bingo ya existente, solo se le agrega
 *  esto arriba. */
export default function BotsTabNav({ active }) {
  const navigate = useNavigate();
  return (
    <div className="flex items-center gap-2 mb-6">
      {TABS.map((tab) => (
        <button
          key={tab.key}
          onClick={() => navigate(tab.to)}
          className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors cursor-pointer border ${
            tab.key === active
              ? "bg-primary/10 text-primary border-primary/30"
              : "bg-transparent text-on-surface-variant border-outline-variant/30 hover:bg-surface-variant/20"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
