import apiClient from '../api/config';

const articleService = {
    findAll() {
        return apiClient.get('8080/articles/');
    },
    findOne(data) {
        let url = '8080/articles/' + data.id;
        return apiClient.get(url);
    },
    update(data) {
        return apiClient.post('8080/articles/update', data, { responseType: 'blob' });
    },
    remove(data) {
        let url = '8080/articles/' + data.id;
        return apiClient.delete(url);
    },
    removeAll(){
        let url = '8080/articles/deleteall';
        return apiClient.delete(url);
    }
};

export default articleService;