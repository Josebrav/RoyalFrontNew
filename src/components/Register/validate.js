import axios from "axios";
import API_URL from "../../api/rutaApi";
import { t } from "../../i18n/strings";

export const validateNickFormat = (nick) => {
    if (!nick) {
        return t("register.err.nickRequired");
    }
    if (nick.length < 3) {
        return t("register.err.nickTooShort");
    }
    if (nick.length > 20) {
        return t("register.err.nickTooLong");
    }
    return null; // Indica que no hay error
};

export const validateEmailFormat = (email) => {
    // Expresión regular para validar un correo electrónico básico
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!email) {
        return t("register.err.emailRequired");
    }
    if (!regex.test(email)) {
        return t("register.err.emailInvalid");
    }
    return null;
};

// El texto antes del @ no puede ser exactamente igual al nombre de usuario
// (ej. nick "badbunny" no puede usar "badbunny@..." pero sí "badbunny33@...").
export const validateNickEmailMatch = (nick, email) => {
    if (!nick || !email) return null;
    const localPart = email.split("@")[0];
    if (localPart.toLowerCase() === nick.toLowerCase()) {
        return t("register.err.emailMatchesNick");
    }
    return null;
};

export const checkNickAvailability = async (nick) => {
    try {
        const { data } = await axios.get(`${API_URL}/check-availability`, { params: { nick } });
        return !!data?.nickTaken;
    } catch (error) {
        // Un fallo de red/servidor no debe bloquear el registro: el backend igual
        // rechaza el alta si el nick termina estando duplicado.
        return false;
    }
};

export const checkEmailAvailability = async (email) => {
    try {
        const { data } = await axios.get(`${API_URL}/check-availability`, { params: { email } });
        return !!data?.emailTaken;
    } catch (error) {
        return false;
    }
};

export const validateNick = async (nick) => {
    const formatError = validateNickFormat(nick);
    if (formatError) return formatError;
    const taken = await checkNickAvailability(nick);
    if (taken) return t("register.err.nickTaken");
    return null;
};

export const validateEmail = async (email, nick) => {
    const formatError = validateEmailFormat(email);
    if (formatError) return formatError;
    const matchError = validateNickEmailMatch(nick, email);
    if (matchError) return matchError;
    const taken = await checkEmailAvailability(email);
    if (taken) return t("register.err.emailTaken");
    return null;
};

export const validatePassword = (password) => {
    if (!password) {
        return t("register.err.passwordRequired");
    }
    if (password.length < 6) {
        return t("register.err.passwordTooShort");
    }
    if (password.length > 15) {
        return t("register.err.passwordTooLong");
    }
    return null;
};
