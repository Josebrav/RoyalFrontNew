import { useSelector } from "react-redux";
import { Box, Spinner, Center } from "@chakra-ui/react";
import { tokenStore } from "../../api/tokenStore";

const Vestidor = () => {
  const currentUser = useSelector((state) => state.currentUser);
  const jugadorID = currentUser?.id || "default-id";
  // El access token vive en memoria (tokenStore), no en localStorage — ver Tarea 10.
  // TODO: si en algún momento se puede actualizar la app del Vestidor (S3, fuera de este
  // repo), migrar esto a un token corto scopeado vía POST /vestidor/session-token, igual
  // que hace Diamantes/Minas con /games/mines/session-token.
  const token = tokenStore.get() || "";
  // La URL de S3 sigue apuntando al bucket/carpeta "bazar": es el build de Unity ya
  // desplegado ahí, renombrar esto rompería el juego hasta que se suba a una ruta nueva.
  // No es visible para el usuario (va dentro de un iframe, no en la barra de direcciones).
  const vestidorURL = `https://baazaar.s3.us-east-2.amazonaws.com/bazar/index.html?jugadorID=${jugadorID}&token=${encodeURIComponent(token)}`;

  return (
    <Box
      w="100%"
      h="calc(100vh - 80px)"
      bg="gray.900"
      display="flex"
      flexDirection="column"
      overflow="hidden"
    >
      {jugadorID ? (
        <Box
          flex="1"
          position="relative"
          w="100%"
          h="100%"
          bg="gray.800"
          overflow="hidden"
        >
          <iframe
            src={vestidorURL}
            title="Vestidor"
            style={{
              width: "100%",
              height: "100%",
              border: "none",
              display: "block",
            }}
          />
        </Box>
      ) : (
        <Center h="100%">
          <Spinner size={{ base: "md", md: "xl" }} color="teal.300" />
        </Center>
      )}
    </Box>
  );
};

export default Vestidor;
