import request from "./axios";
// -----------------------------------------------------------
// let bodyParameters = {
//     PageNumber: 1
//   };
//   let data = await GetAllActive_Cargo_Api(bodyParameters);
//   console.log(data);
export const GetList_Cargo_Api = async (bodyParameters) => {
    const { data } = await request.post(
        `/Cargo/GetList`,
        bodyParameters
    );
    return data;
};

// -----------------------------------------------------------
export const GetListGreaterThanId_Cargo_Api = async (bodyParameters) => {
    const { data } = await request.post(
        `/Cargo/GetListGreaterThanId`,
        bodyParameters
    );
    return data;
};
// -----------------------------------------------------------
// let bodyParameters = {
//     PageNumber: 1
//   };
//   let data = await GetAllActive_Cargo_Api(bodyParameters);
//   console.log(data);
export const GetList_Admin_Cargo_Api = async (bodyParameters) => {
    const { data } = await request.post(
        `/Cargo/GetList_Admin`,
        bodyParameters
    );
    return data;
};
// -----------------------------------------------------------
export const GetList_Admin_GreaterThanId_Cargo_Api = async (bodyParameters) => {
    const { data } = await request.post(
        `/Cargo/GetList_Admin_GreaterThanId`,
        bodyParameters
    );
    return data;
};
// -----------------------------------------------------------
// let bodyParameters = {
//     PageNumber: 1
//   };
//   let data = await GetAllActive_Cargo_Api(bodyParameters);
//   console.log(data);
export const GetList_New_Cargo_Api = async (bodyParameters) => {
    const { data } = await request.post(
        `/Cargo/GetList_New`,
        bodyParameters
    );
    return data;
};
// -----------------------------------------------------------
export const GetList_New_GreaterThanId_Cargo_Api = async (bodyParameters) => {
    const { data } = await request.post(
        `/Cargo/GetList_New_GreaterThanId`,
        bodyParameters
    );
    return data;
};
// -----------------------------------------------------------
// -----------------------------------------------------------
//   let searchParameters = {
//      PageNumber: 1
//   };
//   let data = await GetAllSubmitByMe_Cargo_Api(searchParameters);
//   console.log(data);
export const GetAllSubmitByUser_Cargo_Api = async (SearchParameters) => {
    const { data } = await request.post(
        `/Cargo/GetAllSubmitByUser`,
        SearchParameters
    );
    return data;
};
// -----------------------------------------------------------
//   let searchParameters = {
//      PageNumber: 1
//   };
//   let data = await GetAllCarryByMe_Cargo_Api(searchParameters);
//   console.log(data);
export const GetAllCarryByUser_Cargo_Api = async (SearchParameters) => {
    const { data } = await request.post(
        `/Cargo/GetAllCarryByUser`,
        SearchParameters
    );
    return data;
};
// -----------------------------------------------------------
// let data = await GetById_Cargo_Api(4);
// console.log(data);
export const SmartGetById_Cargo_Api = async (id) => {
    const { data } = await request.get(
        `/Cargo/SmartGetById/?id=${id}`
    );
    return data;
};
// -----------------------------------------------------------
// let data = await GetById_Cargo_Api(4);
// console.log(data);
export const GetById_Cargo_Api = async (id) => {
    const { data } = await request.get(
        `/Cargo/GetById/?id=${id}`
    );
    return data;
};
// -----------------------------------------------------------
// let data = await GetByCode_Cargo_Api(813418);
// console.log(data);
export const GetByCode_Cargo_Api = async (code) => {
    const { data } = await request.get(
        `/Cargo/GetByCode/?code=${code}`
    );
    return data;
};
// -----------------------------------------------------------
// let cargo = {
//     "sourceStateId": 4,
//     "sourceCityId": 51,
//     "destinationStateId": 11,
//     "destinationCityId": 141,
//     "freightRate": 15000000,
//     "carTypeId": 1,
//     "isSmall": true,
//     "weight": 1,
//     "type": "اثاثیه منزل",
//     "tel": "09137418523",
//     "comment": "بیمه نامه باید تهیه کنید.",
//     }
//     let data = await Add_Cargo_Api(cargo);
//     console.log(data);
export const Add_Cargo_Api = async (cargo) => {
    const { data } = await request.post(
        `/Cargo/Add`,
        cargo
    );
    return data;
};
// -----------------------------------------------------------
// let cargo = {
//     "id": 7,
//     "sourceStateId": 4,
//     "sourceCityId": 56,
//     "destinationStateId": 11,
//     "destinationCityId": 141,
//     "freightRate": 15000000,
//     "tel":"09137418523",
//     "carTypeId": 1,
//     "isSmall": true,
//     "weight": 1,
//     "type": "اثاثیه منزل",
//     "comment": "بیمه نامه باید تهیه کنید."
//   }
//   let data = await Update_Cargo_Api(cargo);
//   console.log(data);
export const Update_Cargo_Api = async (cargo) => {
    const { data } = await request.post(
        `/Cargo/Update`,
        cargo
    );
    return data;
};
// -----------------------------------------------------------
// let data = await CancelByDriver_Cargo_Api(1);
// console.log(data);
export const CancelByDriver_Cargo_Api = async (id) => {
    const { data } = await request.post(
        `/Cargo/CancelByDriver/?id=${id}`
    );
    return data;
};
// -----------------------------------------------------------
// let data = await CancelBySubmitter_Cargo_Api(2);
// console.log(data);
export const CancelBySubmitter_Cargo_Api = async (id) => {
    const { data } = await request.post(
        `/Cargo/CancelBySubmitter/?id=${id}`
    );
    return data;
};
// -----------------------------------------------------------
// let data = await CancelBySubmitter_Cargo_Api(2);
// console.log(data);
export const DeleteByAdmin_Cargo_Api = async (id) => {
    const { data } = await request.post(
        `/Cargo/DeleteByAdmin/?id=${id}`
    );
    return data;
};
// -----------------------------------------------------------
// let data = await CancelBySubmitter_Cargo_Api(2);
// console.log(data);
export const Approve_Cargo_Api = async (id) => {
    const { data } = await request.post(
        `/Cargo/Approve/?id=${id}`
    );
    return data;
};

