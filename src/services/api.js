import axios from 'axios';


//https://api.hgbrasil.com/weather?key=73985951&lat=-23.682&lon=-46.875

export const key = 'e0e78c41';

const api = axios.create({
    baseURL:'https://api.hgbrasil.com'
});

export default api;