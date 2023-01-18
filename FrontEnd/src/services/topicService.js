import apiClient from '../api/config';

const topicService = {
    findOne(data) {
        let url = '8081/topics/' + data.id;
        return apiClient.get(url);
    },
    update(data) {
        return apiClient.post('8081/topics/update', data, { responseType: 'blob' });
    },
    remove(data) {
        let url = '8081/topics/' + data.id;
        return apiClient.delete(url);
    },
    removeAll(){
        let url = '8081/topics/deleteall';
        return apiClient.delete(url);
    }
};

export default topicService;