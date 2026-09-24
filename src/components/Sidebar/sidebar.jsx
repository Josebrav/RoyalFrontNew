import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { fetchConversations } from "../../redux/actions/index";

// Ícono en su propia "chip" redondeada en vez de flotando suelto en la fila — le da a cada ítem
// peso visual propio y hace que el estado activo/hover se note en el ícono, no solo en el texto.
function RenderLinkBody({ icon, label, badge, isActive }) {
  return (
    <>
      <span
        className={`relative w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
          isActive ? "bg-primary/15" : "bg-surface-container-high group-hover:bg-surface-variant/50"
        }`}
      >
        <span className="material-symbols-outlined text-[19px]">{icon}</span>
        {!!badge && (
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-error border-2 border-surface-container" />
        )}
      </span>
      <span className="hidden lg:inline font-body-sm text-body-sm whitespace-nowrap">
        {label}
      </span>
      {!!badge && (
        <span className="hidden lg:inline-flex ml-auto bg-primary text-black text-[10px] font-bold rounded-full min-w-[18px] h-[18px] items-center justify-center px-1">
          {badge}
        </span>
      )}
      {/* Tooltip for collapsed (icon-only) state */}
      <span className="lg:hidden pointer-events-none absolute left-full ml-2 whitespace-nowrap rounded bg-surface-container-high border border-outline-variant/30 px-2 py-1 text-xs text-on-surface opacity-0 group-hover:opacity-100 transition-opacity z-50">
        {label}
      </span>
    </>
  );
}

// `divider` dibuja una línea fina arriba del grupo en vez de dejar todo el peso de la separación
// al espacio en blanco entre secciones — con tres grupos (Cuenta/Social/Administración) seguidos
// de flush, la separación por solo `gap` se sentía plana.
function SidebarGroup({ label, items, renderLink, divider }) {
  return (
    <div className={`flex flex-col gap-1 ${divider ? "pt-5 border-t border-outline-variant/10" : ""}`}>
      <p className="hidden lg:flex items-center gap-2 px-2.5 mb-1.5 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/60">
        <span className="w-3 h-px bg-primary/50"></span>
        {label}
      </p>
      {items.map(renderLink)}
    </div>
  );
}

export default function Sidebar() {
  const dispatch = useDispatch();
  const { currentUser, messages } = useSelector((state) => state);
  const location = useLocation();

  // Mods ven el panel de admin igual que los admins (todo excepto gestión de roles).
  const canAccessAdminPanel = currentUser?.role === "admin" || currentUser?.role === "mod";
  const unreadTotal = (messages?.conversations || []).reduce((sum, c) => sum + (c.unreadCount || 0), 0);

  useEffect(() => {
    if (currentUser?.id) {
      dispatch(fetchConversations());
    }
  }, [dispatch, currentUser?.id]);

  const accountItems = [
    { to: "/chips", icon: "paid", label: "Comprar Fichas" },
    { to: "/chips?tab=history", icon: "receipt_long", label: "Historial de Movimientos" },
  ];

  const socialItems = [
    { to: "/amigos", icon: "group", label: "Amigos" },
    { to: "/mensajes", icon: "forum", label: "Mensajes", badge: unreadTotal },
    { to: "/ayuda", icon: "support_agent", label: "Ayuda" },
  ];

  // "Cargas" es el listado global de depósitos de toda la plataforma (un resumen de dinero) —
  // queda admin-only, igual que el backend. Los mods igual pueden ver los depósitos de UN
  // cliente puntual, pero desde la sección "Actividad" del detalle de ese usuario, no acá.
  const adminItems = [
    { to: "/admin/dashboard", icon: "dashboard", label: "Panel Admin" },
    { to: "/admin/users", icon: "manage_accounts", label: "Usuarios" },
    { to: "/admin/tickets", icon: "support_agent", label: "Tickets" },
    ...(currentUser?.role === "admin" ? [{ to: "/admin/deposits", icon: "payments", label: "Cargas" }] : []),
    { to: "/admin/prizes", icon: "emoji_events", label: "Premios" },
    { to: "/admin/referrals", icon: "diversity_3", label: "Referidos" },
    { to: "/admin/trophies", icon: "military_tech", label: "Trofeos" },
    // Palanca de la economía de la casa — admin-only, igual que "Cargas" arriba.
    ...(currentUser?.role === "admin" ? [{ to: "/admin/bingo-bots", icon: "smart_toy", label: "Bots" }] : []),
  ];

  if (!currentUser?.id || location.pathname.includes("/game")) {
    return null;
  }

  const renderLink = ({ to, icon, label, badge }) => (
    <NavLink
      key={to}
      to={to}
      className={({ isActive }) =>
        `group relative flex items-center justify-center lg:justify-start gap-3 w-12 h-12 lg:w-full lg:h-auto lg:px-2.5 lg:py-2 rounded-xl transition-all duration-200 ${
          isActive ? "text-primary" : "text-on-surface-variant hover:text-on-surface"
        }`
      }
    >
      {({ isActive }) => (
        <>
          {/* Riel de acento a la izquierda, marca el ítem activo sin depender solo del color del texto */}
          <span
            className={`hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full bg-primary transition-opacity ${
              isActive ? "opacity-100" : "opacity-0"
            }`}
          />
          <RenderLinkBody icon={icon} label={label} badge={badge} isActive={isActive} />
        </>
      )}
    </NavLink>
  );

  return (
    <aside className="hidden md:flex fixed left-0 top-20 bottom-0 z-40 w-16 lg:w-56 flex-col gap-5 bg-surface-container/90 backdrop-blur-md border-r border-outline-variant/30 px-2 lg:px-3 py-6 overflow-y-auto">
      <SidebarGroup label="Cuenta" items={accountItems} renderLink={renderLink} />
      <SidebarGroup label="Social" items={socialItems} renderLink={renderLink} divider />
      {canAccessAdminPanel && <SidebarGroup label="Administración" items={adminItems} renderLink={renderLink} divider />}
    </aside>
  );
}
