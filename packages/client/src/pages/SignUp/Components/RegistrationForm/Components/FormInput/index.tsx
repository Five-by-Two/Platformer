import { useFormContext } from 'react-hook-form';
import styles from './index.module.scss';
import IFormData from '../../Models/IFormData';
import { ObjectKeys } from 'react-hook-form/dist/types/path/common';

type Properties = {
    name: ObjectKeys<IFormData>;
    placeholder?: string;
    required?: boolean;
    type?: 'text' | 'number' | 'password';
    pattern?: RegExp;
    validateErrorText?: string;
};

export default function FormInput(props: Properties) {
    const { validateErrorText, name, placeholder, required, type } = props;
    const {
        register,
        formState: { errors },
    } = useFormContext<IFormData>();
    return (
        <div
            className={`${styles.inputWrapper} ${
                errors[name] != undefined && styles.inputWrapper_validateError
            }`}>
            <input
                type={type}
                {...register(name, { pattern: props.pattern })}
                placeholder={placeholder}
                required={required}
            />
            {errors[name] && <span>{validateErrorText}</span>}
        </div>
    );
}
