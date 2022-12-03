import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// -----------------------------------------------------------
// let bodyParameters = {
//     PageNumber: 1
//   };
//   let data = await GetAllActive_Cargo_Api(bodyParameters);
//   console.log(data);
export const UploadDocs_Api = async (userId,fileName,fileUri) => {
   
    let formData = new FormData();

    formData.append(fileName, {
      uri: fileUri,
      name: "image.jpeg",
      type: "image/jpeg",
    });
    // console.log('userId',userId);
    // console.log('fileName',fileName);
    // console.log('fileUri',fileUri);
    // console.log('token',await AsyncStorage.getItem('token'));
    formData.append('userId', userId);
    formData.append('token', await AsyncStorage.getItem('token'));

    let result;
    await axios.post('https://docs.sadeghbar.com/api/Upload/UserDocs', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }).then(res => {
        result = res.data;
        console.log(res.data);
    });

    return(result);

};