import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { updateSiteContentText } from "../../redux/actions";
import { swalThemeConfig } from "../../utils/formatters";
import { LOCALE } from "../../i18n/locale";

// Wraps a static text block so admins/mods see a small "Editar" pencil next to it and can
// change it in place. Everyone else (and the DB, until someone edits it) just sees `children`
// as-is — only overrides are persisted server-side (see redux siteContent slice).
//
// Locale-aware: en los sitios en inglés/portugués (VITE_SITE_LOCALE), busca un override guardado
// bajo `${contentKey}.${LOCALE}` (así editarlo en inglés no pisa la versión en español) y, si no
// hay ninguno todavía, usa `translations[LOCALE]` como default en vez de `children` (que siempre
// es el español). Sin ese prop, o en el sitio en español, se comporta exactamente igual que antes.
export default function EditableText({ contentKey, children, translations, as: Tag = "p", className = "" }) {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.currentUser);
  const effectiveKey = LOCALE === "es" ? contentKey : `${contentKey}.${LOCALE}`;
  const override = useSelector((state) => state.siteContent[effectiveKey]);
  const canEdit = currentUser?.role === "admin" || currentUser?.role === "mod";
  const defaultText = LOCALE === "es" ? children : (translations?.[LOCALE] ?? children);
  const text = override?.type === "text" ? override.text : defaultText;

  if (!canEdit) {
    return <Tag className={className}>{text}</Tag>;
  }

  const handleEdit = async (e) => {
    e.stopPropagation();
    const { value } = await Swal.fire({
      title: "Editar texto",
      input: "textarea",
      inputValue: text,
      showCancelButton: true,
      confirmButtonText: "Guardar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#C9A84C",
      inputValidator: (val) => {
        if (!val || !val.trim()) return "El texto no puede estar vacío.";
      },
      ...swalThemeConfig,
    });
    if (value === undefined) return;
    try {
      await dispatch(updateSiteContentText(effectiveKey, value));
    } catch (error) {
      Swal.fire({ title: "Error", text: "No se pudo guardar el cambio.", icon: "error", ...swalThemeConfig });
    }
  };

  return (
    <div className="flex items-start gap-2">
      <Tag className={`${className} flex-1 min-w-0`}>{text}</Tag>
      <button
        type="button"
        onClick={handleEdit}
        title="Editar"
        className="mt-0.5 flex-shrink-0 w-6 h-6 rounded-full bg-black/50 hover:bg-black/70 border border-white/15 text-primary flex items-center justify-center transition-colors cursor-pointer"
      >
        <span className="material-symbols-outlined text-[13px]">edit</span>
      </button>
    </div>
  );
}
