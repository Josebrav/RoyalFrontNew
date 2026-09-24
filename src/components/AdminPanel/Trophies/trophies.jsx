import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import API_URL from "../../../api/rutaApi";
import { swalThemeConfig } from "../../../utils/formatters";
import { fetchAllTrophies, createTrophy, deleteTrophy } from "../../../redux/actions";

const initialForm = { nick: "", title: "", description: "" };

export default function Trophies() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.currentUser);
  const viewerCanManage = currentUser?.role === "admin" || currentUser?.role === "mod";

  const [trophies, setTrophies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [forbidden, setForbidden] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [file, setFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const loadTrophies = async () => {
    try {
      setLoading(true);
      const data = await dispatch(fetchAllTrophies());
      setTrophies(data);
    } catch (error) {
      if (error.response?.status === 403) setForbidden(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!viewerCanManage) {
      setLoading(false);
      return;
    }
    loadTrophies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewerCanManage]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nick = form.nick.trim();
    if (!nick || !form.title.trim() || !file) {
      Swal.fire({ title: "Faltan datos", text: "Completá el nick, el título y elegí una imagen.", icon: "warning", ...swalThemeConfig });
      return;
    }

    setSubmitting(true);
    try {
      // Resuelve el nick a userId antes de subir — mismo lookup que ya usa Mensajes.
      const { data: resolvedUser } = await axios.get(`${API_URL}/user-nick?nick=${encodeURIComponent(nick)}`);
      if (!resolvedUser?.id) {
        throw new Error("NOT_FOUND");
      }

      const formData = new FormData();
      formData.append("userId", resolvedUser.id);
      formData.append("title", form.title.trim());
      if (form.description.trim()) formData.append("description", form.description.trim());
      formData.append("image", file);

      await dispatch(createTrophy(formData));
      setForm(initialForm);
      setFile(null);
      Swal.fire({ title: "¡Trofeo otorgado!", icon: "success", timer: 1800, showConfirmButton: false, ...swalThemeConfig });
      await loadTrophies();
    } catch (error) {
      const isNotFound = error.message === "NOT_FOUND" || error.response?.status === 404;
      Swal.fire({
        title: isNotFound ? "No encontramos ese nick" : "No se pudo otorgar el trofeo",
        text: isNotFound ? `No existe ningún jugador con el nick "${nick}".` : error.response?.data?.message || "Intentá de nuevo.",
        icon: "error",
        ...swalThemeConfig,
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (trophy) => {
    const result = await Swal.fire({
      title: `¿Borrar el trofeo "${trophy.title}"?`,
      text: `Se lo saca del perfil de ${trophy.userNick}. No se puede deshacer.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Borrar",
      cancelButtonText: "Cancelar",
      ...swalThemeConfig,
    });
    if (!result.isConfirmed) return;
    try {
      await dispatch(deleteTrophy(trophy.id));
      setTrophies((prev) => prev.filter((t) => t.id !== trophy.id));
    } catch (error) {
      Swal.fire({ title: "Error", text: "No se pudo borrar el trofeo.", icon: "error", ...swalThemeConfig });
    }
  };

  if (!viewerCanManage || forbidden) {
    return (
      <div className="bg-background text-on-background min-h-screen pt-20 pb-12 flex items-center justify-center">
        <div className="text-center max-w-md px-6">
          <span className="material-symbols-outlined text-5xl text-on-surface-variant mb-4 block">lock</span>
          <h2 className="font-headline-md text-headline-md text-white mb-2">Acceso Restringido</h2>
          <p className="text-on-surface-variant text-sm mb-6">
            Otorgar trofeos es solo para administradores y moderadores.
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
            <h1 className="font-headline-lg text-headline-lg text-on-background mb-2">Trofeos</h1>
            <p className="text-on-surface-variant font-body-sm max-w-2xl">
              Otorgale a un ganador de torneo su trofeo — una imagen única que va a aparecer en la parte de abajo de su
              perfil.
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

        {/* Otorgar trofeo */}
        <form
          onSubmit={handleSubmit}
          className="bg-surface-container-high rounded-xl border border-outline-variant/20 p-6 mb-8 grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div>
            <label className="text-[10px] uppercase tracking-widest text-on-surface-variant mb-1 block">Nick del ganador</label>
            <input
              name="nick"
              value={form.nick}
              onChange={handleFormChange}
              placeholder="ej. josesito7"
              className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-xl px-4 py-2.5 text-body-sm focus:border-primary outline-none text-on-surface"
            />
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-widest text-on-surface-variant mb-1 block">Título del torneo</label>
            <input
              name="title"
              value={form.title}
              onChange={handleFormChange}
              placeholder="ej. Campeón Torneo de Verano 2026"
              className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-xl px-4 py-2.5 text-body-sm focus:border-primary outline-none text-on-surface"
            />
          </div>
          <div className="md:col-span-2">
            <label className="text-[10px] uppercase tracking-widest text-on-surface-variant mb-1 block">Descripción (opcional)</label>
            <input
              name="description"
              value={form.description}
              onChange={handleFormChange}
              placeholder="Detalle corto que se muestra junto al trofeo"
              className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-xl px-4 py-2.5 text-body-sm focus:border-primary outline-none text-on-surface"
            />
          </div>
          <div className="md:col-span-2">
            <label className="text-[10px] uppercase tracking-widest text-on-surface-variant mb-1 block">Imagen del trofeo</label>
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-xl px-4 py-2.5 text-body-sm text-on-surface file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-primary/15 file:text-primary file:text-xs file:font-bold file:uppercase file:cursor-pointer cursor-pointer"
            />
          </div>
          <div className="md:col-span-2 flex justify-end">
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2.5 rounded-xl bg-primary text-on-primary font-bold font-label-lg hover:brightness-110 transition-all active:scale-95 disabled:opacity-50 flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">trophy</span>
              {submitting ? "Otorgando..." : "Otorgar trofeo"}
            </button>
          </div>
        </form>
      </div>

      <div className="px-margin-desktop max-w-container-max mx-auto">
        <div className="bg-surface-container rounded-xl border border-outline-variant/20 overflow-hidden">
          {loading ? (
            <div className="flex flex-col items-center justify-center p-12 gap-3">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
              <span className="text-sm text-on-surface-variant">Cargando trofeos...</span>
            </div>
          ) : trophies.length === 0 ? (
            <p className="p-12 text-center text-on-surface-variant">Todavía no se otorgó ningún trofeo.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-high border-b border-outline-variant/30">
                    <th className="px-6 py-4 font-label-lg text-label-lg text-primary uppercase tracking-wider"></th>
                    <th className="px-6 py-4 font-label-lg text-label-lg text-primary uppercase tracking-wider">Ganador</th>
                    <th className="px-6 py-4 font-label-lg text-label-lg text-primary uppercase tracking-wider">Título</th>
                    <th className="px-6 py-4 font-label-lg text-label-lg text-primary uppercase tracking-wider">Fecha</th>
                    <th className="px-6 py-4 font-label-lg text-label-lg text-primary uppercase tracking-wider text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10">
                  {trophies.map((trophy) => (
                    <tr key={trophy.id} className="hover:bg-surface-variant/20 transition-colors">
                      <td className="px-6 py-3">
                        <img src={trophy.imageUrl} alt={trophy.title} className="w-12 h-12 object-contain rounded-lg bg-surface-container-lowest" />
                      </td>
                      <td className="px-6 py-3 font-bold text-white">{trophy.userNick || "(usuario eliminado)"}</td>
                      <td className="px-6 py-3 text-on-surface text-sm">{trophy.title}</td>
                      <td className="px-6 py-3 text-on-surface-variant text-xs">
                        {new Date(trophy.createdAt).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </td>
                      <td className="px-6 py-3 text-center">
                        <button
                          onClick={() => handleDelete(trophy)}
                          title="Borrar trofeo"
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
