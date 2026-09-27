import LegalPage from "./LegalPage";
import { LOCALE } from "../../i18n/locale";

const CONTENT = {
  es: {
    title: "Política de Privacidad",
    updatedAt: "14/08/2026",
    intro: "En RoyalGames jugamos con fichas ficticias, pero nos tomamos en serio el cuidado de tus datos reales. Acá te contamos, en criollo, qué información guardamos y para qué la usamos.",
    sections: [
      {
        title: "1. Qué datos recopilamos",
        content: "Al crear tu cuenta guardamos solo tu nick, correo electrónico. Si vos elegís completarlos, también guardamos tu edad, país, avatar y descripción de perfil. Si te registrás con Google, recibimos tu nombre, correo y foto de perfil desde tu cuenta de Google.",
      },
      {
        title: "2. Qué datos generamos mientras jugás",
        content: "Registramos tu saldo de fichas, tus depósitos, los movimientos de fichas (compras, regalos, ajustes de un administrador) y las fichas ganadas en cada juego, para poder mostrarte tu historial y los rankings. También guardamos la última vez que estuviste activo y qué juego estás jugando, para las funciones de \"jugadores conectados\".",
      },
      {
        title: "3. Para qué usamos tus datos",
        content: "Usamos tu información únicamente para hacer funcionar la plataforma: identificarte al iniciar sesión, calcular tu rango, mostrar tu perfil a otros jugadores, procesar tus compras de fichas y responder tus consultas de soporte. No usamos tus datos para publicidad de terceros.",
      },
      {
        title: "4. Con quién compartimos información",
        content: "No vendemos ni compartimos tus datos personales con terceros, salvo con los procesadores de pago (como PayPal o Mercado Pago) estrictamente necesarios para completar una compra de fichas, y solo la información que ellos requieren para procesar el pago.",
      },
      {
        title: "5. Qué ven otros usuarios",
        content: "Tu nick, avatar, rango y descripción de perfil son públicos para otros jugadores. Tu correo electrónico y tu contraseña nunca se muestran a nadie, incluido el equipo de soporte.",
      },
      {
        title: "6. Seguridad de tu cuenta",
        content: "Tu contraseña se encripta al momento de registrarte. El acceso a la plataforma se maneja con tokens de sesión (JWT) que expiran, y podés cambiar tu contraseña o correo en cualquier momento desde Configuración de Perfil.",
      },
      {
        title: "7. Tus derechos sobre tu información",
        content: "Podés editar tus datos de perfil (nick, edad, país, descripción, avatar, correo y contraseña) cuando quieras desde Configuración. Si querés que eliminemos tu cuenta y tus datos, escribinos por Contacto o abrí un ticket en Mesa de Ayuda.",
      },
      {
        title: "8. Consultas sobre privacidad",
        content: "Si tenés dudas sobre cómo manejamos tu información, escribinos a royalgames2025@gmail.com.",
      },
    ],
  },
  en: {
    title: "Privacy Policy",
    updatedAt: "08/14/2026",
    intro: "At RoyalGames we play with fictional chips, but we take the care of your real data seriously. Here's a plain-language rundown of what information we keep and what we use it for.",
    sections: [
      {
        title: "1. What data we collect",
        content: "When you create your account we only store your nick and email. If you choose to fill them in, we also store your age, country, avatar, and profile bio. If you sign up with Google, we receive your name, email, and profile picture from your Google account.",
      },
      {
        title: "2. What data we generate while you play",
        content: "We record your chip balance, your deposits, your chip movements (purchases, gifts, admin adjustments) and the chips won in each game, so we can show you your history and the rankings. We also store the last time you were active and which game you're playing, for the \"players online\" features.",
      },
      {
        title: "3. What we use your data for",
        content: "We use your information only to make the platform work: identifying you at login, calculating your rank, showing your profile to other players, processing your chip purchases, and answering your support requests. We don't use your data for third-party advertising.",
      },
      {
        title: "4. Who we share information with",
        content: "We don't sell or share your personal data with third parties, except with payment processors (like PayPal or Mercado Pago) strictly necessary to complete a chip purchase, and only the information they require to process the payment.",
      },
      {
        title: "5. What other users see",
        content: "Your nick, avatar, rank, and profile bio are public to other players. Your email and password are never shown to anyone, including the support team.",
      },
      {
        title: "6. Your account's security",
        content: "Your password is encrypted when you register. Access to the platform is managed with session tokens (JWT) that expire, and you can change your password or email at any time from Profile Settings.",
      },
      {
        title: "7. Your rights over your information",
        content: "You can edit your profile data (nick, age, country, bio, avatar, email, and password) whenever you want from Settings. If you want us to delete your account and data, write to us via Contact or open a ticket at the Help Desk.",
      },
      {
        title: "8. Privacy questions",
        content: "If you have questions about how we handle your information, write to us at royalgames2025@gmail.com.",
      },
    ],
  },
  pt: {
    title: "Política de Privacidade",
    updatedAt: "14/08/2026",
    intro: "No RoyalGames jogamos com fichas fictícias, mas levamos a sério o cuidado com seus dados reais. Aqui explicamos, em linguagem simples, quais informações guardamos e para que as usamos.",
    sections: [
      {
        title: "1. Quais dados coletamos",
        content: "Ao criar sua conta, guardamos apenas seu nick e e-mail. Se você escolher preenchê-los, também guardamos sua idade, país, avatar e descrição de perfil. Se você se cadastrar com o Google, recebemos seu nome, e-mail e foto de perfil da sua conta do Google.",
      },
      {
        title: "2. Quais dados geramos enquanto você joga",
        content: "Registramos seu saldo de fichas, seus depósitos, as movimentações de fichas (compras, presentes, ajustes de um administrador) e as fichas ganhas em cada jogo, para poder mostrar seu histórico e os rankings. Também guardamos a última vez que você esteve ativo e qual jogo está jogando, para as funções de \"jogadores conectados\".",
      },
      {
        title: "3. Para que usamos seus dados",
        content: "Usamos suas informações apenas para fazer a plataforma funcionar: identificar você ao entrar, calcular seu ranking, mostrar seu perfil a outros jogadores, processar suas compras de fichas e responder suas consultas de suporte. Não usamos seus dados para publicidade de terceiros.",
      },
      {
        title: "4. Com quem compartilhamos informações",
        content: "Não vendemos nem compartilhamos seus dados pessoais com terceiros, exceto com os processadores de pagamento (como PayPal ou Mercado Pago) estritamente necessários para concluir uma compra de fichas, e apenas as informações que eles exigem para processar o pagamento.",
      },
      {
        title: "5. O que outros usuários veem",
        content: "Seu nick, avatar, ranking e descrição de perfil são públicos para outros jogadores. Seu e-mail e sua senha nunca são mostrados a ninguém, incluindo a equipe de suporte.",
      },
      {
        title: "6. Segurança da sua conta",
        content: "Sua senha é criptografada no momento do cadastro. O acesso à plataforma é gerenciado com tokens de sessão (JWT) que expiram, e você pode alterar sua senha ou e-mail a qualquer momento em Configurações de Perfil.",
      },
      {
        title: "7. Seus direitos sobre suas informações",
        content: "Você pode editar seus dados de perfil (nick, idade, país, descrição, avatar, e-mail e senha) quando quiser em Configurações. Se quiser que excluamos sua conta e seus dados, escreva para nós em Contato ou abra um chamado na Central de Ajuda.",
      },
      {
        title: "8. Dúvidas sobre privacidade",
        content: "Se tiver dúvidas sobre como lidamos com suas informações, escreva para royalgames2025@gmail.com.",
      },
    ],
  },
};

export default function Privacidad() {
  const { title, updatedAt, intro, sections } = CONTENT[LOCALE] ?? CONTENT.es;
  return <LegalPage title={title} updatedAt={updatedAt} intro={intro} sections={sections} />;
}
