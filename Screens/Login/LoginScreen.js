import React, { useContext, useState, useEffect } from 'react';
import { Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useToast } from "react-native-toast-notifications";
import { SendVerifySms_User_Api } from '../../Api/userApi';
import { globalStyles } from '../../assets/Styles/GlobalStyle';
import Loading from '../../Component/Loading/Loading';
import { loginStyles } from './LoginStyle';
import UserContext from '../../Context/UserContext';
// =================================================================
export default function LoginScreen(props) {
  const [loading, setLoading] = useState(false);
  const [mobile, setMobile] = useState(null);
  const toast = useToast();
  const context = useContext(UserContext);
  // =================================================================
  const sendVerifySms = async () => {
    try {
      setLoading(true);
      context.mobile =mobile;
      let data = await SendVerifySms_User_Api(mobile);
      if (data.messageStatus == "Successful") {
        setLoading(false);
        // toast.show(data.message, { type: "success" });
        props.navigation.reset({
          index: 0,
          routes: [{ name: 'VerifyScreen' }],
        });
        // props.navigation.navigate('VerifyScreen');
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
    <View style={loginStyles.continer}>
      <Image
        source={require('../../assets/imgs/logo200_blue.png')}
      />
      <Text style={loginStyles.forStartText}>
        برای شروع، شماره موبایل خود را وارد نمایید.
      </Text>
      <TextInput
        style={loginStyles.mobile}
        keyboardType="numeric"
        onChangeText={setMobile}
        placeholder="- - - - - - - - - - -"
        value={mobile}
      />
      <Text style={loginStyles.lawText}>
        ورود به معنی پذیرش قوانین می باشد.
      </Text>

      <TouchableOpacity
              style={[globalStyles.submitButton, loginStyles.submitButton]}
              onPress={() => sendVerifySms()}
            >
              <Text style={globalStyles.submitButton_Text}>ورود به نرم افزار</Text>
            </TouchableOpacity>
      <Loading loading={loading} />
    </View>
  )
}
