import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { swalThemeConfig } from "../../../utils/formatters";
import {
  fetchBingoBots,
  fetchBingoBotRooms,
  createBingoBot,
  updateBingoBot,
  deleteBingoBot,
} from "../../../redux/actions";

const numberFormat = (n) => new Intl.NumberFormat("es-ES").format(n || 0);

const initialForm = {
  nick: "",
  sexo: "H",
  roomId: "",
  initialChips: 100000,
  minCardsPerGame: 1,
  maxCardsPerGame: 2,
  autoTopUpThreshold: 5000,
  autoTopUpAmount: 100000,
};

export default function BingoBots() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const viewerIsAdmin = useSelector((state) => state.currentUser?.role) === "admin";

  const [bots, setBots] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [forbidden, setForbidden] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);

  const loadData = async () => {
    try {
      setLoading(true);
      const [botsData, roomsData] = await Promise.all([
        dispatch(fetchBingoBots()),
        dispatch(fetchBingoBotRooms()),
      ]);
      setBots(botsData);
      // Salas reales de juego, no el chat/presence-only "lobby" (isLobby=true no tiene partidas).
      setRooms(roomsData.filter((r) => !r.isLobby));
    } catch (error) {
      if (error.response?.status === 403) setForbidden(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!viewerIsAdmin) {
      setLoading(false);
      return;
    }
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewerIsAdmin]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!form.nick.trim() || !form.roomId) {
      Swal.fire({ title: "Faltan datos", text: "Elegí un nick y una sala.", icon: "warning", ...swalThemeConfig });
      return;
    }
    setSubmitting(true);
    try {
      await dispatch(
        createBingoBot({
          nick: form.nick.trim(),
          sexo: form.sexo,
          roomId: form.roomId,
          initialChips: Number(form.initialChips),
          minCardsPerGame: Number(form.minCardsPerGame),
          maxCardsPerGame: Number(form.maxCardsPerGame),
          autoTopUpThreshold: Number(form.autoTopUpThreshold),
          autoTopUpAmount: Number(form.autoTopUpAmount),
        }),
      );
      setForm(initialForm);
      Swal.fire({ title: "Bot creado", icon: "success", timer: 1800, showConfirmButton: false, ...swalThemeConfig });
      await loadData();
    } catch (error) {
      Swal.fire({
        title: "No se pudo crear el bot",
        text: error.response?.data?.message || "Intentá de nuevo.",
        icon: "error",
        ...swalThemeConfig,
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleActive = async (bot) => {
    try {
      await dispatch(updateBingoBot(bot.id, { isActive: !bot.isActive }));
      setBots((prev) => prev.map((b) => (b.id === bot.id ? { ...b, isActive: !b.isActive } : b)));
    } catch (error) {
      Swal.fire({ title: "Error", text: "No se pudo actualizar el bot.", icon: "error", ...swalThemeConfig });
    }
  };

  const handleDelete = async (bot) => {
    const result = await Swal.fire({
      title: `¿Sacar a ${bot.nick} de "${bot.roomName}"?`,
      text: "El bot deja de jugar en esa sala. La cuenta y su historial no se borran.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sacar bot",
      cancelButtonText: "Cancelar",
      ...swalThemeConfig,
    });
    if (!result.isConfirmed) return;
    try {
      await dispatch(deleteBingoBot(bot.id));
      setBots((prev) => prev.filter((b) => b.id !== bot.id));
    } catch (error) {
      Swal.fire({ title: "Error", text: "No se pudo sacar al bot.", icon: "error", ...swalThemeConfig });
    }
  };

  if (!viewerIsAdmin || forbidden) {
    return (
      <div className="bg-background text-on-background min-h-screen pt-20 pb-12 flex items-center justify-center">
        <div className="text-center max-w-md px-6">
          <span className="material-symbols-outlined text-5xl text-on-surface-variant mb-4 block">lock</span>
          <h2 className="font-headline-md text-headline-md text-white mb-2">Acceso Restringido</h2>
          <p className="text-on-surface-variant text-sm mb-6">
            Los bots de Bingo son una palanca de la economía de la casa — solo administradores pueden crearlos o tocarlos.
          </p>
          <button
            onClick={() => navigate('/admin/dashboard')}
            className="px-6 py-2.5 rounded-xl border border-outline-variant/30 text-on-surface font-label-lg hover:bg-surface-variant/20 transition-all"
          >
            Volver al Panel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background text-on-background min-h-screen pt-20 pb-12">
      <div className="px-margin-desktop max-w-container-max mx-auto mb-8">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h1 className="font-headline-lg text-headline-lg text-on-background mb-2">Bots de Bingo</h1>
            <p className="text-on-surface-variant font-body-sm max-w-2xl">
              Cuentas automáticas que compran cartones y juegan solas en una sala para que se vea activa. Usan fichas
              ficticias — no participan de ningún ranking ni total del panel.
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

        {/* Crear bot */}
        <form
          onSubmit={handleCreate}
          className="bg-surface-container-high rounded-xl border border-outline-variant/20 p-6 mb-8 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          <div className="col-span-2 md:col-span-1">
            <label className="text-[10px] uppercase tracking-widest text-on-surface-variant mb-1 block">Nick</label>
            <input
              name="nick"
              value={form.nick}
              onChange={handleFormChange}
              placeholder="ej. lucia_bingo"
              className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-xl px-4 py-2.5 text-body-sm focus:border-primary outline-none text-on-surface"
            />
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-widest text-on-surface-variant mb-1 block">Género</label>
            <select
              name="sexo"
              value={form.sexo}
              onChange={handleFormChange}
              className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-xl px-4 py-2.5 text-body-sm focus:border-primary outline-none appearance-none text-on-surface"
            >
              <option value="H">Hombre</option>
              <option value="M">Mujer</option>
            </select>
          </div>
          <div className="col-span-2 md:col-span-1">
            <label className="text-[10px] uppercase tracking-widest text-on-surface-variant mb-1 block">Sala</label>
            <select
              name="roomId"
              value={form.roomId}
              onChange={handleFormChange}
              className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-xl px-4 py-2.5 text-body-sm focus:border-primary outline-none appearance-none text-on-surface"
            >
              <option value="">Elegir sala...</option>
              {rooms.map((room) => (
                <option key={room.id} value={room.id}>{room.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-widest text-on-surface-variant mb-1 block">Fichas iniciales</label>
            <input
              type="number" min="0" name="initialChips" value={form.initialChips} onChange={handleFormChange}
              className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-xl px-4 py-2.5 text-body-sm focus:border-primary outline-none text-on-surface"
            />
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-widest text-on-surface-variant mb-1 block">Min. cartones/partida</label>
            <input
              type="number" min="1" max="24" name="minCardsPerGame" value={form.minCardsPerGame} onChange={handleFormChange}
              className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-xl px-4 py-2.5 text-body-sm focus:border-primary outline-none text-on-surface"
            />
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-widest text-on-surface-variant mb-1 block">Máx. cartones/partida</label>
            <input
              type="number" min="1" max="24" name="maxCardsPerGame" value={form.maxCardsPerGame} onChange={handleFormChange}
              className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-xl px-4 py-2.5 text-body-sm focus:border-primary outline-none text-on-surface"
            />
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-widest text-on-surface-variant mb-1 block">Auto-recarga: umbral</label>
            <input
              type="number" min="0" name="autoTopUpThreshold" value={form.autoTopUpThreshold} onChange={handleFormChange}
              className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-xl px-4 py-2.5 text-body-sm focus:border-primary outline-none text-on-surface"
            />
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-widest text-on-surface-variant mb-1 block">Auto-recarga: monto</label>
            <input
              type="number" min="0" name="autoTopUpAmount" value={form.autoTopUpAmount} onChange={handleFormChange}
              className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-xl px-4 py-2.5 text-body-sm focus:border-primary outline-none text-on-surface"
            />
          </div>
          <div className="col-span-2 md:col-span-4 flex justify-end">
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2.5 rounded-xl bg-primary text-on-primary font-bold font-label-lg hover:brightness-110 transition-all active:scale-95 disabled:opacity-50 flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">smart_toy</span>
              {submitting ? "Creando..." : "Crear bot"}
            </button>
          </div>
        </form>
      </div>

      <div className="px-margin-desktop max-w-container-max mx-auto">
        <div className="bg-surface-container rounded-xl border border-outline-variant/20 overflow-hidden">
          {loading ? (
            <div className="flex flex-col items-center justify-center p-12 gap-3">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
              <span className="text-sm text-on-surface-variant">Cargando bots...</span>
            </div>
          ) : bots.length === 0 ? (
            <p className="p-12 text-center text-on-surface-variant">Todavía no creaste ningún bot.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-high border-b border-outline-variant/30">
                    <th className="px-6 py-4 font-label-lg text-label-lg text-primary uppercase tracking-wider">Nick</th>
                    <th className="px-6 py-4 font-label-lg text-label-lg text-primary uppercase tracking-wider">Sala</th>
                    <th className="px-6 py-4 font-label-lg text-label-lg text-primary uppercase tracking-wider text-right">Fichas</th>
                    <th className="px-6 py-4 font-label-lg text-label-lg text-primary uppercase tracking-wider text-center">Cartones/partida</th>
                    <th className="px-6 py-4 font-label-lg text-label-lg text-primary uppercase tracking-wider text-center">Auto-recarga</th>
                    <th className="px-6 py-4 font-label-lg text-label-lg text-primary uppercase tracking-wider text-center">Estado</th>
                    <th className="px-6 py-4 font-label-lg text-label-lg text-primary uppercase tracking-wider text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10">
                  {bots.map((bot) => (
                    <tr key={bot.id} className="hover:bg-surface-variant/20 transition-colors">
                      <td className="px-6 py-4 font-bold text-white">{bot.nick}</td>
                      <td className="px-6 py-4 text-on-surface-variant text-sm">{bot.roomName}</td>
                      <td className="px-6 py-4 text-right font-bold text-primary">{numberFormat(bot.chips)}</td>
                      <td className="px-6 py-4 text-center text-on-surface text-sm">{bot.minCardsPerGame}–{bot.maxCardsPerGame}</td>
                      <td className="px-6 py-4 text-center text-on-surface-variant text-xs">
                        &lt; {numberFormat(bot.autoTopUpThreshold)} → {numberFormat(bot.autoTopUpAmount)}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => handleToggleActive(bot)}
                          className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider cursor-pointer border-0 transition-colors ${
                            bot.isActive ? "bg-green-500/10 text-green-400 hover:bg-green-500/20" : "bg-gray-500/10 text-gray-400 hover:bg-gray-500/20"
                          }`}
                        >
                          {bot.isActive ? "Activo" : "Pausado"}
                        </button>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => handleDelete(bot)}
                          title="Sacar de la sala"
                          className="w-9 h-9 rounded-full flex items-center justify-center text-on-surface-variant hover:text-error hover:bg-error/10 transition-colors bg-transparent border-0 cursor-pointer mx-auto"
                        >
                          <span className="material-symbols-outlined text-[18px]">delete</span>
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
