export type TUser<T = number> = {
    id: T;
    first_name: string;
    second_name: string;
    display_name: string;
    phone: string;
    login: string;
    avatar: string;
    email: string;
};

export type TProfileData = {
    first_name: string;
    second_name: string;
    display_name: string;
    phone: string;
    login: string;
    email: string;
};
