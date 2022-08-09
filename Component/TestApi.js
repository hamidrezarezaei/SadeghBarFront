import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Get_CarType_Api } from '../Api/carTypeApi';
import { Get_City_Api } from '../Api/cityApi';
import { Exit_Queue_Api, TakeByDriver_Queue_Api, ExtendTime_Queue_Api, Enter_Queue_Api, GetItems_Queue_Api } from '../Api/queueApi';
import { Get_State_Api } from '../Api/stateApi';
import { Delete_User_Api, Logs_User_Api, UnSuspend_User_Api, Suspend_User_Api, Update_User_Api, GetAll_User_Api, GetByCode_User_Api, GetById_User_Api, AddFreightage_User_Api, AddDriver_User_Api, VerifyMobile_User_Api, SendVerifySms_User_Api, ChangeMyPassword_User_Api, GetCurrent_User_Api, Login_User_Api } from '../Api/userApi';

export default function TestApi() {
    const fn = async () => {
  
      let data = await GetItems_Queue_Api(8);
      console.log(data);
  
  
    }
  
    const fn2 = async () => {
  
      let data = await Enter_Queue_Api(8);
      console.log(data);
    }
  
  
    const fn3 = async () => {
  
      let data = await ExtendTime_Queue_Api(8);
      console.log(data);
    }
  
    const fn4 = async () => {
  
      let data = await TakeByDriver_Queue_Api(8);
      console.log(data);
    }
    const fn5 = async () => {
  
      let data = await Exit_Queue_Api(8);
      console.log(data);
    }
  
    const fn6 = async () => {
      let user = {
        Mobile: "09132222222",
        Password: "123"
      };
      let data = await Login_User_Api(user);
      console.log(data);
    }
  
    const fn7 = async () => {
      let data = await GetCurrent_User_Api();
      console.log(data);
    }
  
    const fn8 = async () => {
      let userPassword = {
        OldPassword: "123456",
        NewPassword: "123"
      };
      let data = await ChangeMyPassword_User_Api(userPassword);
      console.log(data);
    }
  
    const fn9 = async () => {
      let data = await SendVerifySms_User_Api("09111111112");
      console.log(data);
    }
  
    const fn10 = async () => {
      let verifyInfo = {
        Mobile: "09111111112",
        Code: "7080"
      };
      let data = await VerifyMobile_User_Api(verifyInfo);
      console.log(data);
    }
  
    const fn11 = async () => {
      let driver = {
        "mobile": "09135555555",
        "mobile2": "09125555555",
        "pass": "123",
        "name": "نام راننده پنجم",
        "family": "نام خانوادگی راننده پنجم",
        "address": "آدرس راننده پنجم",
        "carTypeId": 1
      };
      let data = await AddDriver_User_Api(driver);
      console.log(data);
    }
  
    const fn12 = async () => {
      let freightage = {
        "mobile": "09111111112",
        "mobile2": "09111111112",
        "pass": "123",
        "name": "نام باربری اول",
        "family": "نام خانوادگی باربری اول",
        "address": "آدرس باربری اول",
      };
      let data = await AddFreightage_User_Api(freightage);
      console.log(data);
    }
  
    const fn13 = async () => {
      let data = await GetById_User_Api(1);
      console.log(data);
    }
  
    const fn14 = async () => {
      let data = await GetByCode_User_Api(121550);
      console.log(data);
    }
  
    const fn15 = async () => {
      let searchInfo = {
        "pageNumber": 1,
        "includeSuspend": true,
        "activeOnly": false,
        "driverOnly": false,
        "freightageOnly": false,
      };
      let data = await GetAll_User_Api(searchInfo);
      console.log(data);
    }
  
    const fn16 = async () => {
      let user = {
        "id": 1,
        "code": 121550,
        "mobile": "09131111111",
        "mobile2": "09131111112",
        "pass": "",
        "name": "نام راننده اول ویرایش شده",
        "family": "نام خانوادگی راننده اول",
        "address": "آدرس باربری اول",
        "carTypeId": 1,
        "role": "Driver",
        "registerDateShamsi": "1401/3/3",
        "isActive": true,
        "dayCountToExpire": 37,
        "dayCountToUnSuspend": 0,
        "suspendReason": ""
      };
      let data = await Update_User_Api(user);
      console.log(data);
    }
  
    const fn17 = async () => {
      let suspendUserInfo = {
        "UserId": 1,
        "DayCount": 3,
        "Reason": "کنسلی بی مورد",
      };
      let data = await Suspend_User_Api(suspendUserInfo);
      console.log(data);
    }
  
    const fn18 = async () => {
      let unSuspendUserInfo = {
        "UserId": 1,
        "Comment": "تماس تلفنی",
      };
      let data = await UnSuspend_User_Api(unSuspendUserInfo);
      console.log(data);
    }
  
    const fn19 = async () => {
      let data = await Logs_User_Api(1);
      console.log(data);
    }
    const fn20 = async () => {
      let data = await Delete_User_Api(14);
      console.log(data);
    }
  
    const fn21 = async () => {
      let data = await Get_CarType_Api();
      console.log(data);
    }
  
    const fn22 = async () => {
      let data = await Get_State_Api();
      console.log(data);
    }
  
    const fn23 = async () => {
      let data = await Get_City_Api(1);
      console.log(data);
    }
  
  
    return (
      <View style={styles.container}>
        <Button title="ورود" onPress={() => fn6()} />
        <Button title="یوزر فعلی" onPress={() => fn7()} />
        <Button title="تغییر کلمه عبور" onPress={() => fn8()} />
        <Button title="ارسال پیامک تایید" onPress={() => fn9()} />
        <Button title="تایید تلفن همراه" onPress={() => fn10()} />
        <Button title="اضافه کردن راننده" onPress={() => fn11()} />
        <Button title="اضافه کردن باربری" onPress={() => fn12()} />
        <Button title="گرفتن کاربر با آی دی" onPress={() => fn13()} />
        <Button title="گرفتن کاربر با کد" onPress={() => fn14()} />
        <Button title="گرفتن همه کاربران" onPress={() => fn15()} />
        <Button title="ویرایش" onPress={() => fn16()} />
        <Button title="مسدود کردن" onPress={() => fn17()} />
        <Button title="رفع تعلیق" onPress={() => fn18()} />
        <Button title="لاگ کاربر" onPress={() => fn19()} />
        <Button title="حذف کاربر" onPress={() => fn20()} />
        <Button title="انواع وسایل نقلیه" onPress={() => fn21()} />
        <Button title="استانها" onPress={() => fn22()} />
        <Button title="شهرها" onPress={() => fn23()} />
  
  
  
        <Button title="آیتم های صف" onPress={() => fn()} />
        <Button title="ورود به صف" onPress={() => fn2()} />
        <Button title="افزایش زمان" onPress={() => fn3()} />
        <Button title="گرفتن بار" onPress={() => fn4()} />
        <Button title="خروج از صف" onPress={() => fn5()} />
  
        <Text>sadeghbar test working on hrr app!</Text>
        <StatusBar style="auto" />
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  