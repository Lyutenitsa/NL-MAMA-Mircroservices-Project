import userClient from '../api/config';
import axios from 'axios';


const userService = {
    // findAll() {
    //     return userClient.get('8082/users');
    // },

    findOne(data) {
        let url = '8082/users/' + data.id;
        return userClient.get(url);
    },

    remove(data) {
        let url = '8082/users/' + data.id;
        return userClient.delete(url);
    },

    register(data) {
        return userClient.post('http://localhost:8000/user/', data);
    },

    update(data) {
        return userClient.post('8082/users/update', data);
    },

    login(data) {
        return axios.post('http://localhost:8000/auth/login', data);
    }
};

export default userService;