//axios
import axios from 'axios';

let baseURL ='/api';
if(process.env.NODE_ENV === 'development') {
    baseURL = 'http://'
}

let apiClient = axios.create({
    baseURL: baseURL,
    headers: {
        //types of responses accepted and expected
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
});

export default apiClient;

// baseURL="localhost:"
// // baseURL="34.142.121.21:8082"
// // baseURL="34.142.121.21:8082"
//
//
// let userClient = axios.create({
//     baseURL: baseURL,
//     headers: {
//         //types of responses accepted and expected
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//     },
// });
//
// let topicClient = axios.create({
//     baseURL: baseURL,
//     headers: {
//         //types of responses accepted and expected
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//     },
// });
//
// let articleClient = axios.create({
//     baseURL: baseURL,
//     headers: {
//         //types of responses accepted and expected
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//     },
// });

