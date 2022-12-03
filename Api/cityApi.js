import request from "./axios";
// -----------------------------------------------------------
// let data = await Get_City_Api(1);
// console.log(data);
export const Get_City_Api = async (stateId) => {
    const { data } = await request.get(
        `/City/Get/?stateId=${stateId}`
    );
    return data;
};
// -----------------------------------------------------------
