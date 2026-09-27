import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { swalThemeConfig } from "../../../utils/formatters";
import { fetchUnityBots, upsertUnityBotConfig } from "../../../redux/actions";
import BotsTabNav from "../Bots/botsTabNav";

// Debe coincidir con UNITY_BOT_GAMES del backend (RoyalGamesBackend/src/modules/bots/constants/unity-bot-games.ts).
const UNITY_BOT_GAMES = [
  { slug: "royal-joker", label: "Royal Joker" },
  { slug: "royal-pachinka", label: "Royal Pachinka" },
  { slug: "royalslots", label: "Royal Slots" },
  { slug: "santawilds", label: "Santa Wilds" },
  { slug: "sugarcalavera", label: "Sugar Calavera" },
];

const numberFormat = (n) => new Intl.NumberFormat("es-ES").format(n || 0);

export default function UnityBots() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [bots, setBots] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await dispatch(fetchUnityBots());
      setBots(data);
    } catch (error) {
      Swal.fire({ title: "Error", text: "No se pudo cargar la lista de bots.", icon: "error", ...swalThemeConfig });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const applyLocal = (botId, slug, patch) => {
    setBots((prev) =>
      prev.map((b) =>
        b.botId === botId ? { ...b, games: { ...b.games, [slug]: { ...b.games[slug], ...patch } } } : b,
      ),
    );
  };

  const handleToggle = async (bot, slug, enabled) => {
    applyLocal(bot.botId, slug, { enabled });
    try {
      const current = bot.games[slug];
      await dispatch(
        upsertUnityBotConfig(bot.botId, slug, {
          enabled,
          minAmount: current.minAmount,
          maxAmount: current.maxAmount,
        }),
      );
    } catch (error) {
      applyLocal(bot.botId, slug, { enabled: !enabled });
      Swal.fire({ title: "Error", text: "No se pudo guardar el cambio.", icon: "error", ...swalThemeConfig });
    }
  };

  const handleEditAmounts = async (bot, slug) => {
    const current = bot.games[slug];
    const result = await Swal.fire({
      title: `Rango de fichas — ${UNITY_BOT_GAMES.find((g) => g.slug === slug)?.label}`,
      html: `
        <div style="display:flex;flex-direction:column;gap:8px;text-align:left">
          <label style="font-size:11px;text-transform:uppercase;letter-spacing:0.05em">Mínimo</label>
          <input id="swal-min-amount" type="number" min="1" class="swal2-input" value="${current.minAmount}" style="margin:0">
          <label style="font-size:11px;text-transform:uppercase;letter-spacing:0.05em">Máximo</label>
          <input id="swal-max-amount" type="number" min="1" class="swal2-input" value="${current.maxAmount}" style="margin:0">
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: "Guardar",
      cancelButtonText: "Cancelar",
      ...swalThemeConfig,
      preConfirm: () => {
        const minAmount = Number(document.getElementById("swal-min-amount").value);
        const maxAmount = Number(document.getElementById("swal-max-amount").value);
        if (!minAmount || !maxAmount || minAmount < 1 || maxAmount < minAmount) {
          Swal.showValidationMessage("Rango inválido");
          return false;
        }
        return { minAmount, maxAmount };
      },
    });
    if (!result.isConfirmed) return;

    applyLocal(bot.botId, slug, result.value);
    try {
      await dispatch(
        upsertUnityBotConfig(bot.botId, slug, {
          enabled: current.enabled,
          minAmount: result.value.minAmount,
          maxAmount: result.value.maxAmount,
        }),
      );
    } catch (error) {
      Swal.fire({ title: "Error", text: "No se pudo guardar el rango.", icon: "error", ...swalThemeConfig });
    }
  };

  return (
    <div className="bg-background text-on-background min-h-screen pt-20 pb-12">
      <div className="px-margin-desktop max-w-container-max mx-auto mb-8">
        <BotsTabNav active="unity" />
        <div className="flex justify-between items-end mb-6">
          <div>
            <h1 className="font-headline-lg text-headline-lg text-on-background mb-2">Bots en Juegos Unity</h1>
            <p className="text-on-surface-variant font-body-sm max-w-2xl">
              Royal Joker, Pachinka, Slots, Santa Wilds y Sugar Calavera no tienen "ronda" en el backend (el juego
              corre en Unity) — acá un bot simula actividad: gana o pierde fichas de a poco, igual que un jugador
              real, dentro del rango que definas por juego. Activá el toggle para que empiece.
            </p>
          </div>
          <button
            onClick={() => navigate('/admin/dashboard')}
            className="px-6 py-2.5 rounded-xl border border-outline-variant/30 text-on-surface font-label-lg hover:bg-surface-variant/20 transition-all flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">dashboard</span>
            Volver al Panel
          </button>
        </div>

        <div className="bg-surface-container border border-outline-variant/20 rounded-xl overflow-hidden">
          {loading ? (
            <div className="flex flex-col items-center justify-center p-12 gap-3">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
              <span className="text-sm text-on-surface-variant">Cargando bots...</span>
            </div>
          ) : bots.length === 0 ? (
            <p className="p-12 text-center text-on-surface-variant">
              Todavía no creaste ningún bot. Creá uno primero en "Bots de Bingo".
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-high border-b border-outline-variant/30">
                    <th className="px-6 py-4 font-label-lg text-label-lg text-primary uppercase tracking-wider">Nick</th>
                    {UNITY_BOT_GAMES.map((game) => (
                      <th key={game.slug} className="px-4 py-4 font-label-lg text-label-lg text-primary uppercase tracking-wider text-center">
                        {game.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10">
                  {bots.map((bot) => (
                    <tr key={bot.botId} className="hover:bg-surface-variant/20 transition-colors">
                      <td className="px-6 py-4 font-bold text-white whitespace-nowrap">{bot.nick}</td>
                      {UNITY_BOT_GAMES.map((game) => {
                        const cfg = bot.games[game.slug];
                        return (
                          <td key={game.slug} className="px-4 py-4">
                            <div className="flex flex-col items-center gap-1">
                              <input
                                type="checkbox"
                                checked={cfg.enabled}
                                onChange={(e) => handleToggle(bot, game.slug, e.target.checked)}
                                className="cursor-pointer w-4 h-4"
                              />
                              <button
                                onClick={() => handleEditAmounts(bot, game.slug)}
                                className="text-[10px] text-on-surface-variant hover:text-primary underline cursor-pointer bg-transparent border-0"
                              >
                                {numberFormat(cfg.minAmount)}–{numberFormat(cfg.maxAmount)}
                              </button>
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
