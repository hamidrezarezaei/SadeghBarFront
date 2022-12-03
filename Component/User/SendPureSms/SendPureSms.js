import {  Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { sendPureSmsStyles } from './SendPureSmsStyle'
import { globalStyles } from '../../../assets/Styles/GlobalStyle'
import { SendPureSms_User_Api } from '../../../Api/userApi';
import { useToast } from "react-native-toast-notifications";
import Loading from '../../Loading/Loading';
// =================================================================

export default function SendPureSms({ userId }) {
  const [loading, setLoading] = useState(false);
  const [smsText, setSmsText] = useState("");
  const toast = useToast();

  // =================================================================
  const onSubmit = async () => {
    try {
      setLoading(true);
      const smsInfo = {
        userId: userId,
        text: smsText
      }
      
      let data = await SendPureSms_User_Api(smsInfo);
      if (data.messageStatus == "Successful") {
        setLoading(false);
        toast.show(data.message, { type: "success" });
        setSmsText("");
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
    <View style={[globalStyles.boxContainer, sendPureSmsStyles.boxContainer]}>
      <View style={sendPureSmsStyles.headerContainer}>
        <Text style={sendPureSmsStyles.headerText}>
          ارسال پیام به کاربر
        </Text>
      </View>

      <View style={sendPureSmsStyles.bodyContainer}>


        <View style={globalStyles.row}>
          <Text style={[globalStyles.field_Title, globalStyles.form_FieldTitle, sendPureSmsStyles.form_FieldTitle]}>متن پیامک:</Text>
        </View>
        <View style={globalStyles.row}>
          <TextInput style={[globalStyles.text_Input, globalStyles.form_FieldValue]}
            multiline={true}
            numberOfLines={2}
            onChangeText={setSmsText}
            value={smsText}
          />
        </View>
        <View style={globalStyles.row}>
          <TouchableOpacity
            style={[globalStyles.successButton, sendPureSmsStyles.submitButton]}
            onPress={onSubmit}
          >
            <Text style={globalStyles.successButton_Text}>ارسال پیام</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Loading loading={loading} />
    </View>
  )
}
