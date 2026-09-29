import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import logo from "../../assets/LogoOficial.PNG";
import { useAuth } from "../../context/oauthContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import API_URL from "../../api/rutaApi";
import { swalThemeConfig } from "../../utils/formatters";
import { t } from "../../i18n/strings";

// Flag a nivel de módulo: garantiza que initialize() corra solo una vez por carga de página
// (resiste React StrictMode que ejecuta efectos dos veces en desarrollo)
let gsiInitialized = false;

/**
 * Traduce el error de un intento de login a un mensaje entendible.
 * `authService.login` puede lanzar: un string (error.message de axios, p.ej. "Network Error"),
 * un Error de JS, o el body JSON de NestJS ({ statusCode, message, error }). Antes todo
 * esto se mostraba como "Contraseña incorrecta", lo que confundía a usuarios y a soporte.
 */
const getLoginErrorMessage = (error) => {
    if (!error) return t("login.err.generic");

    // axios sin respuesta del servidor -> error.message es un string
    if (typeof error === "string") {
        if (/network|failed to fetch/i.test(error)) {
            return t("login.err.network");
        }
        if (/timeout/i.test(error)) {
            return t("login.err.timeout");
        }
        return error;
    }

    if (error instanceof Error && error.message) return error.message;

    // Body de error de NestJS
    const status = error.statusCode || error.status;
    const backendMsg = Array.isArray(error.message) ? error.message[0] : error.message;

    if (status === 401) {
        // El backend avisa aparte cuando la cuenta se creó con Google (sin password)
        if (backendMsg && /google/i.test(backendMsg)) return backendMsg;
        return t("login.err.401");
    }
    if (status === 403) return backendMsg || t("login.err.403");
    if (status === 404) return t("login.err.404");
    if (status >= 500) return t("login.err.500");

    return backendMsg || t("login.err.generic");
};

