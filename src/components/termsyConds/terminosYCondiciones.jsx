import { useNavigate } from "react-router-dom";
import { LOCALE } from "../../i18n/locale";
import { t } from "../../i18n/strings";

const CONTENT = {
  es: {
    heading: "Términos y Condiciones de Uso",
    updatedAt: "06/10/2026",
    intro: "Bienvenido a Royal Games. Al acceder a esta plataforma y utilizar nuestros servicios, aceptas los siguientes Términos y Condiciones de uso. Si no estás de acuerdo con alguna de las disposiciones, te pedimos que no utilices nuestros servicios.",
    noticeTitle: "Aviso importante: esto no es un casino de apuestas con dinero real",
    noticeP1: "RoyalGames es un servicio de entretenimiento social. No ofrecemos, prometemos ni implicamos la posibilidad de ganar dinero real ni premios con valor monetario de ningún tipo. Todo lo que se juega, gana o pierde dentro de la plataforma son fichas virtuales sin valor monetario real, presente ni futuro.",
    noticeP2: "Las fichas no pueden canjearse, transferirse, venderse ni convertirse por dinero real, criptomonedas, bienes ni servicios, bajo ninguna circunstancia. Comprar fichas es adquirir contenido digital para seguir jugando, no es una apuesta ni una inversión. Ver el detalle completo en los puntos 2 y 3 de más abajo.",
    acceptButton: "Aceptar y Volver",
    homeButton: "Ir al Inicio",
    sections: [
      {
        title: "1. Identificación del prestador del servicio",
        content: "ROYALGAMES.ME es operado por José Santos Bravo Parada (DNI 39.129.716, CUIL 23-39129716-9), persona física responsable de la plataforma. Para cualquier consulta, reclamo o notificación relacionada con estos Términos y Condiciones, podés escribirnos a royalgames2025@gmail.com."
      },
      {
        title: "2. Naturaleza del servicio: entretenimiento, no apuestas con dinero real",
        content: "ROYALGAMES.ME es una plataforma de entretenimiento social. No es una casa de apuestas, un casino online con dinero real, ni un servicio de juego de azar regulado, y no ofrece, promete ni implica la posibilidad de ganar dinero real ni premios con valor monetario de ningún tipo. Todos los juegos, torneos, rankings, insignias y trofeos de la plataforma se desarrollan exclusivamente con fichas virtuales sin valor monetario real, presente ni futuro. RoyalGames no está diseñado, dirigido ni comercializado como un servicio de juego de azar con dinero real, y por esa misma razón no gestiona ni requiere una licencia de juego de azar/apuestas: al no existir posibilidad alguna de obtener dinero real o premios canjeables por dinero a través del uso de la plataforma, el servicio no encuadra dentro de esa regulación."
      },
      {
        title: "3. Fichas virtuales: sin valor monetario, sin canje, sin reventa",
        content: "Las fichas, trofeos, insignias de rango y cualquier otro elemento virtual de RoyalGames no constituyen dinero, valores, ni ningún instrumento financiero, y no representan una promesa de pago, premio ni ganancia real de ningún tipo. Las fichas no pueden canjearse, transferirse, venderse, intercambiarse ni convertirse por dinero real, criptomonedas, bienes, servicios ni ningún equivalente de valor, bajo ninguna circunstancia, ni dentro ni fuera de la plataforma. Ganar o perder fichas virtuales jugando en RoyalGames no tiene ningún efecto sobre el patrimonio real del usuario, y el éxito dentro de los juegos no garantiza ni implica ningún tipo de pago o compensación en dinero real, ahora ni en el futuro. Está expresamente prohibido comprar, vender, intercambiar o transferir fichas, cuentas o cualquier elemento del juego a cambio de dinero real fuera de la opción oficial de Recarga de Fichas de la plataforma; crear o participar de un mercado secundario de fichas es una violación grave de estos Términos y puede derivar en la suspensión inmediata y definitiva de la cuenta."
      },
      {
        title: "4. Registro y seguridad de la cuenta",
        content: "Para participar en los juegos, es necesario registrarse y crear una cuenta. Al hacerlo, te comprometes a proporcionar información precisa, actualizada y completa."
      },
      {
        title: "5. Uso permitido",
        content: "La página está destinada exclusivamente para entretenimiento personal y no puede ser utilizada para actividades ilegales, apuestas con dinero real, ni cualquier propósito no autorizado."
      },
      {
        title: "6. Normas de conducta",
        content: "Nos esforzamos por mantener un entorno amigable y seguro. No se tolerarán comportamientos abusivos, lenguaje ofensivo, ni actos de acoso hacia otros usuarios."
      },
      {
        title: "7. Compra de fichas: contenido digital, no es una inversión",
        content: "ROYALGAMES.ME puede ofrecer la opción de adquirir fichas adicionales mediante compras en la plataforma. Esa compra es la adquisición de una licencia de uso de contenido digital (fichas virtuales) para seguir disfrutando el servicio de entretenimiento — no es una apuesta, no es una inversión, y no es la compra de un activo con valor de reventa. Al realizar una compra, aceptás que las fichas adquiridas no tienen valor monetario, no generan ninguna expectativa de ganancia real, y no son reembolsables salvo en los casos exigidos por la legislación de protección al consumidor aplicable."
      },
      {
        title: "8. Privacidad y manejo de datos personales",
        content: "La privacidad de nuestros usuarios es una prioridad para nosotros. Consulta nuestra Política de Privacidad para entender cómo recopilamos, usamos y protegemos tu información personal."
      },
      {
        title: "9. Limitación de responsabilidad",
        content: "ROYALGAMES.ME no se hace responsable de ningún daño directo o indirecto derivado del uso de nuestra plataforma, incluyendo cualquier reclamo basado en una expectativa de ganancia, premio o valor monetario real que estos Términos ya aclaran que el servicio no ofrece."
      },
      {
        title: "10. Propiedad intelectual",
        content: "Todo el contenido de ROYALGAMES.ME está protegido por leyes de propiedad intelectual. No se permite la copia, reproducción o modificación de ningún material sin nuestro consentimiento previo."
      },
      {
        title: "11. Modificaciones de los Términos y Condiciones",
        content: "Nos reservamos el derecho de modificar estos Términos y Condiciones en cualquier momento. Los cambios se notificarán mediante una actualización en esta sección."
      },
      {
        title: "12. Jurisdicción y ley aplicable",
        content: "Estos Términos y Condiciones se regirán e interpretarán de acuerdo con las leyes del país correspondiente al usuario."
      },
    ],
  },
  en: {
    heading: "Terms and Conditions of Use",
    updatedAt: "10/06/2026",
    intro: "Welcome to Royal Games. By accessing this platform and using our services, you accept the following Terms and Conditions of use. If you don't agree with any of these provisions, please don't use our services.",
    noticeTitle: "Important notice: this is not a real-money gambling casino",
    noticeP1: "RoyalGames is a social entertainment service. We do not offer, promise, or imply the possibility of winning real money or prizes with any monetary value. Everything played, won, or lost within the platform uses virtual chips with no real monetary value, present or future.",
    noticeP2: "Chips cannot be redeemed, transferred, sold, or converted into real money, cryptocurrencies, goods, or services, under any circumstances. Buying chips means acquiring digital content to keep playing — it is not a bet or an investment. See the full detail in points 2 and 3 below.",
    acceptButton: "Accept and Go Back",
    homeButton: "Go Home",
    sections: [
      {
        title: "1. Service provider identification",
        content: "ROYALGAMES.ME is operated by José Santos Bravo Parada (Argentine National ID / DNI 39.129.716, CUIL 23-39129716-9), the individual responsible for the platform. For any inquiry, claim, or notice related to these Terms and Conditions, you can write to us at royalgames2025@gmail.com."
      },
      {
        title: "2. Nature of the service: entertainment, not real-money gambling",
        content: "ROYALGAMES.ME is a social entertainment platform. It is not a betting house, an online real-money casino, or a regulated gambling service, and it does not offer, promise, or imply the possibility of winning real money or prizes of any monetary value. All games, tournaments, rankings, badges, and trophies on the platform run exclusively on virtual chips with no real monetary value, present or future. RoyalGames is not designed, aimed, or marketed as a real-money gambling service, and for that same reason it does not hold or require a gambling/betting license: since there is no possibility of obtaining real money or cash-redeemable prizes through use of the platform, the service does not fall under that regulation."
      },
      {
        title: "3. Virtual chips: no monetary value, no redemption, no resale",
        content: "Chips, trophies, rank badges, and any other virtual element of RoyalGames do not constitute money, securities, or any financial instrument, and do not represent a promise of payment, prize, or real winnings of any kind. Chips cannot be redeemed, transferred, sold, exchanged, or converted into real money, cryptocurrencies, goods, services, or any equivalent of value, under any circumstances, either inside or outside the platform. Winning or losing virtual chips while playing on RoyalGames has no effect on a user's real assets, and success within the games does not guarantee or imply any kind of real-money payment or compensation, now or in the future. It is expressly prohibited to buy, sell, exchange, or transfer chips, accounts, or any game element in exchange for real money outside the platform's official Chip Top-Up option; creating or taking part in a secondary market for chips is a serious violation of these Terms and can lead to the immediate and permanent suspension of the account."
      },
      {
        title: "4. Registration and account security",
        content: "To take part in the games, you need to register and create an account. By doing so, you agree to provide accurate, up-to-date, and complete information."
      },
      {
        title: "5. Permitted use",
        content: "The site is intended exclusively for personal entertainment and may not be used for illegal activities, real-money betting, or any unauthorized purpose."
      },
      {
        title: "6. Rules of conduct",
        content: "We strive to keep a friendly and safe environment. Abusive behavior, offensive language, or harassment of other users will not be tolerated."
      },
      {
        title: "7. Chip purchases: digital content, not an investment",
        content: "ROYALGAMES.ME may offer the option to buy additional chips through in-platform purchases. That purchase is the acquisition of a license to use digital content (virtual chips) to keep enjoying the entertainment service — it is not a bet, not an investment, and not the purchase of an asset with resale value. By making a purchase, you accept that the chips acquired have no monetary value, generate no expectation of real winnings, and are non-refundable except where required by applicable consumer-protection law."
      },
      {
        title: "8. Privacy and handling of personal data",
        content: "Our users' privacy is a priority for us. Please check our Privacy Policy to understand how we collect, use, and protect your personal information."
      },
      {
        title: "9. Limitation of liability",
        content: "ROYALGAMES.ME is not liable for any direct or indirect damage arising from the use of our platform, including any claim based on an expectation of real-money winnings, prizes, or monetary value that these Terms already clarify the service does not offer."
      },
      {
        title: "10. Intellectual property",
        content: "All content on ROYALGAMES.ME is protected by intellectual property law. Copying, reproducing, or modifying any material without our prior consent is not permitted."
      },
      {
        title: "11. Changes to the Terms and Conditions",
        content: "We reserve the right to modify these Terms and Conditions at any time. Changes will be notified via an update to this section."
      },
      {
        title: "12. Jurisdiction and applicable law",
        content: "These Terms and Conditions shall be governed and interpreted in accordance with the laws of the user's corresponding country."
      },
    ],
  },
  pt: {
    heading: "Termos e Condições de Uso",
    updatedAt: "06/10/2026",
    intro: "Bem-vindo ao Royal Games. Ao acessar esta plataforma e usar nossos serviços, você aceita os seguintes Termos e Condições de uso. Se você não concordar com alguma das disposições, pedimos que não utilize nossos serviços.",
    noticeTitle: "Aviso importante: isto não é um cassino de apostas com dinheiro real",
    noticeP1: "O RoyalGames é um serviço de entretenimento social. Não oferecemos, prometemos nem sugerimos a possibilidade de ganhar dinheiro real ou prêmios com qualquer valor monetário. Tudo o que se joga, ganha ou perde dentro da plataforma são fichas virtuais sem valor monetário real, presente ou futuro.",
    noticeP2: "As fichas não podem ser trocadas, transferidas, vendidas nem convertidas em dinheiro real, criptomoedas, bens ou serviços, sob nenhuma circunstância. Comprar fichas é adquirir conteúdo digital para continuar jogando, não é uma aposta nem um investimento. Veja o detalhe completo nos pontos 2 e 3 abaixo.",
    acceptButton: "Aceitar e Voltar",
    homeButton: "Ir para o Início",
    sections: [
      {
        title: "1. Identificação do prestador de serviço",
        content: "A ROYALGAMES.ME é operada por José Santos Bravo Parada (DNI 39.129.716, CUIL 23-39129716-9), pessoa física responsável pela plataforma. Para qualquer consulta, reclamação ou notificação relacionada a estes Termos e Condições, você pode escrever para royalgames2025@gmail.com."
      },
      {
        title: "2. Natureza do serviço: entretenimento, não apostas com dinheiro real",
        content: "ROYALGAMES.ME é uma plataforma de entretenimento social. Não é uma casa de apostas, um cassino online com dinheiro real, nem um serviço de jogos de azar regulamentado, e não oferece, promete nem sugere a possibilidade de ganhar dinheiro real ou prêmios com qualquer valor monetário. Todos os jogos, torneios, rankings, insígnias e troféus da plataforma funcionam exclusivamente com fichas virtuais sem valor monetário real, presente ou futuro. O RoyalGames não é projetado, direcionado nem comercializado como um serviço de jogos de azar com dinheiro real, e por esse mesmo motivo não possui nem requer uma licença de jogos de azar/apostas: como não existe possibilidade alguma de obter dinheiro real ou prêmios resgatáveis por dinheiro através do uso da plataforma, o serviço não se enquadra nessa regulamentação."
      },
      {
        title: "3. Fichas virtuais: sem valor monetário, sem resgate, sem revenda",
        content: "As fichas, troféus, insígnias de ranking e qualquer outro elemento virtual do RoyalGames não constituem dinheiro, valores mobiliários nem nenhum instrumento financeiro, e não representam uma promessa de pagamento, prêmio ou ganho real de nenhum tipo. As fichas não podem ser resgatadas, transferidas, vendidas, trocadas nem convertidas em dinheiro real, criptomoedas, bens, serviços ou qualquer equivalente de valor, sob nenhuma circunstância, seja dentro ou fora da plataforma. Ganhar ou perder fichas virtuais jogando no RoyalGames não tem nenhum efeito sobre o patrimônio real do usuário, e o sucesso dentro dos jogos não garante nem sugere nenhum tipo de pagamento ou compensação em dinheiro real, agora ou no futuro. É expressamente proibido comprar, vender, trocar ou transferir fichas, contas ou qualquer elemento do jogo em troca de dinheiro real fora da opção oficial de Recarga de Fichas da plataforma; criar ou participar de um mercado secundário de fichas é uma violação grave destes Termos e pode resultar na suspensão imediata e definitiva da conta."
      },
      {
        title: "4. Cadastro e segurança da conta",
        content: "Para participar dos jogos, é necessário se cadastrar e criar uma conta. Ao fazê-lo, você se compromete a fornecer informações precisas, atualizadas e completas."
      },
      {
        title: "5. Uso permitido",
        content: "O site é destinado exclusivamente ao entretenimento pessoal e não pode ser usado para atividades ilegais, apostas com dinheiro real, nem qualquer propósito não autorizado."
      },
      {
        title: "6. Normas de conduta",
        content: "Nos esforçamos para manter um ambiente amigável e seguro. Não serão tolerados comportamentos abusivos, linguagem ofensiva nem atos de assédio contra outros usuários."
      },
      {
        title: "7. Compra de fichas: conteúdo digital, não é um investimento",
        content: "A ROYALGAMES.ME pode oferecer a opção de adquirir fichas adicionais por meio de compras na plataforma. Essa compra é a aquisição de uma licença de uso de conteúdo digital (fichas virtuais) para continuar desfrutando do serviço de entretenimento — não é uma aposta, não é um investimento, e não é a compra de um ativo com valor de revenda. Ao realizar uma compra, você aceita que as fichas adquiridas não têm valor monetário, não geram nenhuma expectativa de ganho real, e não são reembolsáveis, exceto nos casos exigidos pela legislação de proteção ao consumidor aplicável."
      },
      {
        title: "8. Privacidade e tratamento de dados pessoais",
        content: "A privacidade dos nossos usuários é uma prioridade para nós. Consulte nossa Política de Privacidade para entender como coletamos, usamos e protegemos suas informações pessoais."
      },
      {
        title: "9. Limitação de responsabilidade",
        content: "A ROYALGAMES.ME não se responsabiliza por nenhum dano direto ou indireto decorrente do uso de nossa plataforma, incluindo qualquer reclamação baseada em uma expectativa de ganho, prêmio ou valor monetário real que estes Termos já esclarecem que o serviço não oferece."
      },
      {
        title: "10. Propriedade intelectual",
        content: "Todo o conteúdo da ROYALGAMES.ME está protegido por leis de propriedade intelectual. Não é permitida a cópia, reprodução ou modificação de nenhum material sem nosso consentimento prévio."
      },
      {
        title: "11. Modificações dos Termos e Condições",
        content: "Reservamo-nos o direito de modificar estes Termos e Condições a qualquer momento. As alterações serão notificadas por meio de uma atualização nesta seção."
      },
      {
        title: "12. Jurisdição e lei aplicável",
        content: "Estes Termos e Condições serão regidos e interpretados de acordo com as leis do país correspondente ao usuário."
      },
    ],
  },
};

