import { ScrollView, Text, TextInput, TouchableOpacity, Linking, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useToast } from "react-native-toast-notifications";
import { GetById_User_Api, Update_User_Api } from '../../Api/userApi';
import { globalStyles } from '../../assets/Styles/GlobalStyle';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { MaterialIcons } from '@expo/vector-icons';
import RadioButtonRN from 'radio-buttons-react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CarTypeCombo from '../../Component/Combo/CarTypeCombo/CarTypeCombo';
import Loading from '../../Component/Loading/Loading';
import { userSingleStyles } from './UserSingleStyle';
import UserLog from '../../Component/User/UserLog/UserLog';
import UserSuspend from '../../Component/User/UserSuspend/UserSuspend';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import CharCombo from '../../Component/Combo/CharCombo/CharCombo';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SendPureSms from '../../Component/User/SendPureSms/SendPureSms';
import UserBehavior from '../../Component/User/UserBehavior/UserBehavior';
import AddLog from '../../Component/User/AddLog/AddLog';

// =================================================================
export default function UserSingleScreen({ navigation, route }) {
  const { id } = route.params;
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const [code, setCode] = useState(0);
  const [name, setName] = useState("");
  const [family, setFamily] = useState("");
  const [registerDateShamsi, setRegisterDateShamsi] = useState("");
  const [registerTime, setRegisterTime] = useState("");

  const [nationalCode, setNationalCode] = useState("");
  const [mobile, setMobile] = useState("");
  const [mobile2, setMobile2] = useState("");
  const [tel, setTel] = useState("");
  const [role, setRole] = useState(2);
  const [carTypeId, setCarTypeId] = useState(null);
  const [plate1, setPlate1] = useState("");
  const [plate2, setPlate2] = useState("الف");
  const [plate3, setPlate3] = useState("");
  const [plate4, setPlate4] = useState("");
  const [introducerCode, setIntroducerCode] = useState("");

  const [address, setAddress] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [dayCountToExpire, setDayCountToExpire] = useState(0);
  const [isSuspend, setIsSuspend] = useState(false);
  const [dayCountToUnSuspend, setDayCountToUnSuspend] = useState(0);
  const [suspendReason, setSuspendReason] = useState("");


  const [token, setToken] = useState(null);

  const userTypes = [
    {
      label: 'راننده',
      value: 2,
    },
    {
      label: 'باربری',
      value: 3,
    },
    {
      label: 'صاحب کالا',
      value: 4,
    }
  ];
  // =================================================================
  useEffect(() => {

    loadData();
  }, []);
  // =================================================================
  const loadData = async () => {
    try {
      setLoading(true);
      setToken(await AsyncStorage.getItem('token'));
      let data = await GetById_User_Api(id);
      if (data.messageStatus == "Successful") {
        // console.log('user', data.messageData.data);
        let user = data.messageData.data;
        setLoading(false);
        setCode(user.code);
        setName(user.name);
        setFamily(user.family);
        setRegisterDateShamsi(user.registerDateShamsi);
        setRegisterTime(user.registerTime);
        setNationalCode(user.nationalCode);
        setMobile(user.mobile);
        setMobile2(user.mobile2);
        setTel(user.tel);
        setRole(parseInt(user.role));
        setCarTypeId(user.carTypeId);
        setPlate1(user.plate1);
        setPlate2(user.plate2);
        setPlate3(user.plate3);
        setPlate4(user.plate4);
        setIntroducerCode(user.introducerCode);
        setAddress(user.address);
        setIsActive(user.isActive);
        setDayCountToExpire(user.dayCountToExpire);
        setIsSuspend(user.isSuspend);
        setDayCountToUnSuspend(user.dayCountToUnSuspend);
        setSuspendReason(user.suspendReason);
      }
      else {
        setLoading(false);
        toast.show(data.message, { type: "danger" });
      }
    }
    catch (error) {
      setLoading(false);
      toast.show("خطا در ارتباط با سرور.", { type: "danger" });
    }
  }
  // =================================================================
  const onSubmit = async () => {
    try {
      setLoading(true);
      const user = {
        id,
        code,
        nationalCode,
        name,
        family,
        mobile,
        mobile2,
        address,
        tel,
        carTypeId,
        plate1,
        plate2,
        plate3,
        plate4,
        introducerCode,
        role,
        isActive,
        dayCountToExpire,
      }

      let data = await Update_User_Api(user);
      if (data.messageStatus == "Successful") {
        setLoading(false);
        toast.show(data.message, { type: "success" });
        navigation.navigate('UserListScreen');
      }
      else {
        setLoading(false);
        toast.show(data.message, { type: "danger" });
      }
    }
    catch (error) {
      setLoading(false);
      toast.show("خطا در ارتباط با سرور.", { type: "danger" });
    }
  }
  // =================================================================

  return (
    <>
      <ScrollView style={{ flex: 1 }} nestedScrollEnabled={true} keyboardShouldPersistTaps={'handled'}>
        <View style={[globalStyles.screenContainer]}>
          <View style={[globalStyles.form_Container, userSingleStyles.boxContainer]}>
            <View style={userSingleStyles.headerContainer}>
              <Text style={userSingleStyles.headerText}>
                اطلاعات کاربر
              </Text>
            </View>
            <View style={globalStyles.row}>
              <FontAwesome5 name="user-tie" style={[globalStyles.field_Icon, globalStyles.form_FieldIcon, userSingleStyles.form_FieldIcon]} size={26} />
              <Text style={[globalStyles.field_Title, globalStyles.form_FieldTitle, userSingleStyles.form_FieldTitle]}>نام:</Text>
            </View>
            <View style={globalStyles.row}>
              <TextInput multiline={true} numberOfLines={1} style={[globalStyles.text_Input, globalStyles.form_FieldValue]}
                onChangeText={setName}
                value={name}
              />
            </View>

            <View style={globalStyles.separator}>
            </View>

            <View style={globalStyles.row}>
              <FontAwesome5 name="users" style={[globalStyles.field_Icon, globalStyles.form_FieldIcon, userSingleStyles.form_FieldIcon]} size={26} />
              <Text style={[globalStyles.field_Title, globalStyles.form_FieldTitle, userSingleStyles.form_FieldTitle]}>نام خانوادگی:</Text>
            </View>
            <View style={globalStyles.row}>
              <TextInput multiline={true} numberOfLines={1} style={[globalStyles.text_Input, globalStyles.form_FieldValue]}
                onChangeText={setFamily}
                value={family}
              />
            </View>

            <View style={globalStyles.separator}>
            </View>

            <View style={globalStyles.row}>
              <FontAwesome name="calendar" style={[globalStyles.field_Icon, globalStyles.form_FieldIcon, userSingleStyles.form_FieldIcon]} size={28} />
              <Text style={[globalStyles.field_Title, globalStyles.form_FieldTitle, userSingleStyles.form_FieldTitle]}>تاریخ ثبت نام:</Text>
            </View>
            <View style={globalStyles.row}>
              <TextInput multiline={true} numberOfLines={1} style={[globalStyles.text_Input, globalStyles.form_FieldValue, { textAlign: 'center' }]}
                editable={false}
                value={registerDateShamsi + " ساعت: " + registerTime}
              />
            </View>

            <View style={globalStyles.separator}>
            </View>
            <View style={globalStyles.row}>
              <FontAwesome5 name="id-card" style={[globalStyles.field_Icon, globalStyles.form_FieldIcon, userSingleStyles.form_FieldIcon]} size={26} />
              <Text style={[globalStyles.field_Title, globalStyles.form_FieldTitle, userSingleStyles.form_FieldTitle]}>کد ملی:</Text>
            </View>
            <View style={globalStyles.row}>
              <TextInput multiline={true} numberOfLines={1} style={[globalStyles.text_Input, globalStyles.form_FieldValue, { textAlign: 'left' }]}
                onChangeText={setNationalCode}
                keyboardType="numeric"
                value={nationalCode}
              />
            </View>

            <View style={globalStyles.separator}>
            </View>


            <View style={globalStyles.row}>
              <FontAwesome5 name="mobile-alt" style={[globalStyles.field_Icon, globalStyles.form_FieldIcon, userSingleStyles.form_FieldIcon]} size={28} />
              <Text style={[globalStyles.field_Title, globalStyles.form_FieldTitle, userSingleStyles.form_FieldTitle]}>شماره موبایل:</Text>
            </View>
            <View style={globalStyles.row}>
              <TextInput multiline={true} numberOfLines={1} style={[globalStyles.text_Input, globalStyles.form_FieldValue, { textAlign: 'left' }]}
                onChangeText={setMobile}
                keyboardType="numeric"
                value={mobile}
              />
            </View>

            <View style={globalStyles.separator}>
            </View>

            <View style={globalStyles.row}>
              <Entypo name="tablet-mobile-combo" style={[globalStyles.field_Icon, globalStyles.form_FieldIcon, userSingleStyles.form_FieldIcon]} size={28} />
              <Text style={[globalStyles.field_Title, globalStyles.form_FieldTitle, userSingleStyles.form_FieldTitle]}>شماره موبایل دوم:</Text>
            </View>
            <View style={globalStyles.row}>
              <TextInput multiline={true} numberOfLines={1} style={[globalStyles.text_Input, globalStyles.form_FieldValue, { textAlign: 'left' }]}
                onChangeText={setMobile2}
                keyboardType="numeric"
                value={mobile2}
              />
            </View>

            <View style={globalStyles.separator}>
            </View>

            <View style={globalStyles.row}>
              <Entypo name="old-phone" style={[globalStyles.field_Icon, globalStyles.form_FieldIcon, userSingleStyles.form_FieldIcon]} size={28} />
              <Text style={[globalStyles.field_Title, globalStyles.form_FieldTitle, userSingleStyles.form_FieldTitle]}>تلفن ثابت:</Text>
            </View>
            <View style={globalStyles.row}>
              <TextInput multiline={true} numberOfLines={1} style={[globalStyles.text_Input, globalStyles.form_FieldValue, { textAlign: 'left' }]}
                onChangeText={setTel}
                keyboardType="numeric"
                value={tel}
              />
            </View>

            <View style={globalStyles.separator}>
            </View>

            <View style={globalStyles.row}>
              <FontAwesome5 name="question-circle" style={[globalStyles.field_Icon, globalStyles.form_FieldIcon, userSingleStyles.form_FieldIcon]} size={30} />
              <Text style={[globalStyles.field_Title, globalStyles.form_FieldTitle, userSingleStyles.form_FieldTitle]}>نوع کاربر:</Text>
            </View>
            <View style={globalStyles.row}>
              <RadioButtonRN
                data={userTypes}
                selectedBtn={(e) => { try { setRole(e.value); } catch (error) { console.log(error) } }}
                icon={
                  <Icon
                    name="check-circle"
                    size={25}
                    color="#2c9dd1"
                  />

                }
                initial={role - 1}
                style={userSingleStyles.form_checkBoxGroup}
                boxStyle={userSingleStyles.form_checkBox}
                textStyle={userSingleStyles.form_checkBoxTitle}
              />
            </View>
            <View style={globalStyles.separator}>
            </View>
            {(role == 2) ? <>
              <View style={globalStyles.row}>
                <MaterialCommunityIcons name="truck" style={[globalStyles.field_Icon, globalStyles.form_FieldIcon, userSingleStyles.form_FieldIcon]} size={30} />
                <Text style={[globalStyles.field_Title, globalStyles.form_FieldTitle, userSingleStyles.form_FieldTitle]}>نوع ماشین:</Text>
              </View>
              <View style={globalStyles.row}>
                <CarTypeCombo selectedValue={carTypeId} percentWidth={87} zIndex={9997} placeholder={'انتخاب...'} onValueChange={setCarTypeId} />
              </View>
              <View style={globalStyles.separator}>
              </View>
              <View style={globalStyles.row}>
                <AntDesign name="barcode" style={[globalStyles.field_Icon, globalStyles.form_FieldIcon, userSingleStyles.form_FieldIcon]} size={30} />
                <Text style={[globalStyles.field_Title, globalStyles.form_FieldTitle]}>پلاک ماشین:</Text>
              </View>
              <View style={[globalStyles.row, { flexDirection: 'row-reverse' }]}>
                <TextInput multiline={true} numberOfLines={1} style={[globalStyles.text_Input, globalStyles.form_FieldValue, userSingleStyles.plate1]}
                  onChangeText={setPlate1}
                  keyboardType="numeric"
                  maxLength={2}
                  value={plate1} />
                <View style={globalStyles.col_1}></View>
                <CharCombo selectedValue={plate2} percentWidth={17} zIndex={9996} onValueChange={setPlate2} />
                <View style={globalStyles.col_1}></View>
                <TextInput multiline={true} numberOfLines={1} style={[globalStyles.text_Input, globalStyles.form_FieldValue, userSingleStyles.plate3]}
                  onChangeText={setPlate3}
                  keyboardType="numeric"
                  maxLength={3}
                  value={plate3} />
                <Text style={userSingleStyles.dash}> - </Text>
                <View>
                  <TextInput multiline={true} numberOfLines={1} style={[globalStyles.text_Input, globalStyles.form_FieldValue, userSingleStyles.plate4]}
                    onChangeText={setPlate4}
                    keyboardType="numeric"
                    maxLength={2}
                    value={plate4} />
                  <Text style={[globalStyles.field_Title, userSingleStyles.iran]}>ایران</Text>
                </View>
              </View>
              <View style={globalStyles.separator}>
              </View>

            </> : <></>}

            <View style={globalStyles.row}>
              <MaterialIcons name="location-on" style={[globalStyles.field_Icon, globalStyles.form_FieldIcon, userSingleStyles.form_FieldIcon]} size={30} />
              <Text style={[globalStyles.field_Title, globalStyles.form_FieldTitle, userSingleStyles.form_FieldTitle]}>آدرس محل سکونت:</Text>
            </View>
            <View style={globalStyles.row}>
              <TextInput style={[globalStyles.text_Input, globalStyles.form_FieldValue]}
                onChangeText={setAddress}
                scrollEnabled={true}
                multiline={true}
                numberOfLines={3}
                value={address}
              />
            </View>
            <View style={globalStyles.separator}>
            </View>


            <View style={globalStyles.row}>
              <FontAwesome name="credit-card" style={[globalStyles.field_Icon, globalStyles.form_FieldIcon, userSingleStyles.form_FieldIcon]} size={26} />
              <Text style={[globalStyles.field_Title, globalStyles.form_FieldTitle, userSingleStyles.form_FieldTitle]}>اعتبار کاربر (بر حسب روز):</Text>
            </View>
            <View style={globalStyles.row}>
              <TextInput multiline={true} numberOfLines={1} style={[globalStyles.text_Input, globalStyles.form_FieldValue, { textAlign: 'left' }]}
                onChangeText={setDayCountToExpire}
                keyboardType="numeric"
                value={dayCountToExpire.toString()}
              />
            </View>


            <View style={globalStyles.separator}>
            </View>


            <View style={[globalStyles.row, { justifyContent: 'center', marginVertical: 20 }]}>

              <TouchableOpacity
                onPress={() => { Linking.openURL('https://docs.sadeghbar.com/Docs/index/' + id.toString() + "/" + token); }}>
                <FontAwesome5 name="external-link-alt" style={[globalStyles.field_Icon, globalStyles.form_FieldIcon, userSingleStyles.form_FieldIcon]} size={25} />
              </TouchableOpacity>

              <Text style={isActive ? [globalStyles.field_Title, globalStyles.form_FieldTitle, userSingleStyles.form_FieldTitle, userSingleStyles.form_IsActiveTitle, userSingleStyles.field_Value_Success] : [globalStyles.field_Title, globalStyles.form_FieldTitle, userSingleStyles.form_FieldTitle, userSingleStyles.form_IsActiveTitle]}>مدارک کاربر مورد تایید است</Text>
              <BouncyCheckbox
                size={30}
                fillColor="#28a745"
                unfillColor="#FFFFFF"
                isChecked={isActive}
                iconStyle={{ borderColor: "#28a745" }}
                innerIconStyle={{ borderWidth: 1, borderColor: '#01477c' }}
                disableBuiltInState
                onPress={() => setIsActive(!isActive)}
              />

              {/* <Switch style={[globalStyles.swith_Input, userSingleStyles.isActive_Swith]} color={'#007bff'} trackColor={{ true: '#8ac0fa' }} value={isActive} onValueChange={setIsActive} /> */}
            </View>

            <View style={globalStyles.row}>
              <TouchableOpacity
                style={[globalStyles.submitButton, userSingleStyles.submitButton, { backgroundColor: '#01477c' }]}
                onPress={onSubmit}
              >
                <Text style={globalStyles.submitButton_Text}> ثبت تغییرات </Text>
              </TouchableOpacity>
            </View>
          </View>

          <SendPureSms userId={id} />
          <UserBehavior userId={id} userFullName={name + " " + family} navigation={navigation} />
          <UserSuspend navigation={navigation} userId={id} isSuspend={isSuspend} dayCountToUnSuspend={dayCountToUnSuspend} suspendReason={suspendReason} />
          <AddLog userId={id} />
          <UserLog userId={id} />

        </View>
      </ScrollView>
      <Loading loading={loading} />
      <TouchableOpacity
        style={globalStyles.backButton}
        onPress={() => navigation.goBack()}>
        <Feather name="arrow-right" size={30} color="white" />
      </TouchableOpacity>
    </>
  )
}
