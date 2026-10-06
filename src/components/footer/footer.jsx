import { Link } from 'react-router-dom';
import rgamesLogo from '../../assets/LogoOficial.PNG';
import { t } from '../../i18n/strings';
import { SOCIAL_LINKS, FacebookIcon, InstagramIcon } from '../ui/SocialIcons';

function Footer() {
  return (
    <footer className="bg-surface py-20 px-6 border-t border-white/5 text-on-surface select-none">
      <div className="max-w-container-max mx-auto flex flex-col md:flex-row justify-between gap-12 text-left">
        {/* Left column: Brand information */}
        <div className="max-w-xs">
          <img
            alt="RGAMES"
            className="h-10 w-auto mb-8 grayscale brightness-200 object-contain"
            src={rgamesLogo}
          />
          <p className="text-on-surface-variant text-sm font-light leading-relaxed mb-6">
            {t("footer.tagline")}
          </p>
          <div className="flex items-center gap-3">
            <a
              href={SOCIAL_LINKS.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary/40 transition-colors"
            >
              <FacebookIcon className="w-4 h-4" />
            </a>
            <a
              href={SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary/40 transition-colors"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>
          </div>

          {/* Datos de contacto visibles (mail + teléfono), no solo detrás de un link a /contacto */}
          <div className="flex flex-col gap-2 mt-6 text-sm normal-case font-normal">
            <a href="mailto:royalgames2025@gmail.com" className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-[18px]">mail</span>
              royalgames2025@gmail.com
            </a>
            <a href="tel:+542996262455" className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-[18px]">call</span>
              +54 2996 26-2455
            </a>
          </div>
        </div>

        {/* Links grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-12 text-sm uppercase tracking-widest font-bold">
          <div className="flex flex-col gap-4">
            <h5 className="text-white mb-2 font-black">{t("footer.conserjeria")}</h5>
            <Link className="text-on-surface-variant hover:text-primary transition-colors normal-case font-normal" to="/contacto">
              {t("footer.contacto")}
            </Link>
            <Link className="text-on-surface-variant hover:text-primary transition-colors normal-case font-normal" to="/preguntas-frecuentes">
              {t("footer.faq")}
            </Link>
            <Link className="text-on-surface-variant hover:text-primary transition-colors normal-case font-normal" to="/ayuda">
              {t("footer.ayuda")}
            </Link>
          </div>
          <div className="flex flex-col gap-4">
            <h5 className="text-white mb-2 font-black">{t("footer.protocolo")}</h5>
            <Link className="text-on-surface-variant hover:text-primary transition-colors normal-case font-normal" to="/privacidad">
              {t("footer.privacidad")}
            </Link>
            <Link className="text-on-surface-variant hover:text-primary transition-colors normal-case font-normal" to="/terminos-y-condiciones">
              {t("footer.terminos")}
            </Link>
            <Link className="text-on-surface-variant hover:text-primary transition-colors normal-case font-normal" to="/cumplimiento">
              {t("footer.cumplimiento")}
            </Link>
          </div>
          <div className="flex flex-col gap-4">
            <h5 className="text-white mb-2 font-black">{t("footer.empresa")}</h5>
            <Link className="text-on-surface-variant hover:text-primary transition-colors normal-case font-normal" to="/trabaja-con-nosotros">
              {t("footer.trabaja")}
            </Link>
          </div>
        </div>
      </div>

      {/* Footer bottom bar */}
      <div className="max-w-container-max mx-auto mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-on-surface-variant font-bold tracking-widest uppercase">
        <p>{t("footer.rights")}</p>
      </div>
    </footer>
  );
}

export default Footer;
