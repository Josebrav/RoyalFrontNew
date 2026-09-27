// Un solo repo, tres deploys de Vercel: cada uno setea VITE_SITE_LOCALE ('en'/'pt') en sus env
// vars; sin setearlo (el sitio actual en producción) sigue siendo 'es', cero cambio de
// comportamiento. Mismo patrón que API_URL en src/api/rutaApi.js.
export const LOCALE = import.meta.env.VITE_SITE_LOCALE || "es";
