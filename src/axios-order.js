import axios from 'axios';

const instance = axios.create({
    baseURL : 'https://my-burger-1589e.firebaseio.com/'
})

export default instance;