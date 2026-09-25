import { useNavigate } from "react-router-dom";

const TermsAndConditions = () => {
  const navigate = useNavigate();

  const sections = [
    {
      title: "1. Naturaleza del servicio: entretenimiento, no apuestas con dinero real",
      content: "ROYALGAMES.ME es una plataforma de entretenimiento social. No es una casa de apuestas, un casino online con dinero real, ni un servicio de juego de azar regulado, y no ofrece, promete ni implica la posibilidad de ganar dinero real ni premios con valor monetario de ningún tipo. Todos los juegos, torneos, rankings, insignias y trofeos de la plataforma se desarrollan exclusivamente con fichas virtuales sin valor monetario real, presente ni futuro. RoyalGames no está diseñado, dirigido ni comercializado como un servicio de juego de azar con dinero real, y por esa misma razón no gestiona ni requiere una licencia de juego de azar/apuestas: al no existir posibilidad alguna de obtener dinero real o premios canjeables por dinero a través del uso de la plataforma, el servicio no encuadra dentro de esa regulación."
    },
    {
      title: "2. Fichas virtuales: sin valor monetario, sin canje, sin reventa",
      content: "Las fichas, trofeos, insignias de rango y cualquier otro elemento virtual de RoyalGames no constituyen dinero, valores, ni ningún instrumento financiero, y no representan una promesa de pago, premio ni ganancia real de ningún tipo. Las fichas no pueden canjearse, transferirse, venderse, intercambiarse ni convertirse por dinero real, criptomonedas, bienes, servicios ni ningún equivalente de valor, bajo ninguna circunstancia, ni dentro ni fuera de la plataforma. Ganar o perder fichas virtuales jugando en RoyalGames no tiene ningún efecto sobre el patrimonio real del usuario, y el éxito dentro de los juegos no garantiza ni implica ningún tipo de pago o compensación en dinero real, ahora ni en el futuro. Está expresamente prohibido comprar, vender, intercambiar o transferir fichas, cuentas o cualquier elemento del juego a cambio de dinero real fuera de la opción oficial de Recarga de Fichas de la plataforma; crear o participar de un mercado secundario de fichas es una violación grave de estos Términos y puede derivar en la suspensión inmediata y definitiva de la cuenta."
    },
    {
      title: "3. Registro y seguridad de la cuenta",
      content: "Para participar en los juegos, es necesario registrarse y crear una cuenta. Al hacerlo, te comprometes a proporcionar información precisa, actualizada y completa."
    },
    {
      title: "4. Uso permitido",
      content: "La página está destinada exclusivamente para entretenimiento personal y no puede ser utilizada para actividades ilegales, apuestas con dinero real, ni cualquier propósito no autorizado."
    },
    {
      title: "5. Normas de conducta",
      content: "Nos esforzamos por mantener un entorno amigable y seguro. No se tolerarán comportamientos abusivos, lenguaje ofensivo, ni actos de acoso hacia otros usuarios."
    },
    {
      title: "6. Compra de fichas: contenido digital, no es una inversión",
      content: "ROYALGAMES.ME puede ofrecer la opción de adquirir fichas adicionales mediante compras en la plataforma. Esa compra es la adquisición de una licencia de uso de contenido digital (fichas virtuales) para seguir disfrutando el servicio de entretenimiento — no es una apuesta, no es una inversión, y no es la compra de un activo con valor de reventa. Al realizar una compra, aceptás que las fichas adquiridas no tienen valor monetario, no generan ninguna expectativa de ganancia real, y no son reembolsables salvo en los casos exigidos por la legislación de protección al consumidor aplicable."
    },
    {
      title: "7. Privacidad y manejo de datos personales",
      content: "La privacidad de nuestros usuarios es una prioridad para nosotros. Consulta nuestra Política de Privacidad para entender cómo recopilamos, usamos y protegemos tu información personal."
    },
    {
      title: "8. Limitación de responsabilidad",
      content: "ROYALGAMES.ME no se hace responsable de ningún daño directo o indirecto derivado del uso de nuestra plataforma, incluyendo cualquier reclamo basado en una expectativa de ganancia, premio o valor monetario real que estos Términos ya aclaran que el servicio no ofrece."
    },
    {
      title: "9. Propiedad intelectual",
      content: "Todo el contenido de ROYALGAMES.ME está protegido por leyes de propiedad intelectual. No se permite la copia, reproducción o modificación de ningún material sin nuestro consentimiento previo."
    },
    {
      title: "10. Modificaciones de los Términos y Condiciones",
      content: "Nos reservamos el derecho de modificar estos Términos y Condiciones en cualquier momento. Los cambios se notificarán mediante una actualización en esta sección."
    },
    {
      title: "11. Jurisdicción y ley aplicable",
      content: "Estos Términos y Condiciones se regirán e interpretarán de acuerdo con las leyes del país correspondiente al usuario."
    },
  ];

  return (
    <div className="bg-background text-on-background min-h-screen pt-8 pb-24 md:pb-12 px-4 md:px-margin-desktop">
      <div className="max-w-container-max mx-auto space-y-8">
        {/* Título Principal */}
        <div className="text-center mb-12">
          <h1 className="text-display-lg md:text-display-lg font-headline-lg text-primary mb-3">
            Términos y Condiciones de Uso
          </h1>
          <p className="text-on-surface-variant text-body-md">
            Última actualización: 24/09/2026
          </p>
        </div>

        {/* Introducción */}
        <section className="bg-surface-container rounded-xl border border-outline-variant/20 p-6 md:p-8">
          <p className="text-body-lg text-on-surface leading-relaxed">
            Bienvenido a Royal Games. Al acceder a esta plataforma y utilizar nuestros servicios,
            aceptas los siguientes Términos y Condiciones de uso. Si no estás de acuerdo con alguna
            de las disposiciones, te pedimos que no utilices nuestros servicios.
          </p>
        </section>

        {/* Aviso destacado: lo más importante, antes de la lista numerada, para que nadie se lo
            salte por estar leído por arriba. Amplía el punto 1/2 de abajo, no los reemplaza. */}
        <section className="bg-amber-500/10 border-2 border-amber-500/40 rounded-xl p-6 md:p-8">
          <h2 className="font-headline-sm text-headline-sm text-amber-400 mb-3 flex items-center gap-2">
            <span className="material-symbols-outlined">warning</span>
            Aviso importante: esto no es un casino de apuestas con dinero real
          </h2>
          <p className="text-body-md text-on-surface leading-relaxed mb-3">
            RoyalGames es un servicio de <strong>entretenimiento social</strong>. No ofrecemos, prometemos ni
            implicamos la posibilidad de ganar dinero real ni premios con valor monetario de ningún tipo.
            Todo lo que se juega, gana o pierde dentro de la plataforma son fichas virtuales sin valor
            monetario real, presente ni futuro.
          </p>
          <p className="text-body-md text-on-surface leading-relaxed">
            Las fichas <strong>no pueden canjearse, transferirse, venderse ni convertirse por dinero real,
            criptomonedas, bienes ni servicios</strong>, bajo ninguna circunstancia. Comprar fichas es adquirir
            contenido digital para seguir jugando, no es una apuesta ni una inversión. Ver el detalle completo
            en los puntos 1 y 2 de más abajo.
          </p>
        </section>

        {/* Secciones */}
        <div className="space-y-4">
          {sections.map((section, index) => (
            <section
              key={index}
              className="bg-surface-container rounded-xl border border-outline-variant/20 p-6 hover:border-outline-variant/40 transition-colors"
            >
              <h2 className="font-headline-sm text-headline-sm text-primary mb-3">
                {section.title}
              </h2>
              <p className="text-body-md text-on-surface leading-relaxed">
                {section.content}
              </p>
            </section>
          ))}
        </div>

        {/* Botones de Acción */}
        <div className="bg-surface-container-high rounded-xl border border-outline-variant/20 p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => navigate(-1)}
              className="bg-primary text-on-primary font-label-lg px-8 py-3 rounded-xl hover:opacity-90 transition-opacity"
            >
              Aceptar y Volver
            </button>
            <button
              onClick={() => navigate("/")}
              className="border border-primary text-primary font-label-lg px-8 py-3 rounded-xl hover:bg-primary/10 transition-colors"
            >
              Ir al Inicio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
