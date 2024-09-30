import axios from 'axios';
import { BASE_API_URL } from './Models/Constants';

const AxiosService = axios.create({
    baseURL: BASE_API_URL,
});

export default AxiosService;