export default function Login({ className, children }) {
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const auth = useAuth();
    const navigate = useNavigate();
    
    const [input, setInput] = useState({
        email: "",
        password: "",
    });

    const [show, setShow] = useState(false);

    const toggleLoginBox = () => setIsLoginOpen(!isLoginOpen);
    const handleClick = () => setShow(!show);

    const handleInputChange = (e) =>
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // `input.email` puede ser un email o un nick: el backend lo resuelve.
            await auth.login(input.email.trim(), input.password);

            setIsLoginOpen(false); // Cierra el modal
            navigate('/');
            Swal.fire({
                position: "center",
                icon: "success",
                title: t("login.successTitle"),
                showConfirmButton: false,
                timer: 2500,
            });

        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            Swal.fire({
                icon: "error",
                title: t("login.errorTitle"),
                text: getLoginErrorMessage(error),
                ...swalThemeConfig,
            });
        }
    };

    const googleBtnRef = useRef(null);

    // Callback de GSI en un ref: initialize() corre una sola vez, pero así siempre
    // usa la versión más reciente de auth/navigate.
    const googleCallbackRef = useRef(null);
    googleCallbackRef.current = async (response) => {
        try {
            Swal.fire({ title: t("login.googleLoadingTitle"), allowOutsideClick: false, didOpen: () => Swal.showLoading() });
            const result = await auth.loginWithGoogle(response.credential);
            setIsLoginOpen(false);
            navigate('/');
            if (result?.firstChipsReceived) {
                Swal.fire(t("login.firstChipsTitle"), t("login.firstChipsText"), "success");
            } else {
                Swal.fire({ position: "center", icon: "success", title: t("login.successTitle"), showConfirmButton: false, timer: 2500 });
            }
        } catch (error) {
            Swal.fire({ icon: "error", title: t("login.googleErrorTitle"), text: error?.message || t("login.googleErrorText"), confirmButtonColor: "#C9A84C" });
        }
    };

    // Inicializa GSI (una vez) y renderiza el botón oficial cuando el modal abre.
    // El script de Google carga async, así que puede no estar listo todavía: se reintenta
    // hasta ~5s. El div ref solo existe en el DOM cuando isLoginOpen = true.
    useEffect(() => {
        if (!isLoginOpen) return;

        const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
        if (!clientId) {
            console.error("[GSI] Falta VITE_GOOGLE_CLIENT_ID en el build");
            return;
        }

        let cancelled = false;
        let timer;
        const tryRender = (attempt = 0) => {
            if (cancelled) return;
            const gsi = window.google?.accounts?.id;
            if (!gsi || !googleBtnRef.current) {
                if (attempt < 50) timer = setTimeout(() => tryRender(attempt + 1), 100);
                else console.error("[GSI] El script de Google Identity Services no cargó");
                return;
            }

            if (!gsiInitialized) {
                gsiInitialized = true;
                gsi.initialize({
                    client_id: clientId,
                    use_fedcm_for_prompt: false,
                    callback: (response) => googleCallbackRef.current(response),
                });
            }

            gsi.renderButton(googleBtnRef.current, {
                theme: "outline",
                size: "large",
                width: googleBtnRef.current.offsetWidth || 400,
                text: "continue_with",
            });
        };
        tryRender();

        return () => {
            cancelled = true;
            clearTimeout(timer);
        };
    }, [isLoginOpen]);


    const handleRegister = (e) => {
        e.preventDefault();
        setIsLoginOpen(false);
        window.dispatchEvent(new Event("open-register-modal"));
    };

    // Abre el modal desde otros componentes
    useEffect(() => {
        const handleOpen = () => setIsLoginOpen(true);
        window.addEventListener("open-login-modal", handleOpen);
        return () => window.removeEventListener("open-login-modal", handleOpen);
    }, []);

    // Efecto de paralaje del brillo de fondo
    useEffect(() => {
        if (!isLoginOpen) return;
        const handleMouseMove = (e) => {
            const spots = document.querySelectorAll('.bg-glow-spot');
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            spots.forEach((spot, index) => {
                const moveX = (x - 0.5) * (index === 0 ? 50 : -50);
                const moveY = (y - 0.5) * (index === 0 ? 50 : -50);
                spot.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });
        };
        document.addEventListener('mousemove', handleMouseMove);
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, [isLoginOpen]);

    return (
        <>
          {/* Botón para abrir el cuadro de inicio de sesión */}
          <button
            onClick={toggleLoginBox}
            type="button"
            className={className || "px-4 py-2 rounded-lg border border-primary text-primary font-label-lg text-label-lg hover:bg-primary/10 transition-all font-bold cursor-pointer"}
          >
            {children || t("login.openButton")}
          </button>
    
          {/* Fondo oscuro y cuadro de inicio de sesión */}
          {isLoginOpen && createPortal(
            <div
              className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto"
              onClick={toggleLoginBox} // Cierra al hacer clic en el fondo oscuro
            >
              <div
                className="rounded-xl p-8 shadow-[0_25px_70px_-15px_rgba(0,0,0,0.65),0_0_50px_-12px_rgba(201,168,76,0.15)] border border-primary/15 relative max-w-md w-full space-y-6 z-10 my-8 overflow-hidden select-none"
                style={{ background: "linear-gradient(160deg, #1d1a26 0%, #131019 55%, #0b0a10 100%)" }}
                onClick={(e) => e.stopPropagation()} // Evita que el clic cierre el cuadro
              >
                {/* Filo dorado arriba, para que no se sienta como una caja plana */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent pointer-events-none"></div>

                {/* Atmospheric Background elements */}
                <div className="bg-glow-spot -top-20 -left-20 pointer-events-none"></div>
                <div className="bg-glow-spot -bottom-20 -right-20 pointer-events-none"></div>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={toggleLoginBox}
                  className="absolute top-4 right-4 text-outline hover:text-primary transition-colors cursor-pointer z-20"
                >
                  <span className="material-symbols-outlined text-[24px]">close</span>
                </button>

                {/* Brand Identity */}
                <div className="flex flex-col items-center relative z-10">
                  <div className="relative w-32 h-auto mb-6 transform hover:scale-105 transition-transform duration-300">
                    <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full -z-10"></div>
                    <img alt="Logo RGAMES" className="w-full h-auto object-contain drop-shadow-[0_0_18px_rgba(201,168,76,0.35)]" src={logo} />
                  </div>
                  <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight text-center">
                    {t("login.title")}
                  </h2>
                  <p className="mt-2 font-body-md text-body-md text-on-surface-variant text-center">
                    {t("login.subtitle")}
                  </p>
                </div>

                {/* Login Form */}
                <div className="relative z-10">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Email / Nickname Field */}
                    <div className="space-y-2">
                      <label className="block font-label-lg text-label-lg text-on-surface-variant" htmlFor="email">
                        {t("login.emailLabel")}
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="material-symbols-outlined text-outline text-[20px]">mail</span>
                        </div>
                        <input
                          autoComplete="username"
                          className="block w-full pl-10 pr-3 py-3 bg-surface-container-lowest border border-outline-variant/30 rounded text-on-surface placeholder-outline focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary font-body-md transition-all duration-200"
                          id="email"
                          name="email"
                          placeholder={t("login.emailPlaceholder")}
                          required
                          type="text"
                          value={input.email}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    {/* Password Field */}
                    <div className="space-y-2">
                      <label className="block font-label-lg text-label-lg text-on-surface-variant" htmlFor="password">
                        {t("login.passwordLabel")}
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="material-symbols-outlined text-outline text-[20px]">lock</span>
                        </div>
                        <input
                          autoComplete="current-password"
                          className="block w-full pl-10 pr-10 py-3 bg-surface-container-lowest border border-outline-variant/30 rounded text-on-surface placeholder-outline focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary font-body-md transition-all duration-200"
                          id="password"
                          name="password"
                          placeholder="••••••••"
                          required
                          type={show ? "text" : "password"}
                          value={input.password}
                          onChange={handleInputChange}
                        />
                        <button
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-outline hover:text-primary transition-colors cursor-pointer"
                          onClick={handleClick}
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[20px]">
                            {show ? "visibility_off" : "visibility"}
                          </span>
                        </button>
                      </div>
                    </div>

                    {/* Remember & Forgot */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <input
                          className="h-4 w-4 text-primary focus:ring-primary border-outline-variant/30 rounded bg-surface-container-lowest cursor-pointer"
                          id="remember-me"
                          name="remember-me"
                          type="checkbox"
                        />
                        <label className="ml-2 block font-label-md text-label-md text-on-surface-variant cursor-pointer" htmlFor="remember-me">
                          {t("login.rememberMe")}
                        </label>
                      </div>
                      <div className="text-sm">
                        <a
                          className="font-label-md text-label-md text-primary hover:text-primary-fixed transition-colors"
                          href="#"
                          onClick={async (e) => {
                            e.preventDefault();
                            const result = await Swal.fire({
                              title: t("login.forgotTitle"),
                              text: t("login.forgotText"),
                              input: "email",
                              inputPlaceholder: "tu@email.com",
                              showCancelButton: true,
                              confirmButtonText: t("login.forgotSend"),
                              cancelButtonText: t("login.forgotCancel"),
                              ...swalThemeConfig,
                              inputValidator: (value) => {
                                if (!value) return t("login.forgotValidator");
                              },
                            });
                            if (!result.isConfirmed || !result.value) return;
                            try {
                              await axios.post(`${API_URL}/auth/forgot-password`, { email: result.value });
                            } catch (error) {
                              // El backend siempre responde genérico; si falla la request en sí, igual mostramos el mismo mensaje.
                            }
                            Swal.fire({
                              title: t("login.forgotCheckEmailTitle"),
                              text: t("login.forgotCheckEmailText"),
                              icon: "info",
                              ...swalThemeConfig,
                            });
                          }}
                        >
                          {t("login.forgotPassword")}
                        </a>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div>
                      <button
                        className="gold-gradient gold-glow gold-glow-hover w-full flex justify-center py-3.5 px-4 border border-transparent rounded-lg font-headline-sm text-headline-sm text-on-primary-fixed uppercase tracking-wider transition-all duration-300 transform active:scale-[0.98] cursor-pointer"
                        type="submit"
                      >
                        {t("login.submit")}
                      </button>
                    </div>
                  </form>

                  {/* Social Login Divider */}
                  <div className="mt-8 relative">
                    <div aria-hidden="true" className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-outline-variant/20"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-[#12121A] text-on-surface-variant font-label-md uppercase tracking-widest">
                        {t("login.or")}
                      </span>
                    </div>
                  </div>

                  {/* Social Action — botón oficial de Google (renderButton) */}
                  <div className="mt-8">
                    <div
                      ref={googleBtnRef}
                      className="w-full flex justify-center"
                      style={{ colorScheme: "light" }}
                    />
                  </div>
                </div>

                {/* Footer Link */}
                <p className="mt-8 text-center font-body-md text-body-md text-on-surface-variant relative z-10">
                  {t("login.newHere")}{" "}
                  <a
                    className="font-bold text-primary hover:text-primary-fixed transition-colors underline-offset-4 hover:underline"
                    href="#"
                    onClick={handleRegister}
                  >
                    {t("login.createAccount")}
                  </a>
                </p>
              </div>
            </div>,
            document.body
          )}
        </>
    );
}