import { useContext } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


let token;
let api;

const initValues = async () => {
    // token = localStorage.getItem('user')? JSON.parse(localStorage.getItem('user')).token: "";
    //ادمین 
    // token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoi2K3ZhduM2K_Ysdi22Kcg2LHYttin24zbjCIsInJvbGUiOiJTdXBlckFkbWluIiwibmFtZWlkIjoiOSIsIm5iZiI6MTY1ODIwODIxNSwiZXhwIjoxNjU4ODEzMDE1LCJpYXQiOjE2NTgyMDgyMTV9.osK9IropJ0WxuDe9J2dQ-jjqXXpBVGCrvHrMtxasf04";
    //راننده اول اکتیو هست
    // token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoi2YbYp9mFINix2KfZhtmG2K_ZhyDYp9mI2YQg2YbYp9mFINiu2KfZhtmI2KfYr9qv24wg2LHYp9mG2YbYr9mHINin2YjZhCIsInJvbGUiOiJEcml2ZXIiLCJuYW1laWQiOiIxIiwibmJmIjoxNjU2Nzg1MzY3LCJleHAiOjE2NTczOTAxNjcsImlhdCI6MTY1Njc4NTM2N30.jHGSjbhcfjajI7uX9U_vQiDCpj448ayZhDBPw5HZros";
    //راننده دوم اکتیو نیست
    //token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoi2YbYp9mFINix2KfZhtmG2K_ZhyDYr9mI2YUg2YbYp9mFINiu2KfZhtmI2KfYr9qv24wg2LHYp9mG2YbYr9mHINiv2YjZhSIsInJvbGUiOiJEcml2ZXIiLCJuYW1laWQiOiI3IiwibmJmIjoxNjU0NTc1NDkzLCJleHAiOjE2NTUxODAyOTMsImlhdCI6MTY1NDU3NTQ5M30.cQZAHEUEwrEh_RvudLPHycCvBNy_DRzj0jH9dsNnKoU";
    //راننده سوم معلق است
    //token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoi2YbYp9mFINix2KfZhtmG2K_ZhyDYs9mI2YUg2YbYp9mFINiu2KfZhtmI2KfYr9qv24wg2LHYp9mG2YbYr9mHINiz2YjZhSIsInJvbGUiOiJEcml2ZXIiLCJuYW1laWQiOiIxMSIsIm5iZiI6MTY1NDU3NzQ5OCwiZXhwIjoxNjU1MTgyMjk4LCJpYXQiOjE2NTQ1Nzc0OTh9.4hOnVUg2_9Zan-gJkMx4FL6ISHTFdfRD6mzA2uLhqng";
    //راننده چهارم اکتیو است
    // token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoi2YbYp9mFINix2KfZhtmG2K_ZhyDahtmH2KfYsdmFINmG2KfZhSDYrtin2YbZiNin2K_ar9uMINix2KfZhtmG2K_ZhyDahtmH2KfYsdmFIiwicm9sZSI6IkRyaXZlciIsIm5hbWVpZCI6IjEyIiwibmJmIjoxNjU2MjI1NjMxLCJleHAiOjE2NTY4MzA0MzEsImlhdCI6MTY1NjIyNTYzMX0.B2kBAHpoqvDvYRw6C3WdfwDUSnDFA9lZ_rXaysJ0AZ0";
    //راننده پنجم اکتیو است
    // token = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoi2LHYttinINmG2KzZhSDYp9mE2K_bjNmGIiwicm9sZSI6IkRyaXZlciIsIm5hbWVpZCI6IjEzIiwibmJmIjoxNjU2Nzg1NzI3LCJleHAiOjE2NTczOTA1MjcsImlhdCI6MTY1Njc4NTcyN30.gP1rNnHAFQOsiRNATKbiih52YN1StslocvLv5x2T9ho";
    //راننده ششم اکتیو است
    // token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoi2LnZhNuMINin2LPZhdin2LnbjNmE24wiLCJyb2xlIjoiRHJpdmVyIiwibmFtZWlkIjoiMTMiLCJuYmYiOjE2NTYyMjY0NzEsImV4cCI6MTY1NjgzMTI3MSwiaWF0IjoxNjU2MjI2NDcxfQ.IPtqzFpT5rWsDXl3His6N2bpLHpDLLbwuE3Khpyn-Zk";

    token = await AsyncStorage.getItem('token');
    // console.log('hrr1', token);

    api = axios.create({
        baseURL: "http://sadeghbar.com/api",
        // baseURL: "http://localhost:5149/api",
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