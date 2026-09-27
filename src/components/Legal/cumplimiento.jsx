import LegalPage from "./LegalPage";
import { LOCALE } from "../../i18n/locale";

const CONTENT = {
  es: {
    title: "Cumplimiento",
    updatedAt: "14/08/2026",
    intro: "Estas son las reglas básicas para que jugar en RoyalGames sea justo y agradable para todos. Se suman a nuestros Términos y Condiciones y a la Política de Privacidad.",
    sections: [
      {
        title: "1. Solo fichas ficticias, sin dinero real",
        content: "Todo lo que se juega en RoyalGames son fichas virtuales sin valor monetario. No se pueden retirar, canjear ni convertir a dinero real ni a ningún otro bien. Comprar fichas es una forma de seguir jugando, no una inversión.",
      },
      {
        title: "2. Edad recomendada",
        content: "RoyalGames está pensado como entretenimiento y recomendamos su uso a mayores de 18 años. Si sos menor, te pedimos jugar con la supervisión de un adulto responsable.",
      },
      {
        title: "3. Juego limpio",
        content: "Los resultados de los juegos son aleatorios e iguales para todos los jugadores. No se otorgan ventajas ocultas a nadie. Si detectamos el uso de bots, exploits o cualquier forma de trampa, la cuenta puede ser suspendida.",
      },
      {
        title: "4. Una cuenta por persona",
        content: "Cada jugador debe usar una sola cuenta. Crear cuentas múltiples para abusar de bonos de bienvenida, del sistema de regalo de fichas entre usuarios o de los rankings de premios está prohibido y puede derivar en la suspensión de todas las cuentas involucradas.",
      },
      {
        title: "5. Convivencia entre jugadores",
        content: "Mensajes, solicitudes de amistad y perfiles públicos están para disfrutar la comunidad, no para acosar a otros jugadores. Podés bloquear a cualquier usuario desde su perfil, y reportar comportamiento abusivo desde Mesa de Ayuda.",
      },
      {
        title: "6. Consecuencias por incumplimiento",
        content: "Según la gravedad, un incumplimiento de estas normas puede resultar en la advertencia, inactivación temporal o baneo definitivo de la cuenta, a criterio del equipo de RoyalGames.",
      },
      {
        title: "7. Cómo reportar un problema",
        content: "Si viste algo que rompe estas normas, o tenés dudas sobre si algo está permitido, escribinos por Contacto o abrí un ticket en Mesa de Ayuda.",
      },
    ],
  },
  en: {
    title: "Compliance",
    updatedAt: "08/14/2026",
    intro: "These are the basic rules for playing on RoyalGames to be fair and enjoyable for everyone. They add to our Terms and Conditions and our Privacy Policy.",
    sections: [
      {
        title: "1. Only fictional chips, no real money",
        content: "Everything played on RoyalGames uses virtual chips with no monetary value. They can't be withdrawn, redeemed, or converted into real money or any other good. Buying chips is a way to keep playing, not an investment.",
      },
      {
        title: "2. Recommended age",
        content: "RoyalGames is designed as entertainment and is recommended for people over 18. If you're a minor, please play under the supervision of a responsible adult.",
      },
      {
        title: "3. Fair play",
        content: "Game results are random and the same for every player. No one gets hidden advantages. If we detect the use of bots, exploits, or any form of cheating, the account may be suspended.",
      },
      {
        title: "4. One account per person",
        content: "Each player must use a single account. Creating multiple accounts to abuse welcome bonuses, the chip-gifting system between users, or the prize rankings is prohibited and can lead to the suspension of all accounts involved.",
      },
      {
        title: "5. Getting along with other players",
        content: "Messages, friend requests, and public profiles are there to enjoy the community, not to harass other players. You can block any user from their profile, and report abusive behavior from the Help Desk.",
      },
      {
        title: "6. Consequences for non-compliance",
        content: "Depending on severity, breaking these rules can result in a warning, a temporary suspension, or a permanent ban, at the discretion of the RoyalGames team.",
      },
      {
        title: "7. How to report a problem",
        content: "If you saw something that breaks these rules, or have questions about whether something is allowed, write to us via Contact or open a ticket at the Help Desk.",
      },
    ],
  },
  pt: {
    title: "Conformidade",
    updatedAt: "14/08/2026",
    intro: "Estas são as regras básicas para que jogar no RoyalGames seja justo e agradável para todos. Elas se somam aos nossos Termos e Condições e à Política de Privacidade.",
    sections: [
      {
        title: "1. Apenas fichas fictícias, sem dinheiro real",
        content: "Tudo o que se joga no RoyalGames são fichas virtuais sem valor monetário. Não podem ser sacadas, trocadas nem convertidas em dinheiro real ou qualquer outro bem. Comprar fichas é uma forma de continuar jogando, não um investimento.",
      },
      {
        title: "2. Idade recomendada",
        content: "O RoyalGames é pensado como entretenimento e recomendamos seu uso para maiores de 18 anos. Se você for menor de idade, pedimos que jogue com a supervisão de um adulto responsável.",
      },
      {
        title: "3. Jogo limpo",
        content: "Os resultados dos jogos são aleatórios e iguais para todos os jogadores. Ninguém recebe vantagens ocultas. Se detectarmos o uso de bots, exploits ou qualquer forma de trapaça, a conta pode ser suspensa.",
      },
      {
        title: "4. Uma conta por pessoa",
        content: "Cada jogador deve usar apenas uma conta. Criar múltiplas contas para abusar de bônus de boas-vindas, do sistema de presente de fichas entre usuários ou dos rankings de prêmios é proibido e pode resultar na suspensão de todas as contas envolvidas.",
      },
      {
        title: "5. Convivência entre jogadores",
        content: "Mensagens, solicitações de amizade e perfis públicos existem para aproveitar a comunidade, não para assediar outros jogadores. Você pode bloquear qualquer usuário a partir do perfil dele, e reportar comportamento abusivo pela Central de Ajuda.",
      },
      {
        title: "6. Consequências pelo descumprimento",
        content: "Dependendo da gravidade, o descumprimento destas normas pode resultar em advertência, inativação temporária ou banimento definitivo da conta, a critério da equipe do RoyalGames.",
      },
      {
        title: "7. Como reportar um problema",
        content: "Se você viu algo que quebra estas normas, ou tem dúvidas se algo é permitido, escreva para nós em Contato ou abra um chamado na Central de Ajuda.",
      },
    ],
  },
};

export default function Cumplimiento() {
  const { title, updatedAt, intro, sections } = CONTENT[LOCALE] ?? CONTENT.es;
  return <LegalPage title={title} updatedAt={updatedAt} intro={intro} sections={sections} />;
}
