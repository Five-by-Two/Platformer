import { EPageRoutes } from '@/router/Enums';
import AuthService from '@/services/AuthService/AuthService';
import queryString from 'query-string';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
export function YandexCallBackPage(): JSX.Element {
    const navigate = useNavigate();
    useEffect(() => {
        const { code } = queryString.parse(window.location.search);
        if (!code || typeof code !== 'string') {
            navigate(EPageRoutes.HOME_PAGE);
            return;
        }
        AuthService.SignInByYandex(code).then(() => {
            navigate(EPageRoutes.HOME_PAGE);
        });
    }, [navigate]);
    return <section>YandexCallback</section>;
}