const TermsAndConditions = () => {
  const navigate = useNavigate();
  const { heading, updatedAt, intro, noticeTitle, noticeP1, noticeP2, acceptButton, homeButton, sections } =
    CONTENT[LOCALE] ?? CONTENT.es;

  return (
    <div className="bg-background text-on-background min-h-screen pt-8 pb-24 md:pb-12 px-4 md:px-margin-desktop">
      <div className="max-w-container-max mx-auto space-y-8">
        {/* Título Principal */}
        <div className="text-center mb-12">
          <h1 className="text-display-lg md:text-display-lg font-headline-lg text-primary mb-3">
            {heading}
          </h1>
          <p className="text-on-surface-variant text-body-md">
            {t("legal.updatedAt")}: {updatedAt}
          </p>
        </div>

        {/* Introducción */}
        <section className="bg-surface-container rounded-xl border border-outline-variant/20 p-6 md:p-8">
          <p className="text-body-lg text-on-surface leading-relaxed">
            {intro}
          </p>
        </section>

        {/* Aviso destacado: lo más importante, antes de la lista numerada, para que nadie se lo
            salte por estar leído por arriba. Amplía el punto 1/2 de abajo, no los reemplaza. */}
        <section className="bg-amber-500/10 border-2 border-amber-500/40 rounded-xl p-6 md:p-8">
          <h2 className="font-headline-sm text-headline-sm text-amber-400 mb-3 flex items-center gap-2">
            <span className="material-symbols-outlined">warning</span>
            {noticeTitle}
          </h2>
          <p className="text-body-md text-on-surface leading-relaxed mb-3">
            {noticeP1}
          </p>
          <p className="text-body-md text-on-surface leading-relaxed">
            {noticeP2}
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
              {acceptButton}
            </button>
            <button
              onClick={() => navigate("/")}
              className="border border-primary text-primary font-label-lg px-8 py-3 rounded-xl hover:bg-primary/10 transition-colors"
            >
              {homeButton}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
