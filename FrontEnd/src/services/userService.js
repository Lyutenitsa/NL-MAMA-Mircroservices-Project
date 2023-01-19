import userClient from '../api/config';
import axios from 'axios';


const userService = {
    // findAll() {
    //     return userClient.get('8082/users');
    // },

    findOne(data) {
        let url = 'http://34.142.121.21:8082/users/' + data.id;
        return axios.get(url);
    },

    remove(data) {
        let url = 'http://34.142.121.21:8082/users/' + data.id;
        return axios.delete(url);
    },

    register(data) {
        return axios.post('http://34.142.121.21:8082/user/', data);
    },

    update(data) {
        return axios.post('http://34.142.121.21:8082/users/update', data);
    },

    login(data) {
        return axios.post('http://34.142.121.21:8082/auth/login', data);
    }
};

export default userService;