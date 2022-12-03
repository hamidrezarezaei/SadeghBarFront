import { Text, View, Button, TouchableWithoutFeedback, ScrollView, Keyboard, FlatList, TouchableOpacity, Modal, TouchableHighlight } from 'react-native'
import React, { useCallback, useState, useEffect } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { useToast } from "react-native-toast-notifications";
import Loading from '../Loading/Loading';
import { globalStyles } from '../../assets/Styles/GlobalStyle';
import CargoInfo from '../CargoList/CargoInfo/CargoInfo';
import SearchCargo from '../Search/SearchCargo/SearchCargo';
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { GetAllSubmitByUser_Cargo_Api } from '../../Api/cargoApi';
import { userSubmissionCargoesStyles } from './UserSubmissionCargoesStyles';
import CargoDetails from './CargoDetails';
// =================================================================

export default function UserSubmissionCargoes({
  userId,
  userFullName,
  navigation,
  isShowCompleteInfo = false,
  isShowBackButton = false,
}) {
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [cargoes, setCargoes] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageCount, setPageCount] = useState(1);

  const [code, setCode] = useState(0);
  const [sourceStateId, setSourceStateId] = useState(0);
  const [destinationStateId, setDestinationStateId] = useState(0);
  const [carTypeId, setCarTypeId] = useState(0);
  const [includeSmalls, isetIncludeSmalls] = useState(true);
  const [includeLarges, setIncludeLarges] = useState(true);

  const toast = useToast();
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
  const loadData = async (pNumber = 1) => {
    try {
      setLoading(true);

      let searchParams = {
        userId: userId,
        PageNumber: pNumber,
        code: code,
        sourceStateId: sourceStateId,
        destinationStateId: destinationStateId,
        carType: carTypeId,
        includeSmalls: includeSmalls,
        includeLarges: includeLarges,

      };

      let data = await GetAllSubmitByUser_Cargo_Api(searchParams);
      if (data.messageStatus == "Successful") {
        setPageCount(data.messageData.pageCount);
        // console.log("cargoes",data.messageData.data);
        if (pNumber == 1)
          setCargoes(data.messageData.data);
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
      toast.show("خطا در ارتباط با سرور.", { type: "danger" });
    }
  }
  
   // =================================================================
   const refreshData = () => {
    setPageNumber(1);
      loadData(1);
  }
  
  
  // =================================================================
  const FlatList_Item = (item) => {
    return (
      <CargoDetails cargo={item} navigation={navigation} setLoading={setLoading} refreshData={refreshData} isShowCompleteInfo={isShowCompleteInfo} />
    );
  }
  // =================================================================
  return (
    <View style={{ flex: 1 }} nestedScrollEnabled={true} >
      <View style={[globalStyles.row]}>
        <Text style={[globalStyles.screen_Title]}>بارهای اعلامی توسط {userFullName}</Text>
      </View>
      <View style={[globalStyles.screenContainer, userSubmissionCargoesStyles.screenContainer]} >
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}>
          <TouchableWithoutFeedback
            onPress={() => {
              setModalVisible(false);
            }}>
            <SearchCargo
              code={code}
              setCode={setCode}
              sourceStateId={sourceStateId}
              setSourceStateId={setSourceStateId}
              destinationStateId={destinationStateId}
              setDestinationStateId={setDestinationStateId}
              carTypeId={carTypeId}
              setCarTypeId={setCarTypeId}
              includeSmalls={includeSmalls}
              isetIncludeSmalls={isetIncludeSmalls}
              includeLarges={includeLarges}
              setIncludeLarges={setIncludeLarges}
              setModalVisible={setModalVisible}
            />
          </TouchableWithoutFeedback>
        </Modal>

        <View style={userSubmissionCargoesStyles.cargoesContainer}>
          <FlatList
            data={cargoes}
            renderItem={({ item }) => FlatList_Item(item)}
            onEndReached={() => { if (pageNumber < pageCount) setPageNumber(pageNumber + 1) }}
            // ListHeaderComponent={listHeader}
            onEndReachedThreshold={.8}
          />
        </View>
        <TouchableOpacity
          style={globalStyles.searcButton}
          onPress={() => setModalVisible(true)}>
          <FontAwesome name="search" size={30} color="white" />
        </TouchableOpacity>
        {isShowBackButton ?
          <TouchableOpacity
            style={globalStyles.backButton}
            onPress={() => navigation.goBack()}>
            <Feather name="arrow-right" size={30} color="white" />
          </TouchableOpacity> : <></>
        }
      </View>
      <Loading loading={loading} />
    </View>
  )
}