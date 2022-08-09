import { Keyboard, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { globalStyles } from '../../assets/Styles/GlobalStyle';
import Loading from '../../Component/Loading/Loading';
import { addUserStyles } from './AddUserStyle';
import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { MaterialIcons } from '@expo/vector-icons';
import RadioButtonRN from 'radio-buttons-react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CarTypeCombo from '../../Component/CarTypeCombo/CarTypeCombo';
import { AddUser_User_Api } from '../../Api/userApi';
import { useToast } from "react-native-toast-notifications";
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserContext from '../../Context/UserContext';

// =================================================================

export default function AddUserScreen(props) {
  const [loading, setLoading] = useState(false);
  const context = useContext(UserContext);

  const [nationalCode, setNationalCode] = useState("");
  const [name, setName] = useState("");
  const [family, setFamily] = useState("");
  const [mobile, setMobile] = useState(context.mobile);
  const [mobile2, setMobile2] = useState("");
  const [address, setAddress] = useState("");
  const [tel, setTel] = useState("");
  const [carTypeId, setCarTypeId] = useState(0);
  const [role, setRole] = useState(2);
  const toast = useToast();

  const userTypes = [
    {
      label: 'راننده',
      value: 2,
    },
    {
      label: 'باربری',
      value: 3,
    }
  ];
  // =================================================================
// جواب نداد
  useEffect(() => {
    setNationalCode("");
    setName("");
    setFamily("");
    setMobile(context.mobile);
    setMobile2("");
    setAddress("");
    setTel("");
    setCarTypeId(0);
    setRole(2);
  }, []);
  // =================================================================

  // =================================================================
  const onSubmit = async () => {
    try {
      setLoading(true);
      // console.log('submit ok');
      let user = {
        "nationalCode": nationalCode,
        "name": name,
        "family": family,
        "mobile": mobile,
        "mobile2": mobile2,
        "address": address,
        "tel": tel,
        "role": role,
        "carTypeId": carTypeId,
      };

      let data = await AddUser_User_Api(user);
      if (data.messageStatus == "Successful") {
        setLoading(false);

        //ادمین در حال اضافه کردن نیست
        //بپر به صفحه خوش آمد گویی
        if (context.CurrentUser == null) {
          await AsyncStorage.setItem("token", data.additional);
          props.navigation.navigate('WelcomeScreen');
        }
        else {
          props.navigation.navigate('UserListScreen');
          toast.show(data.message, { type: "success" });
        }
      }
      else {
        setLoading(false);
        toast.show(data.message, { type: "danger" });
      }
    }
    catch (error) {
      setLoading(false);
      toast.show(error.toString(), { type: "danger" });
    }
  }
  // =================================================================

  return (
    <ScrollView style={{ flex: 1 }} nestedScrollEnabled={true} >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={[globalStyles.screenContainer, globalStyles.form_ScreenContainer]}>
          <View style={globalStyles.form_Container}>
            <View style={globalStyles.row}>
              <FontAwesome5 name="user-tie" style={[globalStyles.field_Icon, globalStyles.form_FieldIcon]} size={26} />
              <Text style={[globalStyles.field_Title, globalStyles.form_FieldTitle]}>نام:</Text>
            </View>
            <View style={globalStyles.row}>
              <TextInput style={[globalStyles.text_Input, globalStyles.form_FieldValue]}
                onChangeText={setName}
                value={name}
              />
            </View>

            <View style={globalStyles.separator}>
            </View>

            <View style={globalStyles.row}>
              <FontAwesome5 name="users" style={[globalStyles.field_Icon, globalStyles.form_FieldIcon]} size={26} />
              <Text style={[globalStyles.field_Title, globalStyles.form_FieldTitle]}>نام خانوادگی:</Text>
            </View>
            <View style={globalStyles.row}>
              <TextInput style={[globalStyles.text_Input, globalStyles.form_FieldValue]}
                onChangeText={setFamily}
                value={family}
              />
            </View>

            <View style={globalStyles.separator}>
            </View>

            <View style={globalStyles.row}>
              <FontAwesome5 name="id-card" style={[globalStyles.field_Icon, globalStyles.form_FieldIcon]} size={26} />
              <Text style={[globalStyles.field_Title, globalStyles.form_FieldTitle]}>کد ملی:</Text>
            </View>
            <View style={globalStyles.row}>
              <TextInput style={[globalStyles.text_Input, globalStyles.form_FieldValue, { textAlign: 'left' }]}
                onChangeText={setNationalCode}
                keyboardType="numeric"
                value={nationalCode}
              />
            </View>

            <View style={globalStyles.separator}>
            </View>


            <View style={globalStyles.row}>
              <FontAwesome5 name="mobile-alt" style={[globalStyles.field_Icon, globalStyles.form_FieldIcon]} size={28} />
              <Text style={[globalStyles.field_Title, globalStyles.form_FieldTitle]}>شماره موبایل:</Text>
            </View>
            <View style={globalStyles.row}>
              <TextInput style={[globalStyles.text_Input, globalStyles.form_FieldValue, { textAlign: 'left' }]}
                onChangeText={setMobile}
                keyboardType="numeric"
                editable={context.CurrentUser != null}
                value={mobile}
              />
            </View>

            <View style={globalStyles.separator}>
            </View>

            <View style={globalStyles.row}>
              <Entypo name="tablet-mobile-combo" style={[globalStyles.field_Icon, globalStyles.form_FieldIcon]} size={28} />
              <Text style={[globalStyles.field_Title, globalStyles.form_FieldTitle]}>شماره موبایل دوم:</Text>
            </View>
            <View style={globalStyles.row}>
              <TextInput style={[globalStyles.text_Input, globalStyles.form_FieldValue, { textAlign: 'left' }]}
                onChangeText={setMobile2}
                keyboardType="numeric"
                value={mobile2}
              />
            </View>

            <View style={globalStyles.separator}>
            </View>

            <View style={globalStyles.row}>
              <Entypo name="old-phone" style={[globalStyles.field_Icon, globalStyles.form_FieldIcon]} size={28} />
              <Text style={[globalStyles.field_Title, globalStyles.form_FieldTitle]}>تلفن ثابت:</Text>
            </View>
            <View style={globalStyles.row}>
              <TextInput style={[globalStyles.text_Input, globalStyles.form_FieldValue, { textAlign: 'left' }]}
                onChangeText={setTel}
                keyboardType="numeric"
                value={tel}
              />
            </View>

            <View style={globalStyles.separator}>
            </View>

            <View style={globalStyles.row}>
              <FontAwesome5 name="question-circle" style={[globalStyles.field_Icon, globalStyles.form_FieldIcon]} size={30} />
              <Text style={[globalStyles.field_Title, globalStyles.form_FieldTitle]}>نوع کاربر:</Text>
            </View>
            <View style={globalStyles.row}>
              <RadioButtonRN
                data={userTypes}
                selectedBtn={(e) => { setRole(e.value); }}
                icon={
                  <Icon
                    name="check-circle"
                    size={25}
                    color="#2c9dd1"
                  />

                }
                initial={1}
                style={globalStyles.form_checkBoxGroup}
                boxStyle={globalStyles.form_checkBox}
                textStyle={globalStyles.form_checkBoxTitle}
              />
            </View>
            <View style={globalStyles.separator}>
            </View>
            {(role == 2) ? <>
              <View style={globalStyles.row}>
                <MaterialCommunityIcons name="truck" style={[globalStyles.field_Icon, globalStyles.form_FieldIcon]} size={30} />
                <Text style={[globalStyles.field_Title, globalStyles.form_FieldTitle]}>نوع ماشین:</Text>
              </View>
              <View style={globalStyles.row}>
                <CarTypeCombo percentWidth={87} zIndex={9997} placeholder={'انتخاب...'} onValueChange={setCarTypeId} />
              </View>
              <View style={globalStyles.separator}>
              </View>
            </> : <></>}

            <View style={globalStyles.row}>
              <MaterialIcons name="location-on" style={[globalStyles.field_Icon, globalStyles.form_FieldIcon]} size={30} />
              <Text style={[globalStyles.field_Title, globalStyles.form_FieldTitle]}>آدرس:</Text>
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

            <View style={globalStyles.row}>
              <TouchableOpacity
                style={[globalStyles.submitButton, addUserStyles.submitButton]}
                onPress={onSubmit}
              >
                <Text style={globalStyles.submitButton_Text}> ثبت اطلاعات </Text>
              </TouchableOpacity>
            </View>




            <Loading loading={loading} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  )
}
