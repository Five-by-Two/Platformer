import { ObjectKeys } from 'react-hook-form/dist/types/path/common';
import styles from './input.module.scss';
import {
    TAllTypesFormProfile,
    TFormAvatarData,
    TFormPasswordData,
    TFormProfileData,
} from '../../Models/IFormProfileData';
import { useFormContext } from 'react-hook-form';
import { InputHTMLAttributes } from 'react';

type TProps = {
    name: ObjectKeys<TAllTypesFormProfile>;
    validateErrorText?: string;
} & InputHTMLAttributes<HTMLInputElement>;

function Input({ validateErrorText, name, ...other }: TProps) {
    const { register } = useFormContext<
        TFormProfileData | TFormPasswordData | TFormAvatarData
    >();

    return (
        <div className={styles.inputWrapper}>
            <input {...register(name)} {...other} />
            {validateErrorText && <span>{validateErrorText}</span>}
        </div>
    );
}

export default Input;
