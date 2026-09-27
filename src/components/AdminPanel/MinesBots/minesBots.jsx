import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { swalThemeConfig } from "../../../utils/formatters";
import { fetchMinesBots, upsertMinesBotConfig } from "../../../redux/actions";
import BotsTabNav from "../Bots/botsTabNav";

// Debe coincidir con FIXED_BET_VALUES del backend (RoyalGamesBackend/src/modules/mines/constants/fixed-bet-values.ts).
const FIXED_BET_VALUES = [
  10, 50, 100, 250, 500, 1000, 5000, 10000, 25000, 50000, 100000, 250000, 500000, 1000000,
  2000000, 5000000, 10000000, 25000000, 50000000, 100000000,
];

const numberFormat = (n) => new Intl.NumberFormat("es-ES").format(n || 0);

export default function MinesBots() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [bots, setBots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await dispatch(fetchMinesBots());
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

  const updateLocal = (botId, patch) => {
    setBots((prev) => prev.map((b) => (b.botId === botId ? { ...b, ...patch } : b)));
  };

  const handleSave = async (bot) => {
    setSavingId(bot.botId);
    try {
      await dispatch(
        upsertMinesBotConfig(bot.botId, {
          enabled: bot.enabled,
          minBet: bot.minBet,
          maxBet: bot.maxBet,
          minMinesCount: bot.minMinesCount,
          maxMinesCount: bot.maxMinesCount,
        }),
      );
    } catch (error) {
      Swal.fire({ title: "Error", text: "No se pudo guardar la config del bot.", icon: "error", ...swalThemeConfig });
    } finally {
      setSavingId(null);
    }
  };

  return (
    <div className="bg-background text-on-background min-h-screen pt-20 pb-12">
      <div className="px-margin-desktop max-w-container-max mx-auto mb-8">
        <BotsTabNav active="mines" />
        <div className="flex justify-between items-end mb-6">
          <div>
            <h1 className="font-headline-lg text-headline-lg text-on-background mb-2">Bots en Minas</h1>
            <p className="text-on-surface-variant font-body-sm max-w-2xl">
              Activá acá a cualquier bot ya creado (desde "Bots de Bingo") para que juegue Minas de verdad: arranca
              rondas, revela casilleros y cobra solo, con las mismas probabilidades reales del juego. Sus ganancias
              suman al ranking de "Top Ganadores" de Minas.
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
                    <th className="px-6 py-4 font-label-lg text-label-lg text-primary uppercase tracking-wider text-right">Fichas</th>
                    <th className="px-6 py-4 font-label-lg text-label-lg text-primary uppercase tracking-wider text-center">Activo</th>
                    <th className="px-6 py-4 font-label-lg text-label-lg text-primary uppercase tracking-wider text-center">Apuesta min-max</th>
                    <th className="px-6 py-4 font-label-lg text-label-lg text-primary uppercase tracking-wider text-center">Minas min-max</th>
                    <th className="px-6 py-4 font-label-lg text-label-lg text-primary uppercase tracking-wider text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10">
                  {bots.map((bot) => (
                    <tr key={bot.botId} className="hover:bg-surface-variant/20 transition-colors">
                      <td className="px-6 py-4 font-bold text-white">{bot.nick}</td>
                      <td className="px-6 py-4 text-right font-bold text-primary">{numberFormat(bot.chips)}</td>
                      <td className="px-6 py-4 text-center">
                        <input
                          type="checkbox"
                          checked={bot.enabled}
                          onChange={(e) => updateLocal(bot.botId, { enabled: e.target.checked })}
                          className="cursor-pointer w-4 h-4"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <select
                            value={bot.minBet}
                            onChange={(e) => updateLocal(bot.botId, { minBet: Number(e.target.value) })}
                            className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg px-2 py-1.5 text-xs text-on-surface outline-none focus:border-primary"
                          >
                            {FIXED_BET_VALUES.map((v) => (
                              <option key={v} value={v}>{numberFormat(v)}</option>
                            ))}
                          </select>
                          <span className="text-on-surface-variant text-xs">a</span>
                          <select
                            value={bot.maxBet}
                            onChange={(e) => updateLocal(bot.botId, { maxBet: Number(e.target.value) })}
                            className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg px-2 py-1.5 text-xs text-on-surface outline-none focus:border-primary"
                          >
                            {FIXED_BET_VALUES.map((v) => (
                              <option key={v} value={v}>{numberFormat(v)}</option>
                            ))}
                          </select>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <input
                            type="number"
                            min={1}
                            max={24}
                            value={bot.minMinesCount}
                            onChange={(e) => updateLocal(bot.botId, { minMinesCount: Number(e.target.value) })}
                            className="w-16 bg-surface-container-lowest border border-outline-variant/30 rounded-lg px-2 py-1.5 text-xs text-on-surface outline-none focus:border-primary text-center"
                          />
                          <span className="text-on-surface-variant text-xs">a</span>
                          <input
                            type="number"
                            min={1}
                            max={24}
                            value={bot.maxMinesCount}
                            onChange={(e) => updateLocal(bot.botId, { maxMinesCount: Number(e.target.value) })}
                            className="w-16 bg-surface-container-lowest border border-outline-variant/30 rounded-lg px-2 py-1.5 text-xs text-on-surface outline-none focus:border-primary text-center"
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => handleSave(bot)}
                          disabled={savingId === bot.botId}
                          className="px-3 py-1.5 rounded-lg text-xs font-bold bg-primary/10 text-primary hover:bg-primary/20 transition-colors cursor-pointer border-0 disabled:opacity-50"
                        >
                          {savingId === bot.botId ? "Guardando..." : "Guardar"}
                        </button>
                      </td>
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
