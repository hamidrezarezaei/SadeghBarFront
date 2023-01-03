import React, { useEffect, useState } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, Alert, Linking } from 'react-native'
import { useToast } from 'react-native-toast-notifications';
import { CancelBySubmitter_Cargo_Api } from '../../../Api/cargoApi';
import { Enter_Queue_Api, Exit_Queue_Api, ExtendTime_Queue_Api, TakeByDriver_Queue_Api } from '../../../Api/queueApi';
import { globalStyles } from '../../../assets/Styles/GlobalStyle';
import { behaviorButtonsStyles } from './BehaviorButtonsStyle';

// =================================================================
export default function BehaviorButtons({
  navigation,
  cargoId,
  tel,
  isMyCargo,
  isMeWaitingInQueue,
  isMeInFrontOfQueue,
  setLoading,
  setRemainingTime,
  loadCargo
}) {
  const toast = useToast();
  // =================================================================
  const [isExtendTime, setIsExtendTime] = useState(false);
  const [isCalled, setIsCalled] = useState(false);
  // =================================================================

  useEffect(() => {
  }, [isMyCargo, isMeWaitingInQueue, isMeInFrontOfQueue]);
  // =================================================================
  const enterToQueue = async () => {
    try {
      setLoading(true);
      let data = await Enter_Queue_Api(cargoId);
      if (data.messageStatus == "Successful") {
        setLoading(false);
        if (loadCargo)
          loadCargo();
        toast.show(data.message, { type: "success" });
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
  const exitFromQueueConfirm = () => {
    Alert.alert('', 'آیا در مورد انصراف از این بار اطمینان دارید؟', [
      {
        text: 'خیر',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'بله', onPress: () => exitFromQueue() },
    ]);

  }

  const exitFromQueue = async () => {
    try {
      setLoading(true);
      let data = await Exit_Queue_Api(cargoId);
      if (data.messageStatus == "Successful") {
        setLoading(false);
        toast.show(data.message, { type: "success" });
        navigation.navigate('CargoListScreen');

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
  const takeByDriverConfirm = async () => {
    Alert.alert('', 'آیا در مورد گرفتن این بار اطمینان دارید؟', [
      {
        text: 'خیر',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'بله', onPress: () => takeByDriver() },
    ]);

  }
  const takeByDriver = async () => {
    try {
      setLoading(true);
      let data = await TakeByDriver_Queue_Api(cargoId);
      if (data.messageStatus == "Successful") {
        setLoading(false);
        toast.show(data.message, { type: "success" });
        navigation.reset({
          index: 0,
          routes: [{ name: 'CargoListScreen' }],
        });
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
  const cancelBySubmitterConfirm = async () => {
    Alert.alert('', 'آیا از کنسل شدن این بار اطمینان دارید؟', [
      {
        text: 'خیر',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'بله', onPress: () => cancelBySubmitter() },
    ]);
  }
  const cancelBySubmitter = async () => {
    try {
      setLoading(true);
      let data = await CancelBySubmitter_Cargo_Api(cargoId);
      if (data.messageStatus == "Successful") {
        setLoading(false);
        toast.show(data.message, { type: "success" });
        navigation.navigate('CargoListScreen');
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
  const extendTime = async () => {
    try {
      setLoading(true);
      let data = await ExtendTime_Queue_Api(cargoId);
      if (data.messageStatus == "Successful") {
        setRemainingTime(0);
        setLoading(false);
        loadCargo();
        setIsExtendTime(true);
        toast.show(data.message, { type: "success" });
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
  if (isMeInFrontOfQueue)
    return (

      <View style={behaviorButtonsStyles.row_Buttons}>
        <TouchableOpacity
          style={[globalStyles.dangerButton, behaviorButtonsStyles.dontTakeButton]}
          onPress={exitFromQueueConfirm}>
          <Text style={[globalStyles.dangerButton_Text]}>این بار را نمی برم</Text>
        </TouchableOpacity>
        {isCalled ?
          <TouchableOpacity
            style={[globalStyles.successButton, behaviorButtonsStyles.takeButton]}
            onPress={takeByDriverConfirm}>
            <Text style={[globalStyles.successButton_Text]}>این بار را می برم</Text>
          </TouchableOpacity> :
          <TouchableOpacity
            style={[globalStyles.successButton, behaviorButtonsStyles.takeButton]}
            onPress={() => { Linking.openURL('tel:' + tel); setIsCalled(true)}}>
            <Text style={[globalStyles.successButton_Text]}>تماس با اعلام کننده</Text>
          </TouchableOpacity>
        }
        <TouchableOpacity
          style={[globalStyles.secondaryButton, behaviorButtonsStyles.cargoCanceledButton]}
          onPress={cancelBySubmitterConfirm}>
          <Text style={[globalStyles.secondaryButton_Text]}>اعلام کننده بار را لغو کرد</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style=
          {!isExtendTime
            ? [globalStyles.submitButton, behaviorButtonsStyles.extendTimeButton]
            : [globalStyles.submitButton, behaviorButtonsStyles.extendTimeButton, globalStyles.disabledButton]
          }
          onPress={extendTime}>
          <Text style={[globalStyles.submitButton_Text]}>نیاز به زمان بیشتر دارم</Text>
        </TouchableOpacity>
      </View>
    )
  else
    return (
      <View style={behaviorButtonsStyles.row_EnterExit}>
        {!isMyCargo ?
          isMeWaitingInQueue ?
            (
              <TouchableOpacity
                style={[globalStyles.dangerButton, behaviorButtonsStyles.exitButton]}
                onPress={exitFromQueueConfirm}>
                <Text style={globalStyles.dangerButton_Text}>خروج از صف</Text>
              </TouchableOpacity>) :
            (
              <TouchableOpacity
                style={[globalStyles.submitButton, behaviorButtonsStyles.enterButton]}
                onPress={enterToQueue}>
                <Text style={globalStyles.submitButton_Text}>ورود به صف انتظار</Text>
              </TouchableOpacity>
            ) : (<></>)}
        <TouchableOpacity
          style={[globalStyles.secondaryButton, behaviorButtonsStyles.returnButton]}
          onPress={() => navigation.goBack()}>
          <Text style={globalStyles.secondaryButton_Text}>بازگشت</Text>
        </TouchableOpacity>
      </View>
    )
}