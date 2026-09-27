import { Link } from 'react-router-dom';
import rgamesLogo from '../../assets/LogoOficial.PNG';
import { t } from '../../i18n/strings';

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
