import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import API_URL from "../../api/rutaApi";
import { swalThemeConfig } from "../../utils/formatters";
import { SOCIAL_LINKS, FacebookIcon, InstagramIcon } from "../ui/SocialIcons";

const CONTACT_EMAIL = "royalgames2025@gmail.com";
const CONTACT_PHONE = "+54 2996 26-2455";
const CONTACT_PHONE_HREF = "+542996262455";

export default function Contact() {
  const channels = [
    {
      icon: "mail",
      label: "Correo Electrónico",
      value: CONTACT_EMAIL,
      href: `mailto:${CONTACT_EMAIL}`,
    },
    {
      icon: "call",
      label: "Teléfono",
      value: CONTACT_PHONE,
      href: `tel:${CONTACT_PHONE_HREF}`,
    },
    {
      icon: InstagramIcon,
      label: "Instagram",
      value: "@royalgamesoficial",
      href: SOCIAL_LINKS.instagram,
    },
    {
      icon: FacebookIcon,
      label: "Facebook",
      value: "RoyalGames",
      href: SOCIAL_LINKS.facebook,
    },
  ];

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setSubmitting(true);
    try {
      await axios.post(`${API_URL}/contact`, {
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
      });
      setSent(true);
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      Swal.fire({
        title: "No se pudo enviar tu mensaje",
        text: error.response?.data?.message || "Intentá de nuevo más tarde.",
        icon: "error",
        ...swalThemeConfig,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="w-full max-w-3xl mx-auto p-6 md:p-8 my-16 pt-20 md:pt-24 text-on-surface">
      <h1 className="font-headline-lg text-headline-lg text-white mb-2">Contacto</h1>
      <p className="text-on-surface-variant text-sm mb-8">
        ¿Preferís escribirnos directo? Elegí el canal que más te acomode.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        {channels.map((channel) => {
          const Icon = channel.icon;
          return (
            <a
              key={channel.label}
              href={channel.href}
              target={channel.href.startsWith("http") ? "_blank" : undefined}
              rel={channel.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="glass-card rounded-xl p-6 flex flex-col items-center text-center gap-3 hover:border-primary/40 transition-all border border-transparent"
            >
              <span className="w-12 h-12 rounded-full gold-gradient flex items-center justify-center">
                {typeof Icon === "string" ? (
                  <span className="material-symbols-outlined text-black text-2xl">{Icon}</span>
                ) : (
                  <Icon className="w-6 h-6 text-black" />
                )}
              </span>
              <div>
                <p className="text-white font-bold">{channel.label}</p>
                <p className="text-on-surface-variant text-sm break-all">{channel.value}</p>
              </div>
            </a>
          );
        })}
      </div>

      {sent ? (
        <div className="glass-card rounded-xl p-8 text-center">
          <span className="material-symbols-outlined text-5xl text-primary mb-3 block">mark_email_read</span>
          <h2 className="font-headline-sm text-headline-sm text-white mb-2">¡Mensaje enviado!</h2>
          <p className="text-on-surface-variant mb-6">Gracias por escribirnos, te vamos a responder a la brevedad.</p>
          <button
            onClick={() => setSent(false)}
            className="px-6 py-2.5 rounded-lg border border-primary text-primary font-bold uppercase tracking-wider hover:bg-primary/10 cursor-pointer bg-transparent transition-all"
          >
            Enviar otro mensaje
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="glass-card rounded-xl p-6 space-y-4">
          <h2 className="font-headline-sm text-headline-sm text-white mb-1">Escribinos</h2>
          <div className="space-y-2">
            <label className="font-label-md text-label-md text-on-surface-variant block uppercase tracking-wider">Nombre</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-lg px-4 py-3 text-on-surface input-glow font-body-md text-sm"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="font-label-md text-label-md text-on-surface-variant block uppercase tracking-wider">Correo Electrónico</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-lg px-4 py-3 text-on-surface input-glow font-body-md text-sm"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="font-label-md text-label-md text-on-surface-variant block uppercase tracking-wider">Mensaje</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              placeholder="Contanos en qué te podemos ayudar..."
              className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-lg px-4 py-3 text-on-surface input-glow font-body-md text-sm resize-none"
              required
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 rounded-lg gold-gradient text-black font-bold uppercase tracking-wider cursor-pointer border-0 disabled:opacity-50"
          >
            {submitting ? "Enviando..." : "Enviar Mensaje"}
          </button>
        </form>
      )}

      <p className="text-on-surface-variant text-xs mt-8 text-center">
        ¿Tenés un problema con tu cuenta o una consulta puntual? Es más rápido si abrís un{" "}
        <Link to="/ayuda" className="text-primary hover:underline">ticket de ayuda</Link>.
      </p>
    </main>
  );
}
