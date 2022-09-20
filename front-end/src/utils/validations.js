export const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

export const isValidPassword = (password) => password.length >= 6;

export const isValidName = (name) => name.length >= 2;

export const isValidEmail = (email) => EMAIL_REGEX.test(email);
