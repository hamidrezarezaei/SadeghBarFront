import React, { useEffect, useState, useContext } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { useToast } from "react-native-toast-notifications";
import { SmartGetById_Cargo_Api } from '../../Api/cargoApi';
import { GetItems_Queue_Api } from '../../Api/queueApi';
import { globalStyles } from '../../assets/Styles/GlobalStyle';
import CargoInfo from '../../Component/CargoList/CargoInfo/CargoInfo';
import CargoSubmitterInfo from '../../Component/CargoList/CargoSubmitterInfo/CargoSubmitterInfo';
import Loading from '../../Component/Loading/Loading';
import Queue from '../../Component/CargoList/Queue/Queue';
import { cargoSingleStyles } from './CargoSingleStyle';
import CountDown from '../../Component/CargoList/CountDown/CountDown';
import UserContext from '../../Context/UserContext';
import { IsAdminCurrentUser } from '../../Util/UserUtils';
import BehaviorButtons from '../../Component/CargoList/BehaviorButtons/BehaviorButtons';

// =================================================================
export default function CargoSingleScreen({ navigation, route }) {
  const context = useContext(UserContext);
  const myUserId = context.CurrentUser?.id;
  const { id } = route.params;
  const [loading, setLoading] = useState(false);
  const [cargo, setCargo] = useState(null);

  const [isMyCargo, setIsMyCargo] = useState(false);
  const [isMeWaitingInQueue, setIsMeWaitingInQueue] = useState(false);
  const [isMeInFrontOfQueue, setIsMeInFrontOfQueue] = useState(false);

  const [remainingTime, setRemainingTime] = useState(0);
  const toast = useToast();
  // =================================================================
  useEffect(() => {
    setLoading(true);
    loadCargo();
    setLoading(false);
  }, []);
  // =================================================================
  // useEffect(() => {
  //   const timerId = setInterval(() => {
  //     refreshScreen();
  //   }, 4000);
  //   return () => {
  //     clearInterval(timerId);
  //   };
  // }, []);
  // =================================================================
  const loadCargo = async () => {
    try {
      let data = await SmartGetById_Cargo_Api(id);
      // console.log(id);
      if (data.messageStatus == "Successful") {
        //آیا بار ما همین یوزر است
        setIsMyCargo(data.messageData.data.submitterUserId == myUserId);
        // console.log('hrr1',data.messageData.data);
        setCargo(data.messageData.data);
      }
      else {
        toast.show(data.message, { type: "danger" });
      }
    }
    catch (error) {
      // setLoading(false);
      toast.show("خطا در ارتباط با سرور.", { type: "danger" });
    }
  }

  // =================================================================

  return (
    <View style={{ flex: 1 }} nestedScrollEnabled={true} >

      <ScrollView style={cargoSingleStyles.screenContainer} keyboardShouldPersistTaps={'handled'}>
        <View style={[globalStyles.row]}>
          <Text style={[globalStyles.screen_Title]}>کد بار: {cargo?.code}</Text>
        </View>
        <CargoInfo
          cargo={cargo}
          isShowComment={true}
          isShowCode={false}
          isShowCargoStatus={false}
          isShowMoreInfoButton={false}
          isShowTakeByDriverImage={false}
          isShowCompleteInfo={true}
          isShowAdminButtons={false}
          isShowApproveButtons={false}
          onEditPress={null}
          isShowSubmitterInfo={false}
          isShowDriverInfo={false}
          isShowQueue={false}
          isColorfull={false}
          navigation={navigation}
          setLoading={setLoading}
        />
        {remainingTime > 0 ?
          <CountDown remainingTime={remainingTime} onEnd={() => { loadCargo(); setIsMeInFrontOfQueue(false) }} />
          : <></>
        }
        < CargoSubmitterInfo cargo={cargo} />
        <Queue cargo={cargo} loadCargo={loadCargo} isMyCargo={isMyCargo} setIsMeWaitingInQueue={setIsMeWaitingInQueue} setRemainingTime={setRemainingTime} isMeInFrontOfQueue={isMeInFrontOfQueue} setIsMeInFrontOfQueue={setIsMeInFrontOfQueue} navigation={navigation} setLoading={setLoading} />
        <BehaviorButtons isMyCargo={isMyCargo} cargoId={cargo?.id} isMeWaitingInQueue={isMeWaitingInQueue} isMeInFrontOfQueue={isMeInFrontOfQueue} setRemainingTime={setRemainingTime} loadCargo={loadCargo} navigation={navigation} setLoading={setLoading} />

      </ScrollView>
      <Loading loading={loading} />
    </View>
  )
}