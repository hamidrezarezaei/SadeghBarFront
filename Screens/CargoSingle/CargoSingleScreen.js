import React, { useEffect, useState,useContext } from 'react'
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { useToast } from "react-native-toast-notifications";
import { GetById_Cargo_Api } from '../../Api/cargoApi';
import { Enter_Queue_Api, Exit_Queue_Api, ExtendTime_Queue_Api, GetItems_Queue_Api, TakeByDriver_Queue_Api } from '../../Api/queueApi';
import { CancelBySubmitter_Cargo_Api } from '../../Api/cargoApi';
import { globalStyles } from '../../assets/Styles/GlobalStyle';
import CargoInfo from '../../Component/CargoInfo/CargoInfo';
import CargoSubmitterInfo from '../../Component/CargoSubmitterInfo/CargoSubmitterInfo';
import Loading from '../../Component/Loading/Loading';
import Queue from '../../Component/Queue/Queue';
import { cargoSingleStyles } from './CargoSingleStyle';
import CountDown from '../../Component/CountDown/CountDown';
import UserContext from '../../Context/UserContext';

// =================================================================
export default function CargoSingleScreen({ navigation, route }) {
  const context = useContext(UserContext);

  const myUserId = context.CurrentUser?.id;
  const { id } = route.params;
  const [loading, setLoading] = useState(false);
  const [cargo, setCargo] = useState(null);
  const [queueItems, setQueueItems] = useState([]);
  const [currentQueueItem, setCurrentQueueItem] = useState(null);
  const [remainingTime, setRemainingTime] = useState(0);
  const [isMyCargo, setIsMyCargo] = useState(false);
  const toast = useToast();
  // =================================================================
  useEffect(() => {
    refreshScreen();
  }, []);
  // =================================================================
  useEffect(() => {
    const timerId = setInterval(() => {
      refreshScreen();
    }, 8000);
    return () => {
      clearInterval(timerId);
    };
  }, []);
  // =================================================================
  const refreshScreen = () => {
    try {
      setLoading(true);

      loadCargo();
      loadQueueItems();

      setLoading(false);
    }
    catch (error) {
      setLoading(false);
      toast.show("خطا در ارتباط با سرور.", { type: "danger" });
    }
  }
  // =================================================================
  const loadCargo = async () => {
    let data = await GetById_Cargo_Api(id);
    // console.log(id);
    if (data.messageStatus == "Successful") {
      //آیا بار ما همین یوزر است
      setIsMyCargo(data.messageData.data.submitterUserId == myUserId);
      setCargo(data.messageData.data);
    }
    else {
      toast.show(data.message, { type: "danger" });
    }
  }
  // =================================================================
  const loadQueueItems = async () => {
    let data = await GetItems_Queue_Api(id);
    if (data.messageStatus == "Successful") {
      setQueueItems(data.messageData.data);
      var t = data.messageData.data.filter(q => q.isMe && q.isFront)[0];
      // console.log(t);
      setCurrentQueueItem(t);
      //اگر سر صف هستیم زمان باقی مانده را هم بگیر
      let x = data.messageData.data.filter(q => q.isMe && q.isFront);
      if (x && x.length)
        setRemainingTime(x[0].remainingSecond);
      else
        setRemainingTime(0);
    }
    else {
      // toast.show(data.message + 'krr', { type: "danger" });
    }
  }
  // =================================================================
  const enterToQueue = async () => {
    try {
      setLoading(true);
      let data = await Enter_Queue_Api(id);
      if (data.messageStatus == "Successful") {
        setLoading(false);
        refreshScreen();
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
  const exitFromQueue = async () => {
    try {
      setLoading(true);
      let data = await Exit_Queue_Api(id);
      if (data.messageStatus == "Successful") {
        setLoading(false);
        // refreshScreen();
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
  const takeByDriver = async () => {
    try {
      setLoading(true);
      let data = await TakeByDriver_Queue_Api(id);
      if (data.messageStatus == "Successful") {
        setLoading(false);
        // refreshScreen();
        toast.show(data.message, { type: "success" });
        navigation.navigate('CarryByMeScreen');
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
  const cancelBySubmitter = async () => {
    try {
      setLoading(true);
      let data = await CancelBySubmitter_Cargo_Api(id);
      if (data.messageStatus == "Successful") {
        setLoading(false);
        // refreshScreen();
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
      let data = await ExtendTime_Queue_Api(id);
      if (data.messageStatus == "Successful") {
        setRemainingTime(0);
        setLoading(false);
        refreshScreen();
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
  const isMeInFrontOfQueue = () => {
    let x = queueItems.filter(q => q.isMe && q.isFront);
    if (x && x.length)
      return true;
  }
  // =================================================================

  return (
    <View style={{ flex: 1 }} nestedScrollEnabled={true} >

      <ScrollView style={cargoSingleStyles.screenContainer} >
      <View style={[globalStyles.row]}>
          <Text style={[globalStyles.screen_Title]}>کد بار: {cargo?.code}</Text>
        </View>
        <CargoInfo
          cargo={cargo}
          isShowMoreInfoButton={false}
          isShowCompleteInfo={true}
        />

        {remainingTime > 0 ? (
          <CountDown
            remainingTime={remainingTime}
            onEnd={refreshScreen}
          />
        ) : (<></>)}

        < CargoSubmitterInfo
          cargo={cargo}
        />
        {/* اگر سر صف بودیم دیگه صف لازم نیست نمایش داده شود و اطلاعات تماس نمایش داده می شود */}
        {!isMeInFrontOfQueue() ? (
          <Queue
            queueItems={queueItems}
            onEnterToQueue={enterToQueue}
            onExitFromQueue={exitFromQueue}
            isMyCargo={isMyCargo}
            navigation={navigation}
          />
        ) :
          <View style={cargoSingleStyles.row_Buttons}>
            <TouchableOpacity
              style={[globalStyles.dangerButton, cargoSingleStyles.dontTakeButton]}
              onPress={exitFromQueue}>
              <Text style={[globalStyles.dangerButton_Text]}>این بار را نمی برم</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[globalStyles.successButton, cargoSingleStyles.takeButton]}
              onPress={takeByDriver}>
              <Text style={[globalStyles.successButton_Text]}>این بار را می برم</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[globalStyles.secondaryButton, cargoSingleStyles.cargoCanceledButton]}
              onPress={cancelBySubmitter}>
              <Text style={[globalStyles.secondaryButton_Text]}>اعلام کننده بار را لغو کرد</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style=
              {currentQueueItem && !currentQueueItem.isExtendTime
                ? [globalStyles.submitButton, cargoSingleStyles.extendTimeButton]
                : [globalStyles.submitButton, cargoSingleStyles.extendTimeButton, globalStyles.disabledButton]
              }
              onPress={extendTime}>
              <Text style={[globalStyles.submitButton_Text]}>نیاز به زمان بیشتر دارم</Text>
            </TouchableOpacity>
          </View>
        }
        <Loading loading={loading} />
      </ScrollView>
    </View>
  )
}