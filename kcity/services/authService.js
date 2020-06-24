import {axiosInstance} from './axiosInstance';

export default authService = {

    login: (email,password ) => {
        
        return axiosInstance
            .post('/auth/login/client', { email,password });
    },
    register: async (payload) => {
        return axiosInstance
            .post('/auth/signUp/client', { ...payload });
    },
}




