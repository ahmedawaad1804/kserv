import {axiosInstanceUnauth} from './axiosInstance';

export default authService = {

    getBuses: () => {
        
        return axiosInstanceUnauth
            .get('/busesList');
    },
    getRoute: () => {
        
        return axiosInstanceUnauth
            .get('/coords');
    },
}