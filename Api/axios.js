import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


let token;
let api;

const initValues = async () => {
       token = await AsyncStorage.getItem('token');
    // console.log('hrr1', token);

    api = axios.create({
        baseURL: "https://api.sadeghbar.com/api",
        // baseURL: "https://localhost:5149/api",
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: '*/*',
            'Content-Type': 'application/json',
        }
    });


}
const request = {
    get:async (endpoint, options = {}) => {
        await initValues();
        return api.get(endpoint, options);
    },
    post: async(endpoint, data, options = {}) => {
        await initValues();
        return api.post(endpoint, Object.assign({}, data), options);
    },
    put: async(endpoint, options = {}) => {
        await initValues();
        return api.put(endpoint, options);
    },
    patch: async(endpoint, options = {}) => {
        await initValues();
        return api.patch(endpoint, options);
    },
    delete: async(endpoint, data, options = {}) => {
        await initValues();
        var d = { data: data };
        return api.delete(endpoint, Object.assign({}, d), options);
    },
    options: async(endpoint, options) => {
        await initValues();
        return api.options(endpoint, options);
    },

    head: async(endpoint, options) => {
        await initValues();
        return api.head(endpoint, options);
    },
};

export default request;