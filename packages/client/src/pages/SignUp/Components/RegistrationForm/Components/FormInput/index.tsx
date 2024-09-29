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
    const { register } = useFormContext<IFormData>();

    return (
        <div className={styles.inputWrapper}>
            <input
                type={type}
                {...register(name)}
                placeholder={placeholder}
                required={required}
            />
            {validateErrorText && <span>{validateErrorText}</span>}
        </div>
    );
}
