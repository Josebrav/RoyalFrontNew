import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { CATEGORY_META, CATEGORY_ORDER, getGamesByCategory } from "../../data/gamesCatalog";
import { t } from "../../i18n/strings";

function GameRow({ game, compact }) {
  const navigate = useNavigate();
  const isActive = game.status === "active";
  // Mismo cover que un admin puede subir desde el carrusel de Home/detalle del juego (ver
  // EditableImage) - acá se lee sin el lápiz de edición (a este ícono de 40px no le entra), pero
  // se muestra igual para que sea consistente en todo el sitio.
  const override = useSelector((state) => state.siteContent[`games.${game.slug}.cover`]);
  const coverSrc = override?.type === "image" && override.imageUrl ? override.imageUrl : game.image;

  return (
    <button
      type="button"
      onClick={() => navigate(`/juegos/${game.slug}`)}
      className={`w-full flex items-start gap-3 ${compact ? "p-1.5" : "p-2.5"} rounded-xl text-left cursor-pointer transition-all bg-transparent border-0 hover:bg-surface-variant/30 ${
        isActive ? "" : "opacity-60 hover:opacity-90"
      }`}
    >
      <div
        className={`w-10 h-10 rounded-full overflow-hidden flex-shrink-0 flex items-center justify-center border ${
          isActive ? "border-primary/40 bg-primary/10" : "border-outline-variant/30 bg-surface-container-high grayscale"
        }`}
      >
        {coverSrc ? (
          <img src={coverSrc} alt={game.name} className="w-full h-full object-cover" />
        ) : (
          <span className={`material-symbols-outlined text-[20px] ${isActive ? "text-primary" : "text-on-surface-variant"}`}>
            {game.icon}
          </span>
        )}
      </div>
      <div className="min-w-0 flex-1 pt-1">
        <p className={`font-label-lg text-label-lg leading-tight ${isActive ? "text-white" : "text-on-surface-variant"}`}>
          {game.name}
        </p>
        {isActive ? (
          <span className="flex items-center gap-1 text-[11px] text-on-surface-variant mt-1">
            <span className="material-symbols-outlined text-[13px]">person</span>
            {new Intl.NumberFormat("es-ES").format(game.players)}
          </span>
        ) : (
          <span className="inline-block mt-1 text-[9px] font-bold uppercase tracking-wider text-on-surface-variant/70 border border-outline-variant/30 rounded-full px-2 py-0.5">
            {t("catalog.proximamente")}
          </span>
        )}
      </div>
    </button>
  );
}

export default function GamesCatalog({ compact = false }) {
  return (
    <section className={compact ? "" : "py-16 px-6 max-w-container-max mx-auto"}>
      <div className={compact ? "mb-4 text-left" : "text-center mb-8"}>
        <h2 className={compact
          ? "text-lg font-extrabold text-white tracking-tight uppercase flex items-center gap-2"
          : "text-3xl md:text-4xl font-extrabold text-white tracking-tighter uppercase mb-2"}
        >
          {compact && <span className="material-symbols-outlined text-primary">apps</span>}
          {t("catalog.title")}
        </h2>
        {!compact && (
          <p className="text-on-surface-variant font-light">
            {t("catalog.subtitle")}
          </p>
        )}
      </div>

      <div className={`columns-1 sm:columns-2 ${compact ? "lg:columns-3" : "xl:columns-3"} gap-x-6`}>
        {CATEGORY_ORDER.map((categoryKey) => {
          const meta = CATEGORY_META[categoryKey];
          const games = getGamesByCategory(categoryKey);
          if (games.length === 0) return null;

          return (
            <div key={categoryKey} className="break-inside-avoid mb-8">
              <h3 className={`text-xs font-black uppercase tracking-widest mb-3 ${meta.className}`}>
                {t(`catalog.category.${categoryKey}`)}
              </h3>
              <div className="space-y-1">
                {games.map((game) => (
                  <GameRow key={game.slug} game={game} compact={compact} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
