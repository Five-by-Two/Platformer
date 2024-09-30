import { useEffect } from 'react';
import { useAppSelector } from '../hooks/redux-hooks';
import { useNavigate } from 'react-router';
import { EPageRoutes } from './Enums';

type Properties = {
    children: JSX.Element;
};

export default function privateRoute({ children }: Properties) {
    const isAuth = useAppSelector(state => state.auth.isAuth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuth) {
            navigate(`/${EPageRoutes.SIGN_IN_PAGE}`);
        }
    }, [isAuth]);

    return <>{children}</>;
}
