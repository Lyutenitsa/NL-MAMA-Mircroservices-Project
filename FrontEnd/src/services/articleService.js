import apiClient from '../api/config';
import axios from "axios";

const articleService = {
    findAll() {
        return axios.get('http://35.189.107.180:8080/articles/');
    },
    findOne(data) {
        let url = 'http://35.189.107.180:8080/articles/' + data.id;
        return axios.get(url);
    },
    save(data) {
        return axios.post("http://35.189.107.180:8080/articles/", data);
    },

    update(data) {
        return axios.post('http://35.189.107.180:8080/articles/update', data, { responseType: 'blob' });
    },
    remove(data) {
        let url = 'http://35.189.107.180:8080/articles/' + data.id;
        return axios.delete(url);
    },
};

export default articleService;