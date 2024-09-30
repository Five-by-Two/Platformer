import { useEffect } from 'react';
import { useAppDispatch } from '../hooks/redux-hooks';
import { useNavigate } from 'react-router';
import { EPageRoutes } from './Enums';
import AuthService from '../services/AuthService/AuthService';
import { setUser } from '../store/userSlice';

type Properties = {
    children: JSX.Element;
};

export default function PrivateRoute({ children }: Properties) {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        AuthService.GetUser().then(res => {
            if (!res) {
                navigate(`/${EPageRoutes.SIGN_IN_PAGE}`);
            } else {
                dispatch(setUser(res));
            }
        });
    }, []);

    return <>{children}</>;
}
