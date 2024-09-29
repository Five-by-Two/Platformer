export type TFormProfileData = {
    email: string;
    first_name: string;
    second_name: string;
    display_name: string;
    phone: string;
    login: string;
};

export type TFormPasswordData = {
    oldPassword: string;
    newPassword: string;
    newPasswordAgain: string;
};

export type TFormAvatarData = {
    avatar: FileList;
};

export type TAllTypesFormProfile = TFormProfileData &
    TFormPasswordData &
    TFormAvatarData;
