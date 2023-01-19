import apiClient from '../api/config';
import axios from "axios";

const topicService = {
    findAll() {
        return axios.get('http://34.142.109.30:8081/topics/');
    },

    findOne(data) {
        let url = 'http://34.142.109.30:8081/topics/' + data.id;
        return axios.get(url);
    },
    update(data) {
        return axios.post('http://34.142.109.30:8081/topics/update', data, { responseType: 'blob' });
    },
    remove(data) {
        let url = 'http://34.142.109.30:8081/topics/' + data.id;
        return axios.delete(url);
    },
    save(data) {
        return axios.post("http://34.142.109.30:8081/topics/", data);
    }
};

export default topicService;