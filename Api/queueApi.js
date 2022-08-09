import request from "./axios";
// -----------------------------------------------------------
// let data = await Enter_Queue_Api(8);
// console.log(data);
export const Enter_Queue_Api = async (cargoId) => {
    const { data } = await request.post(
        `/Queue/Enter/?cargoId=${cargoId}`
    );
    return data;
};
// -----------------------------------------------------------
// let data = await GetItems_Queue_Api(8);
// console.log(data);
export const GetItems_Queue_Api = async (cargoId) => {
    const { data } = await request.get(
        `/Queue/GetItems/?cargoId=${cargoId}`
    );
    return data;
};
// -----------------------------------------------------------
// let data = await ExtendTime_Queue_Api(8);
// console.log(data);
export const ExtendTime_Queue_Api = async (cargoId) => {
    const { data } = await request.post(
        `/Queue/ExtendTime/?cargoId=${cargoId}`
    );
    return data;
};
// -----------------------------------------------------------
// let data = await TakeByDriver_Queue_Api(8);
// console.log(data);
export const TakeByDriver_Queue_Api = async (cargoId) => {
    const { data } = await request.post(
        `/Queue/TakeByDriver/?cargoId=${cargoId}`
    );
    return data;
};
// -----------------------------------------------------------
// let data = await Exit_Queue_Api(8);
// console.log(data);
export const Exit_Queue_Api = async (cargoId) => {
    const { data } = await request.post(
        `/Queue/Exit/?cargoId=${cargoId}`
    );
    return data;
};