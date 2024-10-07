export default class {
    static EMAIL_PATTERN = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+.[a-zA-Z0-9_-]+)/;
    static EMAIL_ERROR = 'Некоррекнтый адрес электронной почты';

    static LASTNAME_PATTERN = /^([А-ЯЁA-Z][а-яёa-z-]*)$/;
    static LASTNAME_ERROR = 'Фамилия должна начинаться с заглавной буквы';

    static FIRSTNAME_PATTERN = /^([А-ЯЁA-Z][а-яёa-z-]*)$/;
    static FIRSTNAME_ERROR = 'Фамилия должна начинаться с заглавной буквы';

    static PHONE_PATTERN = /^\+?\d{10,15}$/;
    static PHONE_ERROR = 'Номер телефона должен быть в формате +79111111111';

    static LOGIN_PATTERN = /^(?!\d+$)[a-zA-Z0-9_-]{3,20}$/;
    static LOGIN_ERROR =
        'Логин должен состоять из латиницы и быть не меньше 3 символов';

    static PASSWORD_PATTERN = /^(?=.*[A-Z])(?=.*\d).{8,40}$/;
    static PASSWORD_ERROR =
        'Пароль должен содержать от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра';
}
