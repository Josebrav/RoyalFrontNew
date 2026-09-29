import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import axios from "axios";

import banner1 from "../../assets/banner1.png";
import sportsBanner from "../../assets/b1.jpg";
import bannercelu from "../../assets/bannercelu.png";
import logo from "../../assets/LogoOficial.PNG";

import Login from "../Login/login";
import RegistroForm from "../Register/register";
import { ShaderAnimation } from "../ui/shader-animation";
import { formatChips, swalThemeConfig } from "../../utils/formatters";
import GamesCatalog from "../GamesCatalog/gamesCatalog";
import DailySpinModal from "../DailySpin/DailySpinModal";
import EditableText from "../ui/EditableText";
import EditableImage from "../ui/EditableImage";
import BannerCarousel from "../ui/BannerCarousel";
import { GAMES_CATALOG, CATEGORY_META, getGameByPlayPath, getGameBySlug } from "../../data/gamesCatalog";
import { generateFakeOnlinePlayers } from "../../data/fakeOnlinePlayers";
import { fetchUserProfile } from "../../redux/actions";
import API_URL from "../../api/rutaApi";
import { useAuth } from "../../context/oauthContext";
import { t } from "../../i18n/strings";

const SIMULATED_ONLINE_MIN = 18;
const SIMULATED_ONLINE_MAX = 34;
const ACTIVE_GAMES = GAMES_CATALOG.filter((g) => g.status === "active");

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const { currentUser } = useSelector((state) => state);
  // Al recargar la página, restaurar la sesión (canjear la cookie httpOnly por un access token
  // nuevo) es async — mientras tanto currentUser?.id todavía es falsy en Redux, así que sin este
  // chequeo se alcanzaba a pintar la landing de invitado (con el botón de Iniciar Sesión) un
  // instante antes de que la sesión real apareciera y recién ahí saltara al dashboard. auth.loading
  // deja esperar ese instante en vez de comprometerse a una de las dos vistas de entrada.
  const auth = useAuth();
  // "Entrar como Invitado": shows the same dashboard a logged-in user sees, but with no
  // account behind it — the nav still offers Iniciar Sesión / Registrarse.
  const isGuestPreview = !currentUser?.id && searchParams.get("vista") === "invitado";

  const [topWinners, setTopWinners] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [recentWins, setRecentWins] = useState([]);
  // Target headcount for the simulated players blended into "Jugadores Conectados"
  // below (see fakeOnlinePlayers.js). Drifts slowly so the widget feels alive.
  const [simulatedOnlineTarget, setSimulatedOnlineTarget] = useState(
    () => SIMULATED_ONLINE_MIN + Math.floor(Math.random() * (SIMULATED_ONLINE_MAX - SIMULATED_ONLINE_MIN + 1))
  );

  // La ruleta ya NO aparece sola al loguearse (Unity tiene su propia pantalla de carga, se
  // sentia intrusivo) - se abre solo cuando el jugador clickea la tarjeta "Giro Diario VIP",
  // y dailySpinStatus (traido de GET /daily-spin/status) decide si esa tarjeta ofrece girar
  // o avisa que ya giro hoy.
  const [showDailySpin, setShowDailySpin] = useState(false);
  const [dailySpinStatus, setDailySpinStatus] = useState(null);
  useEffect(() => {
    if (!currentUser?.id) return;
    axios.get(`${API_URL}/daily-spin/status`).then(({ data }) => setDailySpinStatus(data)).catch(() => {});
  }, [currentUser?.id]);

  // Real recent wins (chips actually won in games) for the guest landing page ticker.
  useEffect(() => {
    if (currentUser?.id) return;
    axios.get(`${API_URL}/leaderboard/recent-wins?limit=12`).then(({ data }) => setRecentWins(data)).catch(() => {});
  }, [currentUser?.id]);

  // Scroll reveal animation observer
  useEffect(() => {
    if (currentUser?.id || isGuestPreview) return;

    const observerOptions = {
      threshold: 0.1,
    };

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll(".reveal");
    elements.forEach((el) => revealObserver.observe(el));

    // Red de seguridad: `.reveal` arranca en opacity:0 (ver index.css) y se queda así para
    // siempre si por lo que sea el IntersectionObserver nunca dispara (ej. el layout todavía no
    // asentó cuando se creó, o el navegador tarda en pintar) — eso deja el título y los botones
    // de "Iniciar Sesión"/"Registrarse" invisibles sin ningún error en consola, indistinguible de
    // una página realmente rota. Después de un instante, se fuerza "active" en todo lo que
    // todavía no lo tenga, sea cual sea la razón — nunca debería depender de esto en el uso
    // normal (el observer ya debería haber disparado antes), pero garantiza que el contenido de
    // arriba de la página SIEMPRE termine visible.
    const fallbackTimer = setTimeout(() => {
      document.querySelectorAll(".reveal:not(.active)").forEach((el) => el.classList.add("active"));
    }, 700);

    return () => {
      elements.forEach((el) => revealObserver.unobserve(el));
      clearTimeout(fallbackTimer);
    };
    // auth.loading en las deps: este efecto corre en CADA render de Home (los hooks son
    // incondicionales), incluido el primero, mientras auth.loading todavía es true y Home solo
    // muestra el spinner - en ese momento document.querySelectorAll(".reveal") no encuentra nada
    // porque el JSX de invitado (con los .reveal reales) ni se montó. Sin auth.loading acá, el
    // observer y el fallback de 700ms se arman contra ese DOM vacío y nunca se vuelven a armar
    // cuando el JSX de invitado por fin aparece - los .reveal reales se quedan en opacity:0 para
    // siempre (logo, texto y botones invisibles, aunque el fondo sí se vea porque no tiene esta
    // clase). Justo el bug reportado: "no aparecen los logos ni los botones la primera vez".
  }, [currentUser, auth.loading]);

  // Parallax effect for cards
  useEffect(() => {
    if (currentUser?.id || isGuestPreview) return;

    const handleMouseMove = (e) => {
      const cards = document.querySelectorAll(".glass-card-hover");
      const mouseX = e.clientX / window.innerWidth - 0.5;
      const mouseY = e.clientY / window.innerHeight - 0.5;

      cards.forEach((card, index) => {
        const factor = (index + 1) * 10;
        card.style.transform = `translate(${mouseX * factor}px, ${mouseY * factor}px) translateY(-8px)`;
      });
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [currentUser, auth.loading]);

  // Real top-winners leaderboard (chips actually won in games) + online players list
  useEffect(() => {
    if (!currentUser?.id) return;
    const fetchWidgets = () => {
      axios.get(`${API_URL}/leaderboard/top-winners?limit=5`).then(({ data }) => setTopWinners(data)).catch(() => {});
      axios.get(`${API_URL}/users/online`).then(({ data }) => setOnlineUsers(data)).catch(() => {});
      // Small random walk so the simulated headcount below feels like people are
      // actually coming and going instead of a static number.
      setSimulatedOnlineTarget((prev) => {
        const drifted = prev + Math.floor(Math.random() * 7) - 3;
        return Math.min(SIMULATED_ONLINE_MAX, Math.max(SIMULATED_ONLINE_MIN, drifted));
      });
    };
    fetchWidgets();
    const interval = setInterval(fetchWidgets, 60 * 1000);
    return () => clearInterval(interval);
  }, [currentUser?.id]);

  // Real online users blended with simulated ones so the widget hits simulatedOnlineTarget.
  // Memoized so the simulated names/games only reshuffle when the target or real list
  // actually changes, not on every unrelated re-render.
  const otherOnlineUsers = useMemo(() => {
    const realOnlineUsers = onlineUsers.filter((u) => u.id !== currentUser?.id);
    const simulatedPlayers = generateFakeOnlinePlayers(
      Math.max(0, simulatedOnlineTarget - realOnlineUsers.length),
      ACTIVE_GAMES
    );
    return [...realOnlineUsers, ...simulatedPlayers];
  }, [onlineUsers, simulatedOnlineTarget, currentUser?.id]);

  // Helper alerts and navigation functions
  const handlePlayGame = (path, title) => {
    if (path) {
      navigate(path);
    } else {
      Swal.fire({
        title: `${title}`,
        text: "¡Este juego estará disponible muy pronto! Nuestro equipo real está trabajando para traértelo.",
        icon: "info",
        ...swalThemeConfig,
      });
    }
  };

  const handleClaimDailySpin = () => {
    if (dailySpinStatus && !dailySpinStatus.canSpin) {
      Swal.fire({
        title: "Giro Diario VIP",
        text: "Ya reclamaste tu giro de hoy. ¡Volvé mañana por más fichas!",
        icon: "info",
        ...swalThemeConfig,
      });
      return;
    }
    setShowDailySpin(true);
  };

  const handleDailySpinResult = ({ amount, error }) => {
    setShowDailySpin(false);
    if (error) {
      Swal.fire({ title: "Giro Diario VIP", text: error, icon: "error", ...swalThemeConfig });
      return;
    }
    setDailySpinStatus({ canSpin: false, lastSpinAt: new Date().toISOString(), nextAvailableAt: null });
    dispatch(fetchUserProfile());
    Swal.fire({
      title: "Giro Diario VIP",
      text: `¡Ganaste ${new Intl.NumberFormat("es-ES").format(amount)} fichas! Se sumaron a tu balance.`,
      icon: "success",
      ...swalThemeConfig,
    });
  };

  const handleSoonAlert = (section) => {
    Swal.fire({
      title: section,
      text: "¡Esta promoción estará disponible muy pronto! Sigue atento a las novedades.",
      icon: "info",
      ...swalThemeConfig,
    });
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // --- RENDERING CONFIG ---

  console.log("[Home] render, auth.loading=", auth.loading, "currentUser?.id=", currentUser?.id, "isGuestPreview=", isGuestPreview);

  // Todavía no sabemos si hay sesión o no (ver comentario junto a `auth` arriba) — ni landing de
  // invitado ni dashboard todavía, solo un loader, para no pasar de una pantalla a otra de golpe.
  if (auth.loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // 1. Authenticated User Lobby Dashboard (also shown, with no account data, for the
  // "Entrar como Invitado" preview)
  if (currentUser?.id || isGuestPreview) {
    const formattedChipsValue = formatChips(currentUser?.chips);

    let vipLevel = "Bronce I";
    if (currentUser?.chips >= 1000000) {
      vipLevel = "VIP Platino I";
    } else if (currentUser?.chips >= 100000) {
      vipLevel = "Oro IV";
    } else if (currentUser?.chips >= 10000) {
      vipLevel = "Plata II";
    } else if (currentUser?.chips > 0) {
      vipLevel = "Bronce IV";
    }

    return (
      <div className="bg-background text-on-background font-body-md overflow-x-hidden min-h-screen select-none pb-24 md:pb-12">
        {showDailySpin && (
          <DailySpinModal onClose={() => setShowDailySpin(false)} onResult={handleDailySpinResult} />
        )}

        {/* Sticky Balance Bar (Below Navbar) */}
        {/* <div className="sticky top-16 z-40 bg-surface-container-low border-b border-outline-variant/10 px-4 md:px-margin-desktop py-2 flex items-center justify-between">
          <div className="flex gap-4 md:gap-8 overflow-x-auto no-scrollbar py-1">
            <div className="flex flex-col text-left">
              <span className="text-on-surface-variant text-[10px] uppercase font-bold tracking-widest">Balance Real</span>
              <span className="text-on-surface font-bold text-label-lg font-label-lg">{formattedChipsValue}</span>
            </div>
            <div className="flex flex-col text-left">
              <span className="text-on-surface-variant text-[10px] uppercase font-bold tracking-widest">Crédito de Bono</span>
              <span className="text-primary font-bold text-label-lg font-label-lg">$250.00</span>
            </div>
            <div className="flex flex-col text-left">
              <span className="text-on-surface-variant text-[10px] uppercase font-bold tracking-widest">Nivel VIP</span>
              <span className="text-secondary font-bold text-label-lg font-label-lg">{vipLevel}</span>
            </div>
          </div>
          <button
            onClick={() => navigate('/chips')}
            className="gold-gradient px-6 py-2 rounded-lg text-on-primary font-bold text-label-lg font-label-lg hover:scale-105 active:scale-95 transition-transform gold-glow cursor-pointer border-0"
          >
            Depositar
          </button>
        </div> */}

        {/* Dashboard Main Content */}
        <main className="pt-6 px-4 md:px-margin-desktop max-w-container-max mx-auto space-y-12 pb-16">
          {/* Promo Carousel Bento Grid */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-auto lg:h-[400px]">
            {/* Main Slide */}
            <div className="lg:col-span-8 relative rounded-xl overflow-hidden border border-outline-variant/30 group h-[320px] lg:h-full">
              <BannerCarousel
                fallbackSrc={banner1}
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
            </div>

            {/* Secondary promo slides/widgets */}
            <div className="lg:col-span-4 flex flex-col gap-6 h-[320px] lg:h-full">
              <div 
                onClick={() => handleSoonAlert('Recarga Semanal')}
                className="relative flex-1 rounded-xl overflow-hidden border border-outline-variant/30 group cursor-pointer"
              >
                <EditableImage
                  contentKey="home.dashboard.banner2"
                  fallbackSrc={sportsBanner}
                  alt="Banner de Recarga Semanal"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  recommendedSize="800×400px aprox., JPG o PNG"
                />
                {/* <div className="absolute inset-0 bg-black/40 p-6 flex flex-col justify-end text-left">
                  <h3 className="font-headline-sm text-headline-sm text-white">Recarga Semanal</h3>
                  <p className="text-on-surface-variant text-body-sm font-body-sm">Mejora tus fines de semana con un bono del 50%.</p>
                </div> */}
              </div>

              <div 
                onClick={() => handleSoonAlert('Premios Pragmatic')}
                className="relative flex-1 rounded-xl overflow-hidden border border-primary/40 group cursor-pointer gold-glow"
              >
                <EditableImage
                  contentKey="home.dashboard.banner3"
                  fallbackSrc={bannercelu}
                  alt="Banner de Premios Pragmatic"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  recommendedSize="800×400px aprox., JPG o PNG"
                />
                {/* <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-transparent p-6 flex flex-col justify-end text-left">
                  <h3 className="font-headline-sm text-headline-sm text-primary">Premios de Pragmatic</h3>
                  <p className="text-white text-body-sm font-body-sm">Ganancias diarias en todos tus favoritos.</p>
                </div> */}
              </div>
            </div>
          </section>

          {/* Popular Games & Active Tournament */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
            {/* Popular Games List */}
            <section className="xl:col-span-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-headline-sm text-headline-sm flex items-center gap-2 text-white">
                  <span className="material-symbols-outlined text-primary">star</span>
                  <EditableText contentKey="home.dashboard.popularGamesTitle" as="span">
                    {t("home.dashboard.popularGamesTitle")}
                  </EditableText>
                </h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => navigate('/juegos')}
                    className="w-8 h-8 rounded bg-surface-container border border-outline-variant/20 flex items-center justify-center hover:bg-surface-variant transition-colors text-on-surface cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-sm">chevron_left</span>
                  </button>
                  <button
                    onClick={() => navigate('/juegos')}
                    className="w-8 h-8 rounded bg-surface-container border border-outline-variant/20 flex items-center justify-center hover:bg-surface-variant transition-colors text-primary cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-sm">chevron_right</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {GAMES_CATALOG.filter((game) => game.status === "active").map((game) => (
                  <div
                    key={game.slug}
                    className="group relative bg-surface-container-high rounded-xl overflow-hidden border border-outline-variant/20 hover:border-primary/50 transition-all hover:-translate-y-1"
                  >
                    <div className="aspect-[3/4] overflow-hidden">
                      <EditableImage
                        contentKey={`games.${game.slug}.cover`}
                        fallbackSrc={game.image}
                        fallbackIcon={game.icon}
                        alt={game.name}
                        className="w-full h-full object-cover"
                        recommendedSize="600×800px aprox. (vertical), JPG o PNG"
                      />
                    </div>
                    <div className="p-3 text-left">
                      <span className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full mb-1.5 ${CATEGORY_META[game.category].chipClassName}`}>
                        {t(`catalog.category.${game.category}`)}
                      </span>
                      <h4 className="font-bold text-label-lg font-label-lg truncate text-white">{game.name}</h4>
                    </div>
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/85 flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handlePlayGame(game.playPath, game.name)}
                        className="gold-gradient w-3/4 py-2 rounded font-bold text-on-primary text-label-md cursor-pointer border-0"
                      >
                        {t("home.dashboard.jugar")}
                      </button>
                      <button
                        onClick={() => navigate(`/juegos/${game.slug}`)}
                        className="border border-primary bg-transparent text-primary w-3/4 py-2 rounded font-bold text-label-md hover:bg-primary/10 cursor-pointer"
                      >
                        {t("home.dashboard.info")}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Games Catalog by Category, filling the leftover height next to the taller sidebar */}
              <div className="mt-10 pt-8 border-t border-outline-variant/10">
                <GamesCatalog compact />
              </div>
            </section>

            {/* Top Winners + Online Players */}
            <aside className="xl:col-span-4 flex flex-col gap-6 text-left">
              {/* Top Winners Leaderboard */}
              <div
                className="bg-surface-container-high rounded-xl border border-emerald-400/30 overflow-hidden flex flex-col"
                style={{ boxShadow: "0 0 20px rgba(52, 211, 153, 0.15)" }}
              >
                <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-4 flex justify-between items-center">
                  <h3 className="text-white font-bold text-headline-sm font-headline-sm">{t("home.dashboard.topGanadores")}</h3>
                  <span className="bg-black/25 text-white px-2 py-1 rounded text-label-md font-label-md font-bold">{t("home.dashboard.enVivo")}</span>
                </div>
                <div className="p-6 space-y-3">
                  {topWinners.length === 0 ? (
                    <p className="text-on-surface-variant text-sm text-center py-4">
                      {t("home.dashboard.noPrizesYet")}
                    </p>
                  ) : (
                    topWinners.map((player, index) => (
                      <div
                        key={player.id}
                        className={`flex items-center justify-between p-3 rounded ${index === 0 ? "bg-surface border-l-4 border-emerald-400" : "bg-surface/50"}`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span className={`font-bold flex-shrink-0 ${index === 0 ? "text-emerald-400" : "text-on-surface-variant"}`}>
                            {index + 1}
                          </span>
                          <button
                            type="button"
                            onClick={() => navigate(`/perfil/${player.nick}`)}
                            className="font-bold text-white truncate hover:text-emerald-400 hover:underline cursor-pointer bg-transparent border-0 p-0 text-left"
                          >
                            {player.nick}
                          </button>
                        </div>
                        <span className={`font-bold flex-shrink-0 ${index === 0 ? "text-emerald-400" : "text-on-surface-variant"}`}>
                          {new Intl.NumberFormat('es-ES').format(player.totalWon)}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Online Players */}
              <div className="bg-surface-container-high rounded-xl border border-sky-400/20 overflow-hidden flex flex-col">
                <div className="p-4 border-b border-outline-variant/10 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse flex-shrink-0"></span>
                  <h3 className="font-bold text-headline-sm font-headline-sm text-white">
                    {otherOnlineUsers.length} {otherOnlineUsers.length === 1 ? t("home.dashboard.jugadorConectado") : t("home.dashboard.jugadoresConectados")}
                  </h3>
                </div>
                <div className="max-h-80 overflow-y-auto divide-y divide-outline-variant/10">
                  {otherOnlineUsers.length === 0 ? (
                    <p className="text-on-surface-variant text-sm text-center py-6 px-4">
                      {t("home.dashboard.noOtherPlayers")}
                    </p>
                  ) : (
                    otherOnlineUsers.map((player) => {
                      const activeGame = getGameByPlayPath(player.currentActivity);
                      // Simulated players (see fakeOnlinePlayers.js) have no real profile behind
                      // them, so only real players (real DB id) link out to /perfil/:nick.
                      const isRealPlayer = !player.id.startsWith("sim-");
                      return (
                        <div key={player.id} className="flex items-center justify-between gap-3 p-3">
                          <button
                            type="button"
                            disabled={!isRealPlayer}
                            onClick={() => isRealPlayer && navigate(`/perfil/${player.nick}`)}
                            className={`flex items-center gap-3 min-w-0 bg-transparent border-0 p-0 text-left ${isRealPlayer ? "cursor-pointer group" : "cursor-default"}`}
                          >
                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                              {(player.nick || "RG").slice(0, 2).toUpperCase()}
                            </div>
                            <div className="min-w-0">
                              <p className={`font-bold text-white text-sm truncate ${isRealPlayer ? "group-hover:text-sky-400 group-hover:underline" : ""}`}>
                                {player.nick}
                              </p>
                              <p className="text-[11px] text-on-surface-variant truncate">
                                {activeGame ? <span className="text-sky-400">{t("home.dashboard.jugandoA")} {activeGame.name}</span> : t("home.dashboard.enElSitio")}
                              </p>
                            </div>
                          </button>
                          {activeGame && (
                            <button
                              onClick={() => handlePlayGame(activeGame.playPath, activeGame.name)}
                              className="px-3 py-1.5 rounded bg-gradient-to-r from-sky-500 to-blue-600 text-white text-[11px] font-bold uppercase flex-shrink-0 cursor-pointer border-0 hover:brightness-110 transition-all"
                            >
                              {t("home.dashboard.jugarBtn")}
                            </button>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Tarjeta de Giro Diario VIP oculta a pedido (ver handleClaimDailySpin,
                  DailySpinModal y GET /daily-spin/status, todo intacto por si se retoma) */}
            </aside>
          </div>
        </main>

        {/* BottomNavBar (Mobile Only) */}
        <nav className="flex justify-around items-center h-16 px-4 md:hidden fixed bottom-0 w-full z-50 rounded-t-xl bg-surface-container border-t border-outline-variant/30 shadow-lg">
          <button 
            onClick={() => navigate('/')}
            className="text-primary flex flex-col items-center gap-1 transition-transform active:scale-90 duration-200 bg-transparent border-0 cursor-pointer"
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>home</span>
            <span className="font-label-md text-label-md">{t("home.dashboard.navInicio")}</span>
          </button>
          <button
            onClick={() => navigate('/juegos')}
            className="text-on-surface-variant hover:text-primary flex flex-col items-center gap-1 transition-transform active:scale-90 duration-200 bg-transparent border-0 cursor-pointer"
          >
            <span className="material-symbols-outlined">casino</span>
            <span className="font-label-md text-label-md">{t("home.dashboard.navJuegos")}</span>
          </button>
          <button
            onClick={() => navigate('/juegos')}
            className="text-on-surface-variant hover:text-primary flex flex-col items-center gap-1 transition-transform active:scale-90 duration-200 bg-transparent border-0 cursor-pointer"
          >
            <span className="material-symbols-outlined">search</span>
            <span className="font-label-md text-label-md">{t("home.dashboard.navBuscar")}</span>
          </button>
          <button
            onClick={() => navigate(currentUser?.nick ? `/perfil/${currentUser.nick}` : '/perfil')}
            className="text-on-surface-variant hover:text-primary flex flex-col items-center gap-1 transition-transform active:scale-90 duration-200 bg-transparent border-0 cursor-pointer"
          >
            <span className="material-symbols-outlined">account_circle</span>
            <span className="font-label-md text-label-md">{t("home.dashboard.navPerfil")}</span>
          </button>
        </nav>
      </div>
    );
  }

  // 2. Unauthenticated Guest Landing Page
  return (
    <div className="bg-background text-on-background font-body-md overflow-x-hidden min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden hero-section">
        <ShaderAnimation />
        {/* El shader de fondo (ver shader-animation.jsx) sale mucho más intenso/saturado en vivo
            de lo que sugiere su fórmula leída en frío — un overlay oscuro fuerte en TODA el área
            (no solo arriba/abajo como antes) es lo que lo deja como una textura de fondo sutil en
            vez de un remolino de colores que tapa el logo y hace ilegibles los botones. */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/55 to-background z-[1] pointer-events-none"></div>
        {/* Brillos de color en las esquinas, mismos tonos ya usados en las categorías de juegos
            del sitio (slots violeta, mensajes/otros teal) — van encima del overlay oscuro para que
            se noten sin volver a competir con el logo. */}
        <div
          className="absolute top-1/4 left-[20%] -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none z-[2]"
          style={{ background: "radial-gradient(circle, rgba(168,85,247,0.14) 0%, rgba(0,0,0,0) 70%)" }}
        ></div>
        <div
          className="absolute bottom-1/4 right-[20%] translate-x-1/2 translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none z-[2]"
          style={{ background: "radial-gradient(circle, rgba(45,212,191,0.12) 0%, rgba(0,0,0,0) 70%)" }}
        ></div>
        <div className="relative z-10 max-w-6xl w-full px-6 flex flex-col items-center justify-center">
          <div className="text-center reveal" style={{ transitionDelay: "0.2s" }}>
            <img
              src={logo}
              alt="RoyalGames"
              className="w-56 sm:w-72 md:w-[420px] h-auto object-contain mx-auto mb-4 drop-shadow-[0_0_40px_rgba(201,168,76,0.4)]"
            />
            <EditableText
              contentKey="home.heroTagline"
              className="text-on-surface-variant text-lg md:text-xl font-light tracking-tight mb-6"
              translations={{ en: "The best games site", pt: "A melhor página de jogos" }}
            >
              La mejor pagina de juegos
            </EditableText>
            <div className="flex flex-col items-center gap-6 relative">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <RegistroForm className="px-14 py-5 rounded-full gold-gradient text-black font-bold text-sm uppercase tracking-[0.2em] shadow-2xl btn-hover-glow transition-all cursor-pointer border-0">
                  {t("home.crearCuenta")}
                </RegistroForm>

                <button
                  onClick={() => window.dispatchEvent(new Event('open-login-modal'))}
                  className="px-14 py-5 rounded-full border-2 border-primary/50 text-primary font-bold text-sm uppercase tracking-[0.2em] hover:bg-primary/5 transition-all cursor-pointer bg-transparent"
                >
                  {t("home.iniciarSesion")}
                </button>
              </div>

              <button
                onClick={() => navigate('/?vista=invitado')}
                className="px-14 py-3 rounded-full text-on-surface-variant font-bold text-sm uppercase tracking-[0.2em] hover:text-primary transition-all cursor-pointer bg-transparent border-0"
              >
                {t("home.entrarInvitado")}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Live Winners Ticker */}
      {recentWins.length > 0 && (
        <div className="bg-surface border-y border-white/5 py-5 overflow-hidden reveal">
          <div className="animate-ticker">
            {[0, 1].map((dup) => (
              <div key={dup} className="flex gap-16 items-center px-8">
                {recentWins.map((win, i) => {
                  const gameName = getGameBySlug(win.game)?.name || "un juego";
                  return (
                    <div key={`${dup}-${win.id || i}`} className="flex items-center gap-4 whitespace-nowrap">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                      <span className="text-on-surface-variant font-medium">{t("home.tickerJugador")} <span className="text-primary font-bold">{win.nick}</span> {t("home.tickerGano")}</span>
                      <span className="text-white font-bold bg-white/5 px-3 py-1 rounded border border-white/10">
                        {new Intl.NumberFormat('es-ES').format(win.amount)} {t("home.tickerFichas")}
                      </span>
                      <span className="text-on-surface-variant/80 text-xs">{t("home.tickerEn")} {gameName}</span>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Games Catalog by Category */}
      <GamesCatalog />

      {/* Por qué jugar con nosotros */}
      <section className="py-32 px-6 border-t border-white/5">
        <div className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-3 gap-20">
          <div className="text-center reveal" style={{ transitionDelay: "0.1s" }}>
            <span className="material-symbols-outlined text-primary text-5xl mb-6">casino</span>
            <EditableText
              contentKey="home.why1.title"
              as="h4"
              className="text-white font-bold text-xl mb-4 tracking-tight"
              translations={{ en: "Clean, Fair Play", pt: "Jogo Limpo e Justo" }}
            >
              Juego Limpio y Parejo
            </EditableText>
            <EditableText
              contentKey="home.why1.text"
              className="text-on-surface-variant font-light text-sm leading-relaxed"
              translations={{
                en: "Results are always random, the same for everyone. This is about having fun, no house tricks.",
                pt: "Os resultados são sempre aleatórios, iguais para todos. Aqui se joga por diversão, sem truques da casa.",
              }}
            >
              Los resultados son siempre al azar, iguales para todos. Acá se juega por diversión, sin trampas de la casa.
            </EditableText>
          </div>

          <div className="text-center reveal" style={{ transitionDelay: "0.2s" }}>
            <span className="material-symbols-outlined text-primary text-5xl mb-6">shield_lock</span>
            <EditableText
              contentKey="home.why2.title"
              as="h4"
              className="text-white font-bold text-xl mb-4 tracking-tight"
              translations={{ en: "Your Account, Secure", pt: "Sua Conta, Segura" }}
            >
              Tu Cuenta, Segura
            </EditableText>
            <EditableText
              contentKey="home.why2.text"
              className="text-on-surface-variant font-light text-sm leading-relaxed"
              translations={{
                en: "We protect your data and progress with good security practices, so all you have to worry about is playing.",
                pt: "Cuidamos dos seus dados e do seu progresso com boas práticas de segurança, para que você só precise se preocupar em jogar.",
              }}
            >
              Cuidamos tus datos y tu progreso con buenas prácticas de seguridad, para que solo te preocupes por jugar.
            </EditableText>
          </div>

          <div className="text-center reveal" style={{ transitionDelay: "0.3s" }}>
            <span className="material-symbols-outlined text-primary text-5xl mb-6">support_agent</span>
            <EditableText
              contentKey="home.why3.title"
              as="h4"
              className="text-white font-bold text-xl mb-4 tracking-tight"
              translations={{ en: "We're Always With You", pt: "Estamos Sempre com Você" }}
            >
              Te Acompañamos Siempre
            </EditableText>
            <EditableText
              contentKey="home.why3.text"
              className="text-on-surface-variant font-light text-sm leading-relaxed"
              translations={{
                en: "Questions or an issue? Our real team is one message away — send us your query and we'll respond right away.",
                pt: "Dúvidas ou algum problema? Nossa equipe de verdade está a uma mensagem de distância, mande sua consulta e responderemos rapidinho.",
              }}
            >
              ¿Dudas o algún problema? Nuestro equipo real está a un mensaje de distancia, mandanos tu consulta y responderemos enseguida.
            </EditableText>
          </div>
        </div>
      </section>

      {/* BottomNavBar (Mobile Only for Guest) */}
      <nav className="fixed bottom-0 w-full z-50 rounded-t-xl bg-surface-container dark:bg-surface-container border-t border-outline-variant/30 shadow-lg flex justify-around items-center h-16 px-4 md:hidden">
        <button
          onClick={() => scrollToSection("hero-shader-canvas")}
          className="text-primary flex flex-col items-center gap-1 text-[11px] active:scale-90 transition-transform duration-200 bg-transparent border-0 cursor-pointer"
        >
          <span className="material-symbols-outlined">home</span>
          <span>{t("home.bottomNavInicio")}</span>
        </button>

        <button
          onClick={() => navigate("/juegos")}
          className="text-on-surface-variant hover:text-primary flex flex-col items-center gap-1 text-[11px] active:scale-90 transition-transform duration-200 bg-transparent border-0 cursor-pointer"
        >
          <span className="material-symbols-outlined">casino</span>
          <span>{t("home.bottomNavJuegos")}</span>
        </button>

        <button
          onClick={() => navigate("/juegos")}
          className="text-on-surface-variant hover:text-primary flex flex-col items-center gap-1 text-[11px] active:scale-90 transition-transform duration-200 bg-transparent border-0 cursor-pointer"
        >
          <span className="material-symbols-outlined">search</span>
          <span>{t("home.bottomNavBuscar")}</span>
        </button>

        <Login className="text-on-surface-variant hover:text-primary flex flex-col items-center gap-1 text-[11px] active:scale-90 transition-transform duration-200 bg-transparent border-0 p-0 font-normal cursor-pointer">
          <span className="material-symbols-outlined">login</span>
          <span>{t("home.bottomNavAcceder")}</span>
        </Login>
      </nav>
    </div>
  );
}
