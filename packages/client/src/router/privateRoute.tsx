import { useEffect } from 'react';

import { useAppDispatch } from '../hooks/redux-hooks';
import { useNavigate } from 'react-router';
import { EPageRoutes } from './Enums';
import { getUser } from '@/store/thunks';

type Properties = {
    children: JSX.Element;
};

export default function PrivateRoute({ children }: Properties) {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getUser()).then(res => {
            if (res.meta.requestStatus === 'rejected') {
                navigate(`/${EPageRoutes.SIGN_IN_PAGE}`);
            }
        });
    }, [dispatch, navigate]);

    return <>{children}</>;
}
