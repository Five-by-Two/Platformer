import AuthService from '@/services/AuthService/AuthService';
import 'dotenv';
import queryString from 'query-string';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
export function YandexCallBackPage(): JSX.Element {
    const navigate = useNavigate();
    useEffect(() => {
        const { code } = queryString.parse(window.location.search);
        if (!code || typeof code !== 'string') {
            window.location.href = process.env.CLIENT_URL!;
            return;
        }
        AuthService.SignInByYandex(code).then(() => {
            window.location.href = process.env.CLIENT_URL!;
        });
    }, [navigate]);
    return <section>YandexCallback</section>;
}
