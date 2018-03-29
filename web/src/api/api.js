import axios from 'axios';

let base = 'http://49.4.8.123:8083';

export const requestLogin = params => { return axios.post(`${base}/user/login`, params).then(res => res.data); };    
export const requestCode = params => { return axios.post(`${base}/user/sendMessage`, params).then(res => res.data); };  //获取验证码
export const requestCheckUser = params => { return axios.post(`${base}/user/findByEmailOrUserMobileNumber`, params).then(res => res.data); }; //校验用户名和手机号
export const requestRegist = params => { return axios.post(`${base}/user/regist`, params).then(res => res.data); };  //注册post
export const getText = params => { return axios.get(`${base}/product/legalTerms`, { params: params }); };        //法律条款 get
export const findPass = params => { return axios.post(`${base}/user/getBackPassword`, params).then(res => res.data); };       //找回密码
export const getUserName = params => { return axios.post(`${base}/user/getUserName`, params).then(res => res.data); }; 

//个人中心changMobileNumber
export const getUserInfo = params => { return axios.post(`${base}/user/perfectInfoInit`, params).then(res => res.data); }; 
export const perfectInfo = params => { return axios.post(`${base}/user/perfectInfo`, params).then(res => res.data); }; 
export const changPassword = params => { return axios.post(`${base}/user/changPassword`, params).then(res => res.data); }; 
export const changMobileNumber = params => { return axios.post(`${base}/user/changMobileNumber`, params).then(res => res.data); }; 
//产品
/*获取产品*/
export const getProduct = params => { return axios.post(`${base}/product/product-buy`, params).then(res => res.data); }; 