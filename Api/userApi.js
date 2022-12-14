import request from "./axios";
// -----------------------------------------------------------
// let user = {
//     Mobile: "09132222222",
//     Password: "123"
//   };
//   let data = await Login_User_Api(user);
//   console.log(data);
export const Login_User_Api = async (user) => {
    const { data } = await request.post(
        `/User/Login`,
        user
    );
    return data;
};
// -----------------------------------------------------------
// let data = await GetCurrent_User_Api();
// console.log(data);
export const GetCurrent_User_Api = async () => {

    const { data } = await request.get(
        `/User/GetCurrentUser`
    );
    return data;
};

// -----------------------------------------------------------
// let expoToken = {
//     expoToken: "09132222222",
//   };
export const UpdateExpoToken_User_Api = async (expoToken) => {
    const { data } = await request.post(
        `/User/UpdateExpoToken`,
        expoToken
    );
    return data;
};
// -----------------------------------------------------------
// let notificationStatus = {
//     isEnable: true,
//   };
export const SetNotificationStatus_User_Api = async (notificationStatus) => {
    const { data } = await request.post(
        `/User/SetNotificationStatus`,
        notificationStatus
    );
    return data;
};
// -----------------------------------------------------------
export const GetNotificationStatus_User_Api = async () => {
    const { data } = await request.get(
        `/User/GetNotificationStatus`
    );
    return data;
};
// -----------------------------------------------------------
// let data = await SendVerifySms_User_Api("09132057232");
// console.log(data);r
export const SendVerifySms_User_Api = async (mobile) => {
    const { data } = await request.post(
        `/User/SendVerifySms/?mobile=${mobile}`
    );
    return data;
};
// -----------------------------------------------------------
// let verifyInfo = {
//     Mobile: "09132057232",
//     Code: "123456"
//   };
//   let data = await VerifyMobile_User_Api(verifyInfo);
//   console.log(data);
export const VerifyMobile_User_Api = async (verifyInfo) => {
    const { data } = await request.post(
        `/User/VerifyMobile`,
        verifyInfo
    );
    return data;
};
// -----------------------------------------------------------
// let user = {
// "id": 0,
// "code": 0,
// "nationalCode": "8888888888",
// "name": "??????",
// "family": "????????",
// "mobile": "09138888888",
// "mobile2": "09128888888",
// "address": "????????????",
// "tel": "0318888888",
// ?????? ???????????? ?????? ???????? ?????? ?????????? ???????? ????????
// "carTypeId": 0,
// ???????????? 2 - ???????????? 3
// "role": 3
//   };
//   let data = await AddUser_User_Api(user);
//   console.log(data);
export const AddUser_User_Api = async (user) => {
    const { data } = await request.post(
        `/User/AddUser`,
        user
    );
    return data;
};
// -----------------------------------------------------------
// let data = await GetById_User_Api(1);
// console.log(data);
//only admin
export const GetById_User_Api = async (id) => {
    const { data } = await request.get(
        `/User/GetById/?id=${id}`
    );
    return data;
};
// -----------------------------------------------------------
// let data = await GetByCode_User_Api(121550);
// console.log(data);
//only admin
export const GetByCode_User_Api = async (code) => {
    const { data } = await request.get(
        `/User/GetByCode/?code=${code}`
    );
    return data;
};
// -----------------------------------------------------------
// let searchInfo = {
//   "pageNumber": 1,
//   "includeSuspend": true,
//   "activeOnly": false,
//   "driverOnly": false,
//   "freightageOnly": false,
// };
//   let data = await GetAll_User_Api(searchInfo);
//   console.log(data);
//only admin
export const GetAll_User_Api = async (searchInfo) => {
    const { data } = await request.post(
        `/User/GetAll`,
        searchInfo
    );
    return data;
};
// -----------------------------------------------------------
// let user = {
// "id": 1,
// "code": 121550,
// "mobile": "09131111111",
// "mobile2": "09131111112",
// "pass": "",
// "name": "?????? ???????????? ?????? ???????????? ??????",
// "family": "?????? ???????????????? ???????????? ??????",
// "address": "???????? ???????????? ??????",
// "carTypeId": 1,
// "role": "Driver",
// "registerDateShamsi": "1401/3/3",
// "isActive": true,
// "dayCountToExpire": 37,
// "dayCountToUnSuspend": 0,
// "suspendReason": ""
// };
//   let data = await Update_User_Api(user);
//   console.log(data);
//only admin
export const Update_User_Api = async (user) => {
    const { data } = await request.post(
        `/User/Update`,
        user
    );
    return data;
};
// -----------------------------------------------------------
// let suspendUserInfo = {
// "UserId": 1,
// "DayCount": 3,
// "Reason": "?????????? ???? ????????",
// };
//   let data = await Suspend_User_Api(suspendUserInfo);
//   console.log(data);
//only admin
export const Suspend_User_Api = async (suspendUserInfo) => {
    const { data } = await request.post(
        `/User/Suspend`,
        suspendUserInfo
    );
    return data;
};
// -----------------------------------------------------------
// let unSuspendUserInfo = {
// "UserId": 1,
// "Comment": "???????? ??????????",
// };
//   let data = await UnSuspend(unSuspendUserInfo);
//   console.log(data);
//only admin
export const UnSuspend_User_Api = async (unSuspendUserInfo) => {
    const { data } = await request.post(
        `/User/UnSuspend`,
        unSuspendUserInfo
    );
    return data;
};
// -----------------------------------------------------------
// let data = await Logs_User_Api(1);
// console.log(data);
//only admin
export const Logs_User_Api = async (userId) => {
    const { data } = await request.get(
        `/User/Logs/?userId=${userId}`
    );
    return data;
};
// -----------------------------------------------------------
// let data = await Delete_User_Api(14);
// console.log(data);
//only admin
export const Delete_User_Api = async (id) => {
    const { data } = await request.delete(
        `/User/Delete/?id=${id}`
    );
    return data;
};
// -----------------------------------------------------------
// let smsInfo = {
//     userId: 0,
//     text: "?????? ????????"
//   };
export const SendPureSms_User_Api = async (smsInfo) => {
    const { data } = await request.post(
        `/User/SendPureSms`,
        smsInfo
    );
    return data;
};
// -----------------------------------------------------------
// let logInfo = {
//     userId: 0,
//     text: "?????? ????????"
//   };
export const AddLog_User_Api = async (logInfo) => {
    const { data } = await request.post(
        `/User/AddLog`,
        logInfo
    );
    return data;
};