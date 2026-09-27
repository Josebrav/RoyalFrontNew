import LegalPage from "./LegalPage";
import { LOCALE } from "../../i18n/locale";

const CONTENT = {
  es: {
    title: "Política de Privacidad",
    updatedAt: "27/09/2026",
    intro: "En RoyalGames jugamos con fichas ficticias, pero nos tomamos en serio el cuidado de tus datos reales. Esta política cumple con la Ley 25.326 de Protección de Datos Personales de la República Argentina, y acá te contamos, en criollo, qué información guardamos, para qué la usamos y qué derechos tenés sobre ella.",
    sections: [
      {
        title: "1. Quiénes somos",
        content: "RoyalGames (royalgames.lat) es una plataforma de entretenimiento social operada desde Argentina, responsable del tratamiento de los datos personales que recopilamos a través del sitio. Para cualquier consulta, reclamo o ejercicio de tus derechos sobre tus datos, podés escribirnos a royalgames2025@gmail.com.",
      },
      {
        title: "2. Qué datos recopilamos",
        content: "Al crear tu cuenta guardamos solo tu nick y tu correo electrónico. Si vos elegís completarlos, también guardamos tu edad, país, avatar y descripción de perfil. Si te registrás con Google, recibimos tu nombre, correo y foto de perfil desde tu cuenta de Google. Nunca pedimos datos sensibles (salud, origen étnico, opiniones políticas o religiosas) y no los necesitamos para nada de lo que ofrecemos.",
      },
      {
        title: "3. Qué datos generamos mientras jugás",
        content: "Registramos tu saldo de fichas, tus depósitos, los movimientos de fichas (compras, regalos, ajustes de un administrador) y las fichas ganadas en cada juego, para poder mostrarte tu historial y los rankings. También guardamos la última vez que estuviste activo y qué juego estás jugando, para las funciones de \"jugadores conectados\".",
      },
      {
        title: "4. Para qué usamos tus datos y con qué base legal",
        content: "Usamos tu información únicamente para hacer funcionar la plataforma: identificarte al iniciar sesión, calcular tu rango, mostrar tu perfil a otros jugadores, procesar tus compras de fichas y responder tus consultas de soporte. Tratamos estos datos porque diste tu consentimiento al registrarte y aceptar nuestros Términos y Condiciones, y porque son necesarios para poder prestarte el servicio que nos pediste. No usamos tus datos para publicidad de terceros ni los usamos con fines distintos a los descriptos acá.",
      },
      {
        title: "5. Con quién compartimos tu información",
        content: "No vendemos tus datos personales. Los compartimos únicamente con proveedores que necesitamos para poder ofrecerte el servicio, y solo con la información estrictamente necesaria para esa tarea puntual: procesadores de pago (como PayPal o Mercado Pago) para completar una compra de fichas, y proveedores de infraestructura técnica (hosting del servidor y almacenamiento de imágenes) que alojan la plataforma y actúan siempre bajo nuestras instrucciones, nunca por cuenta propia.",
      },
      {
        title: "6. Transferencia internacional de datos",
        content: "Algunos de los proveedores de infraestructura que usamos para operar RoyalGames (como el hosting del servidor y el almacenamiento de imágenes) están ubicados fuera de Argentina. Cuando esto implica transferir datos personales al exterior, lo hacemos solo con proveedores que ofrecen garantías de seguridad adecuadas, y únicamente en la medida necesaria para que el servicio funcione.",
      },
      {
        title: "7. Cuánto tiempo conservamos tus datos",
        content: "Conservamos tus datos mientras tu cuenta esté activa, para poder darte el servicio y mostrarte tu historial y rankings. Si pedís que eliminemos tu cuenta, borramos o anonimizamos tus datos personales dentro de un plazo razonable, salvo la información que estemos obligados a conservar por ley (por ejemplo, registros contables de una compra) o la necesaria para prevenir fraude.",
      },
      {
        title: "8. Qué ven otros usuarios",
        content: "Tu nick, avatar, rango y descripción de perfil son públicos para otros jugadores. Tu correo electrónico y tu contraseña nunca se muestran a nadie, incluido el equipo de soporte.",
      },
      {
        title: "9. Seguridad de tu cuenta y tus datos",
        content: "Tu contraseña se encripta al momento de registrarte y nunca la almacenamos en texto plano. El acceso a la plataforma se maneja con tokens de sesión (JWT) que expiran, y podés cambiar tu contraseña o correo en cualquier momento desde Configuración de Perfil. Aplicamos medidas de seguridad razonables para proteger tu información, aunque ningún sistema es 100% infalible — si detectamos un incidente que afecte tus datos, te lo vamos a informar.",
      },
      {
        title: "10. Tus derechos: acceso, rectificación, actualización, supresión y oposición",
        content: "La Ley 25.326 te reconoce el derecho a acceder a tus datos personales, rectificarlos o actualizarlos si están desactualizados o son incorrectos, pedir su supresión, y oponerte a un uso puntual que no te parezca correcto (derechos ARCO). Podés ejercer la mayoría de estos derechos vos mismo, cuando quieras, editando tu perfil (nick, edad, país, descripción, avatar, correo y contraseña) desde Configuración. Para pedir la eliminación de tu cuenta y tus datos, o cualquier otro reclamo sobre esta política, escribinos por Contacto, abrí un ticket en Mesa de Ayuda, o mandanos un correo a royalgames2025@gmail.com. Si no quedás conforme con nuestra respuesta, también podés hacer tu reclamo ante la Agencia de Acceso a la Información Pública (AAIP), el organismo de control de la Ley 25.326 en Argentina.",
      },
      {
        title: "11. Menores de edad",
        content: "RoyalGames está pensado para mayores de 18 años (ver nuestra página de Cumplimiento) y no solicitamos activamente datos de menores de edad. Si tomamos conocimiento de que un menor nos proporcionó datos personales sin la autorización correspondiente, vamos a eliminar esa información y dar de baja la cuenta asociada.",
      },
      {
        title: "12. Cambios a esta política",
        content: "Podemos actualizar esta Política de Privacidad para reflejar cambios en la plataforma o en la normativa aplicable. Si hacemos un cambio importante, lo vamos a anunciar en el sitio antes de que entre en vigencia. La fecha de \"Última actualización\" en la parte de arriba de esta página siempre indica la versión vigente.",
      },
      {
        title: "13. Consultas y reclamos sobre privacidad",
        content: "Si tenés dudas sobre cómo manejamos tu información, o querés hacer un reclamo formal, escribinos a royalgames2025@gmail.com.",
      },
    ],
  },
  en: {
    title: "Privacy Policy",
    updatedAt: "09/27/2026",
    intro: "At RoyalGames we play with fictional chips, but we take the care of your real data seriously. This policy follows Argentina's Personal Data Protection Law (Ley 25.326), and here's a plain-language rundown of what information we keep, what we use it for, and what rights you have over it.",
    sections: [
      {
        title: "1. Who we are",
        content: "RoyalGames (royalgames.lat) is a social entertainment platform operated from Argentina, responsible for the personal data we collect through the site. For any question, complaint, or to exercise your rights over your data, you can write to us at royalgames2025@gmail.com.",
      },
      {
        title: "2. What data we collect",
        content: "When you create your account we only store your nick and email. If you choose to fill them in, we also store your age, country, avatar, and profile bio. If you sign up with Google, we receive your name, email, and profile picture from your Google account. We never ask for sensitive data (health, ethnicity, political or religious views) and don't need it for anything we offer.",
      },
      {
        title: "3. What data we generate while you play",
        content: "We record your chip balance, your deposits, your chip movements (purchases, gifts, admin adjustments) and the chips won in each game, so we can show you your history and the rankings. We also store the last time you were active and which game you're playing, for the \"players online\" features.",
      },
      {
        title: "4. What we use your data for, and on what legal basis",
        content: "We use your information only to make the platform work: identifying you at login, calculating your rank, showing your profile to other players, processing your chip purchases, and answering your support requests. We process this data because you gave your consent when registering and accepting our Terms and Conditions, and because it's necessary to provide the service you asked for. We don't use your data for third-party advertising or for any purpose other than the ones described here.",
      },
      {
        title: "5. Who we share your information with",
        content: "We don't sell your personal data. We only share it with providers we need to deliver the service, and only the information strictly necessary for that specific task: payment processors (like PayPal or Mercado Pago) to complete a chip purchase, and technical infrastructure providers (server hosting and image storage) that host the platform and always act under our instructions, never on their own behalf.",
      },
      {
        title: "6. International data transfers",
        content: "Some of the infrastructure providers we use to run RoyalGames (such as server hosting and image storage) are located outside Argentina. When this involves transferring personal data abroad, we only do so with providers that offer adequate security guarantees, and only to the extent necessary for the service to work.",
      },
      {
        title: "7. How long we keep your data",
        content: "We keep your data while your account is active, so we can provide the service and show you your history and rankings. If you ask us to delete your account, we delete or anonymize your personal data within a reasonable time, except for information we're legally required to keep (for example, accounting records of a purchase) or information necessary to prevent fraud.",
      },
      {
        title: "8. What other users see",
        content: "Your nick, avatar, rank, and profile bio are public to other players. Your email and password are never shown to anyone, including the support team.",
      },
      {
        title: "9. Your account and data security",
        content: "Your password is encrypted when you register and we never store it in plain text. Access to the platform is managed with session tokens (JWT) that expire, and you can change your password or email at any time from Profile Settings. We apply reasonable security measures to protect your information, although no system is 100% foolproof — if we detect an incident affecting your data, we'll let you know.",
      },
      {
        title: "10. Your rights: access, rectification, update, erasure, and objection",
        content: "Argentina's Ley 25.326 recognizes your right to access your personal data, rectify or update it if it's outdated or incorrect, request its erasure, and object to a specific use you don't agree with. You can exercise most of these rights yourself, whenever you want, by editing your profile (nick, age, country, bio, avatar, email, and password) from Settings. To request deletion of your account and data, or for any other complaint about this policy, write to us via Contact, open a ticket at the Help Desk, or email royalgames2025@gmail.com. If you're not satisfied with our response, you can also file a complaint with Argentina's Agencia de Acceso a la Información Pública (AAIP), the oversight body for Ley 25.326.",
      },
      {
        title: "11. Minors",
        content: "RoyalGames is intended for people over 18 (see our Compliance page) and we don't actively request data from minors. If we become aware that a minor provided us personal data without proper authorization, we'll delete that information and deactivate the associated account.",
      },
      {
        title: "12. Changes to this policy",
        content: "We may update this Privacy Policy to reflect changes to the platform or to applicable regulations. If we make a significant change, we'll announce it on the site before it takes effect. The \"Last updated\" date at the top of this page always reflects the current version.",
      },
      {
        title: "13. Privacy questions and complaints",
        content: "If you have questions about how we handle your information, or want to file a formal complaint, write to us at royalgames2025@gmail.com.",
      },
    ],
  },
  pt: {
    title: "Política de Privacidade",
    updatedAt: "27/09/2026",
    intro: "No RoyalGames jogamos com fichas fictícias, mas levamos a sério o cuidado com seus dados reais. Esta política segue a Lei 25.326 de Proteção de Dados Pessoais da Argentina, e aqui explicamos, em linguagem simples, quais informações guardamos, para que as usamos e quais direitos você tem sobre elas.",
    sections: [
      {
        title: "1. Quem somos",
        content: "O RoyalGames (royalgames.lat) é uma plataforma de entretenimento social operada a partir da Argentina, responsável pelo tratamento dos dados pessoais que coletamos através do site. Para qualquer dúvida, reclamação ou para exercer seus direitos sobre seus dados, escreva para royalgames2025@gmail.com.",
      },
      {
        title: "2. Quais dados coletamos",
        content: "Ao criar sua conta, guardamos apenas seu nick e e-mail. Se você escolher preenchê-los, também guardamos sua idade, país, avatar e descrição de perfil. Se você se cadastrar com o Google, recebemos seu nome, e-mail e foto de perfil da sua conta do Google. Nunca pedimos dados sensíveis (saúde, etnia, opiniões políticas ou religiosas) e não precisamos deles para nada do que oferecemos.",
      },
      {
        title: "3. Quais dados geramos enquanto você joga",
        content: "Registramos seu saldo de fichas, seus depósitos, as movimentações de fichas (compras, presentes, ajustes de um administrador) e as fichas ganhas em cada jogo, para poder mostrar seu histórico e os rankings. Também guardamos a última vez que você esteve ativo e qual jogo está jogando, para as funções de \"jogadores conectados\".",
      },
      {
        title: "4. Para que usamos seus dados e com qual base legal",
        content: "Usamos suas informações apenas para fazer a plataforma funcionar: identificar você ao entrar, calcular seu ranking, mostrar seu perfil a outros jogadores, processar suas compras de fichas e responder suas consultas de suporte. Tratamos esses dados porque você deu seu consentimento ao se cadastrar e aceitar nossos Termos e Condições, e porque são necessários para prestar o serviço que você pediu. Não usamos seus dados para publicidade de terceiros nem para fins diferentes dos descritos aqui.",
      },
      {
        title: "5. Com quem compartilhamos suas informações",
        content: "Não vendemos seus dados pessoais. Compartilhamos apenas com fornecedores que precisamos para oferecer o serviço, e somente as informações estritamente necessárias para essa tarefa específica: processadores de pagamento (como PayPal ou Mercado Pago) para concluir uma compra de fichas, e fornecedores de infraestrutura técnica (hospedagem do servidor e armazenamento de imagens) que hospedam a plataforma e sempre atuam sob nossas instruções, nunca por conta própria.",
      },
      {
        title: "6. Transferência internacional de dados",
        content: "Alguns dos fornecedores de infraestrutura que usamos para operar o RoyalGames (como a hospedagem do servidor e o armazenamento de imagens) estão localizados fora da Argentina. Quando isso envolve transferir dados pessoais para o exterior, fazemos isso apenas com fornecedores que oferecem garantias de segurança adequadas, e somente na medida necessária para que o serviço funcione.",
      },
      {
        title: "7. Por quanto tempo guardamos seus dados",
        content: "Guardamos seus dados enquanto sua conta estiver ativa, para poder prestar o serviço e mostrar seu histórico e rankings. Se você pedir para excluirmos sua conta, apagamos ou anonimizamos seus dados pessoais dentro de um prazo razoável, exceto as informações que somos obrigados a manter por lei (por exemplo, registros contábeis de uma compra) ou necessárias para prevenir fraudes.",
      },
      {
        title: "8. O que outros usuários veem",
        content: "Seu nick, avatar, ranking e descrição de perfil são públicos para outros jogadores. Seu e-mail e sua senha nunca são mostrados a ninguém, incluindo a equipe de suporte.",
      },
      {
        title: "9. Segurança da sua conta e dos seus dados",
        content: "Sua senha é criptografada no momento do cadastro e nunca a armazenamos em texto simples. O acesso à plataforma é gerenciado com tokens de sessão (JWT) que expiram, e você pode alterar sua senha ou e-mail a qualquer momento em Configurações de Perfil. Aplicamos medidas de segurança razoáveis para proteger suas informações, embora nenhum sistema seja 100% infalível — se detectarmos um incidente que afete seus dados, vamos te avisar.",
      },
      {
        title: "10. Seus direitos: acesso, retificação, atualização, exclusão e oposição",
        content: "A Lei 25.326 da Argentina reconhece seu direito de acessar seus dados pessoais, retificá-los ou atualizá-los se estiverem desatualizados ou incorretos, pedir sua exclusão, e se opor a um uso específico com o qual você não concorde. Você pode exercer a maioria desses direitos por conta própria, quando quiser, editando seu perfil (nick, idade, país, descrição, avatar, e-mail e senha) em Configurações. Para pedir a exclusão da sua conta e dados, ou qualquer outra reclamação sobre esta política, escreva para nós em Contato, abra um chamado na Central de Ajuda, ou envie um e-mail para royalgames2025@gmail.com. Se não ficar satisfeito com nossa resposta, você também pode registrar uma reclamação junto à Agência de Acesso à Informação Pública (AAIP) da Argentina, o órgão de controle da Lei 25.326.",
      },
      {
        title: "11. Menores de idade",
        content: "O RoyalGames é destinado a maiores de 18 anos (veja nossa página de Conformidade) e não solicitamos ativamente dados de menores de idade. Se tomarmos conhecimento de que um menor nos forneceu dados pessoais sem a devida autorização, vamos excluir essa informação e desativar a conta associada.",
      },
      {
        title: "12. Alterações a esta política",
        content: "Podemos atualizar esta Política de Privacidade para refletir mudanças na plataforma ou na legislação aplicável. Se fizermos uma mudança importante, vamos anunciá-la no site antes que entre em vigor. A data de \"Última atualização\" no topo desta página sempre indica a versão vigente.",
      },
      {
        title: "13. Dúvidas e reclamações sobre privacidade",
        content: "Se tiver dúvidas sobre como lidamos com suas informações, ou quiser fazer uma reclamação formal, escreva para royalgames2025@gmail.com.",
      },
    ],
  },
};

export default function Privacidad() {
  const { title, updatedAt, intro, sections } = CONTENT[LOCALE] ?? CONTENT.es;
  return <LegalPage title={title} updatedAt={updatedAt} intro={intro} sections={sections} />;
}
