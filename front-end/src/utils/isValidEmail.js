const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

const isValidEmail = (email) => EMAIL_REGEX.test(email);

export default isValidEmail;
