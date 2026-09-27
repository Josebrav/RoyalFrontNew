import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import EditableImage from "../../ui/EditableImage";
import { GAMES_CATALOG, CATEGORY_META, CATEGORY_ORDER } from "../../../data/gamesCatalog";

/** Panel para que admin/mod suban la portada de cualquier juego (activo o "próximamente") desde
 *  un solo lugar, con una vista previa grande — usa el mismo mecanismo de EditableImage/Cloudinary
 *  que ya existe en Home/GameDetail/catálogo, así que lo que se suba acá aparece en todos lados. */
export default function GameImages() {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.currentUser);
  const canAccess = currentUser?.role === "admin" || currentUser?.role === "mod";

  if (!canAccess) {
    return (
      <div className="bg-background text-on-background min-h-screen pt-20 pb-12 flex items-center justify-center">
        <div className="text-center max-w-md px-6">
          <span className="material-symbols-outlined text-5xl text-on-surface-variant mb-4 block">lock</span>
          <h2 className="font-headline-md text-headline-md text-white mb-2">Acceso Restringido</h2>
          <button
            onClick={() => navigate('/admin/dashboard')}
            className="px-6 py-2.5 rounded-xl border border-outline-variant/30 text-on-surface font-label-lg hover:bg-surface-variant/20 transition-all mt-4"
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
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="font-headline-lg text-headline-lg text-on-background mb-2">Imágenes de Juegos</h1>
            <p className="text-on-surface-variant font-body-sm max-w-2xl">
              Pasá el mouse sobre cualquier portada y usá el lápiz para subir una nueva — se guarda al toque y aparece
              en el Home, el catálogo y el detalle del juego a la vez. Incluye los juegos "Próximamente" para poder
              dejarles la imagen lista antes de que se activen.
            </p>
          </div>
          <button
            onClick={() => navigate('/admin/dashboard')}
            className="px-6 py-2.5 rounded-xl border border-outline-variant/30 text-on-surface font-label-lg hover:bg-surface-variant/20 transition-all flex items-center gap-2 flex-shrink-0"
          >
            <span className="material-symbols-outlined text-[18px]">dashboard</span>
            Volver al Panel
          </button>
        </div>

        <div className="space-y-10">
          {CATEGORY_ORDER.map((categoryKey) => {
            const games = GAMES_CATALOG.filter((g) => g.category === categoryKey);
            if (games.length === 0) return null;
            const meta = CATEGORY_META[categoryKey];

            return (
              <section key={categoryKey}>
                <h2 className={`text-xs font-black uppercase tracking-widest mb-4 ${meta.className}`}>{meta.label}</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
                  {games.map((game) => (
                    <div key={game.slug} className="flex flex-col gap-2">
                      <div className="relative aspect-[3/4] rounded-xl overflow-hidden border border-outline-variant/20 bg-surface-container-high">
                        <EditableImage
                          contentKey={`games.${game.slug}.cover`}
                          fallbackSrc={game.image}
                          fallbackIcon={game.icon}
                          alt={game.name}
                          className="w-full h-full object-cover"
                          recommendedSize="600×800px aprox. (vertical), JPG o PNG"
                        />
                      </div>
                      <div className="text-center">
                        <p className="font-bold text-label-md text-white truncate">{game.name}</p>
                        <span
                          className={`inline-block mt-0.5 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                            game.status === "active"
                              ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                              : "text-on-surface-variant/70 border border-outline-variant/30"
                          }`}
                        >
                          {game.status === "active" ? "Activo" : "Próximamente"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
