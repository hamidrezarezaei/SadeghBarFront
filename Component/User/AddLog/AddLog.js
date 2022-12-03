import {  Text, TextInput, TouchableOpacity, View,Alert } from 'react-native'
import React, { useState } from 'react'
import { addLogStyles } from './AddLogStyle'
import { globalStyles } from '../../../assets/Styles/GlobalStyle'
import { AddLog_User_Api, SendPureSms_User_Api } from '../../../Api/userApi';
import { useToast } from "react-native-toast-notifications";
import Loading from '../../Loading/Loading';
// =================================================================

export default function AddLog({ userId }) {
  const [loading, setLoading] = useState(false);
  const [smsText, setSmsText] = useState("");
  const toast = useToast();

  // =================================================================

  const onSubmitConfirm = async () => {
    Alert.alert('', 'آیا از لغو بار اطمینان دارید؟', [
      {
        text: 'خیر',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'بله', onPress: () => onSubmit() },
    ]);
  }
  const onSubmit = async () => {
    try {
      setLoading(true);
      const logInfo = {
        userId: userId,
        text: smsText
      }
      
      let data = await AddLog_User_Api(logInfo);
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
    <View style={[globalStyles.boxContainer, addLogStyles.boxContainer]}>
      <View style={addLogStyles.headerContainer}>
        <Text style={addLogStyles.headerText}>
          ثبت تاریخچه جدید
        </Text>
      </View>

      <View style={addLogStyles.bodyContainer}>


        <View style={globalStyles.row}>
          <Text style={[globalStyles.field_Title, globalStyles.form_FieldTitle, addLogStyles.form_FieldTitle]}>متن:</Text>
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
            style={[globalStyles.successButton, addLogStyles.submitButton]}
            onPress={onSubmitConfirm}
          >
            <Text style={globalStyles.successButton_Text}>ثبت</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Loading loading={loading} />
    </View>
  )
}
