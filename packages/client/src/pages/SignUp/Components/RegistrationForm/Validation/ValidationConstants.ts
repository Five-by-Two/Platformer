export const EMAIL_PATTERN = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+.[a-zA-Z0-9_-]+)/;
export const EMAIL_ERROR = 'Некоррекнтый адрес электронной почты';

export const LASTNAME_PATTERN = /^([А-ЯЁA-Z][а-яёa-z-]*)$/;
export const LASTNAME_ERROR = 'Фамилия должна начинаться с заглавной буквы';

export const FIRSTNAME_PATTERN = /^([А-ЯЁA-Z][а-яёa-z-]*)$/;
export const FIRSTNAME_ERROR = 'Фамилия должна начинаться с заглавной буквы';

export const PHONE_PATTERN = /^\+?\d{10,15}$/;
export const PHONE_ERROR = 'Номер телефона должен быть в формате +79111111111';

export const LOGIN_PATTERN = /^(?!\d+$)[a-zA-Z0-9_-]{3,20}$/;
export const LOGIN_ERROR =
    'Логин должен состоять из латиницы и быть не меньше 3 символов';

export const PASSWORD_PATTERN = /^(?=.*[A-Z])(?=.*\d).{8,40}$/;
export const PASSWORD_ERROR =
    'Пароль должен содержать от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра';
