import request from "./axios";
// -----------------------------------------------------------
// let data = await Get_State_Api();
// console.log(data);
export const Get_State_Api = async () => {
    const { data } = await request.get(
        `/State/Get`
    );
    return data;
};