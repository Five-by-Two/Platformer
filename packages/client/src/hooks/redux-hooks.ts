import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { useDispatch } from 'react-redux';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
