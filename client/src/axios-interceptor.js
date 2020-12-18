import axios from 'axios';

const instance = 
    axios.create();
    console.log('token', localStorage.getItem('token'));

    instance.interceptors.request.use(function (config) {
        const token = localStorage.getItem('token');
        config.headers.Authorization =  token ? `Bearer ${token}` : '';
        return config;
      });

export default instance;