import React, { useContext, useState, useEffect } from 'react';
import { Button, Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { VerifyMobile_User_Api } from '../../Api/userApi';
import Loading from '../../Component/Loading/Loading';
import UserContext from '../../Context/UserContext';
import { useToast } from "react-native-toast-notifications";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { verifyStyles } from './VerifyStyle';
import { globalStyles } from '../../assets/Styles/GlobalStyle';
// =================================================================
export default function VerifyScreen(props) {
  const context = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState(null);
  const toast = useToast();
  // =================================================================
  const verifyMobile = async () => {
    try {
      setLoading(true);
      let verifyInfo = {
        Mobile: context.mobile,
        Code: code
      };

      let data = await VerifyMobile_User_Api(verifyInfo);
      if (data.messageStatus == "Successful") {
        setLoading(false);
        // toast.show(data.message, { type: "success" });
        if (data.additional) {
          try {
            await AsyncStorage.setItem("token", data.additional);
          } catch (e) {
          }
          props.navigation.reset({
            index: 0,
            routes: [{ name: 'WelcomeScreen' }],
          });
          // props.navigation.navigate('WelcomeScreen');
        }

        else {
          props.navigation.reset({
            index: 0,
            routes: [
              { 
                name: 'HomeNavigator',
                params: { screen: 'AddUserScreen' },
              },
          ],
          });
          // props.navigation.navigate('HomeNavigator', { screen: 'AddUserScreen' });
        }
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

    <View style={verifyStyles.continer}>
      <Image
        source={require('../../assets/imgs/logo200_blue.png')}
      />
      <Text style={verifyStyles.helpText}>
        کد تایید پیامک شده را اینجا وارد کنید:
      </Text>

      <TextInput
        style={verifyStyles.verifyCode}
        keyboardType="numeric"
        placeholder="- - - -"
        onChangeText={setCode}
        value={code}
      />
      <View style={verifyStyles.row_Button}>
        <TouchableOpacity
          style={[globalStyles.secondaryButton, verifyStyles.changeMobileButton]}
          onPress={() =>props.navigation.reset({index: 0,routes: [{name: 'LoginScreen'}]})}
        >
          <Text style={globalStyles.submitButton_Text}>تغییر شماره همراه</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[globalStyles.submitButton, verifyStyles.submitButton]}
          onPress={() => verifyMobile()}
        >
          <Text style={globalStyles.submitButton_Text}>تایید</Text>
        </TouchableOpacity>


      </View>
      <Loading loading={loading} />
    </View>
  )
}
