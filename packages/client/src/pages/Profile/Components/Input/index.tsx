import { ObjectKeys } from 'react-hook-form/dist/types/path/common';
import styles from './input.module.scss';
import {
    TAllTypesFormProfile,
    TFormAvatarData,
    TFormPasswordData,
    TFormProfileData,
} from '../../Models/IFormProfileData';
import { useFormContext } from 'react-hook-form';

type TProps = {
    name: ObjectKeys<TAllTypesFormProfile>;
    type: 'text' | 'number' | 'password' | 'file';
    placeholder: string;
    validateErrorText?: string;
    disabled?: boolean;
    required?: boolean;
};

function Input({
    type,
    name,
    placeholder,
    required,
    disabled,
    validateErrorText,
}: TProps) {
    const { register } = useFormContext<
        TFormProfileData | TFormPasswordData | TFormAvatarData
    >();

    return (
        <div className={styles.inputWrapper}>
            <input
                {...register(name)}
                disabled={disabled}
                type={type}
                placeholder={placeholder}
                required={required}
            />
            {validateErrorText && <span>{validateErrorText}</span>}
        </div>
    );
}

export default Input;
