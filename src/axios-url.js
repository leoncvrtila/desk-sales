import * as axios from 'axios'

const instance = axios.create({
    baseURL: 'https://desk-clients.firebaseio.com/'
});

export default instance;