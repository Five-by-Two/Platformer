import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { EPageRoutes } from './Enums';
import AuthService from '../services/AuthService/AuthService';

type Properties = {
    children: JSX.Element;
};

export default function PrivateRoute({ children }: Properties) {
    const navigate = useNavigate();

    useEffect(() => {
        AuthService.GetUser().then(result => {
            if (!result) {
                navigate(`/${EPageRoutes.SIGN_IN_PAGE}`);
            }
        });
    }, []);

    return <>{children}</>;
}
