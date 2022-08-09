import request from "./axios";
// -----------------------------------------------------------
// let data = await Get_CarType_Api();
// console.log(data);
export const Get_CarType_Api = async () => {
    const { data } = await request.get(
        `/CarType/Get`
    );
    return data;
};