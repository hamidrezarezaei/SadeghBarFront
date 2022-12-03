import { View, TouchableWithoutFeedback, FlatList, TouchableOpacity, Modal } from 'react-native'
import React, { useCallback, useState, useEffect } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { GetList_Admin_Cargo_Api, GetList_Admin_GreaterThanId_Cargo_Api } from '../../Api/cargoApi';
import { useToast } from "react-native-toast-notifications";
import Loading from '../../Component/Loading/Loading';
import { globalStyles } from '../../assets/Styles/GlobalStyle';
import { adminCargoListStyles } from './AdminCargoListStyle';
import CargoInfo from '../../Component/CargoList/CargoInfo/CargoInfo';
import SearchCargo from '../../Component/Search/SearchCargo/SearchCargo';
import { FontAwesome } from '@expo/vector-icons';
import { SetLastCargoId } from '../../Util/LastCargoIdLoadedUtils';
import UserDocs from '../../Component/CargoList/SendDocs/UserDocs';
import ExtendCredit from '../../Component/CargoList/ExtendCredit/ExtendCredit';

// =================================================================
export default function AdminCargoListScreen(props) {
  const [loading, setLoading] = useState(false);
  const [isShowSearchCargo, SetIsShowSearchCargo] = useState(false);
  const toast = useToast();

  const [cargoes, setCargoes] = useState([]);

  const [pageNumber, setPageNumber] = useState(1);
  //برای اینکه وقتی بعد از این باری اضافه شد هم بتوانیم بارها را لود کنیم
  const [baseId, setBaseId] = useState(0);
  const [pageCount, setPageCount] = useState(1);

  const [code, setCode] = useState(0);
  const [sourceStateId, setSourceStateId] = useState(0);
  const [destinationStateId, setDestinationStateId] = useState(0);
  const [carTypeId, setCarTypeId] = useState(0);
  const [includeSmalls, setIncludeSmalls] = useState(true);
  const [includeLarges, setIncludeLarges] = useState(true);

  const [isShowUserDocs, setIsShowUserDocs] = useState(true);
  const [isShowExtendCredit, setIsShowExtendCredit] = useState(true);


  // =================================================================
  useFocusEffect(
    useCallback(() => {
      setPageNumber(1);
      loadData(1);
    }, [code, sourceStateId, destinationStateId, carTypeId, includeSmalls, includeLarges])
  );

  // =================================================================
  //وقتی که اسکرول به آخر رسید و شماره صفحه تغییر کرد دیتاهای صفحه بعدی لود می شوند.
  useEffect(() => {
    if (pageNumber == 1)
      return;
    if (pageNumber > pageCount)
      return;
    loadData(pageNumber);
  }, [pageNumber]);
  // =================================================================
  let timer

  //رفرش شدن برای بار جدید
  useEffect(() => {
    timer = setInterval(refreshScreen, 8000);

    return () => {
      clearInterval(timer);
      // console.log('refres cleared');
    };
  }, [code, sourceStateId, destinationStateId, carTypeId, includeSmalls, includeLarges, baseId]);
  // =================================================================
  const loadData = async (pNumber = 1) => {
    try {
      setLoading(true);

      let searchParams = {
        baseId: baseId,
        pageNumber: pNumber,
        code: code ? code : 0,
        sourceStateId: sourceStateId,
        destinationStateId: destinationStateId,
        carType: carTypeId,
        includeSmalls: includeSmalls,
        includeLarges: includeLarges,
      };
      // console.log(searchParams);
      let data = await GetList_Admin_Cargo_Api(searchParams);
      if (data.messageStatus == "Successful") {
        setPageCount(data.messageData.pageCount);
        // console.log("cargoes",data.messageData.data);
        if (pNumber == 1) {
          setCargoes(data.messageData.data);
          if (data.messageData.data && data.messageData.data.length > 0) {
            //برای همین صفحه
            setBaseId(data.messageData.data[0].id);
            //برای کل سیستم
            await SetLastCargoId(data.messageData.data[0].id);
            // console.log('data loaded', data.messageData.data[0].id);
          }
        }
        else
          setCargoes([...cargoes, ...data.messageData.data]);

        setLoading(false);
      }
      else {
        setLoading(false);
        toast.show(data.message, { type: "danger" });
      }
    }
    catch (error) {
      setLoading(false);
      console.log(error);
      toast.show("خطا در ارتباط با سرور.", { type: "danger" });
    }
  }
  // =================================================================
  const refreshScreen = async () => {
    try {
      // console.log('refresh start');
      // setLoading(true);
      let searchParams = {
        baseId: baseId,
        code: code,
        sourceStateId: sourceStateId,
        destinationStateId: destinationStateId,
        carType: carTypeId,
        includeSmalls: includeSmalls,
        includeLarges: includeLarges,
      };
      // console.log('refreshscreen', searchParams);

      let data = await GetList_Admin_GreaterThanId_Cargo_Api(searchParams);
      if (data.messageStatus == "Successful") {
        if (data.messageData.data && data.messageData.data.length > 0) {
          var newCargoes = data.messageData.data;
          setCargoes([...newCargoes, ...cargoes]);
          setBaseId(newCargoes[0].id);
          await SetLastCargoId(newCargoes[0].id);
          if (await isBackgroundFetchRegistered())
            playSound();
          for (var i = 0; i < newCargoes.length; i++) {
            var s = newCargoes[i].sourceStateTitle;
            if (newCargoes[i].sourceStateTitle && newCargoes[i].sourceStateTitle != "")
              s += " - " + newCargoes[i].sourceCityTitle;

            var d = newCargoes[i].destinationStateTitle;
            if (newCargoes[i].destinationStateTitle && newCargoes[i].destinationStateTitle != "")
              d += " - " + newCargoes[i].destinationCityTitle;

          }
          // console.log('BaseId set to' + data.messageData.data[0].id);
        }
      }
      else {
      }
      // console.log('refres done');

    }
    catch (error) {
      // toast.show(error, { type: "danger" });
    }
  }

  // =================================================================
  const FlatList_Item = (item) => {
    return (
      <CargoInfo
        cargo={item}
        navigation={props.navigation}
        setLoading={setLoading}
        isShowComment={false}
        isShowCode={true}
        isShowCargoStatus={true}
        isShowTakeByDriverImage={false}
        isShowMoreInfoButton={false}
        isShowAdminButtons={true}
        isShowApproveButtons={false}
        onEditPress={() =>
          props.navigation.navigate('EditCargoScreen', { cargoId: item?.id })}
        isShowSubmitterInfo={true}
        isShowDriverInfo={true}
        isShowQueue={true}
        isColorfull={true}
      />
    );
  }
  // =================================================================
  return (
    <View style={{ flex: 1 }} nestedScrollEnabled={true} >
      <View style={[globalStyles.screenContainer, adminCargoListStyles.screenContainer]} >

        <UserDocs isShowUserDocs={isShowUserDocs} setIsShowUserDocs={setIsShowUserDocs} navigation={props.navigation} />
        <ExtendCredit isShowExtendCredit={isShowExtendCredit} setIsShowExtendCredit={setIsShowExtendCredit} />
        <SearchCargo isShowSearchCargo={isShowSearchCargo} SetIsShowSearchCargo={SetIsShowSearchCargo} code={code} setCode={setCode} sourceStateId={sourceStateId} setSourceStateId={setSourceStateId} destinationStateId={destinationStateId} setDestinationStateId={setDestinationStateId} carTypeId={carTypeId} setCarTypeId={setCarTypeId} includeSmalls={includeSmalls} setIncludeSmalls={setIncludeSmalls} includeLarges={includeLarges} setIncludeLarges={setIncludeLarges} />

        <View style={adminCargoListStyles.cargoesContainer}>
          <FlatList
            data={cargoes}
            renderItem={({ item }) => FlatList_Item(item)}
            onEndReached={() => { if (pageNumber < pageCount) setPageNumber(pageNumber + 1) }}
            onEndReachedThreshold={.8}
          />
        </View>
        <TouchableOpacity
          style={globalStyles.searcButton}
          onPress={() => SetIsShowSearchCargo(true)}>
          <FontAwesome name="search" size={30} color="white" />
        </TouchableOpacity>
      </View>
      <Loading loading={loading} />
    </View>
  )
}