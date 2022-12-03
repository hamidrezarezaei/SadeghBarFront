import React, { useContext } from 'react'
import { Text, View, TouchableOpacity, Image, Alert, Linking } from 'react-native'
import { cargoInfoStyles } from './CargoInfoStyle';
import { FontAwesome } from '@expo/vector-icons';
import { globalStyles } from '../../../assets/Styles/GlobalStyle';
import { FormatNumber } from '../../../Util/Convertors';
import { IsAdminCurrentUser } from '../../../Util/UserUtils';
import UserContext from '../../../Context/UserContext';
import { Approve_Cargo_Api, DeleteByAdmin_Cargo_Api } from '../../../Api/cargoApi';
import { useToast } from "react-native-toast-notifications";
import Plate from '../../Plate/Plate';
import { persianStatus, StatusColor } from '../../../Util/CargoUtils';
import Queue from '../Queue/Queue';
// =================================================================

export default function CargoInfo(
  {
    cargo,
    navigation,
    isShowCompleteInfo = true,
    setLoading,
    isShowComment = false,
    isShowCode = false,
    isShowCargoStatus = false,
    isShowTakeByDriverImage = true,
    isShowMoreInfoButton = true,
    isShowAdminButtons = false,
    isShowApproveButtons = false,
    onEditPress = null,
    isShowSubmitterInfo = false,
    isShowDriverInfo = false,
    isShowQueue = false,
    isColorfull = false,
    reLoadData = null,
  }) {
  const context = useContext(UserContext);
  const toast = useToast();

  // =================================================================
  const approveConfirm = async () => {
    Alert.alert('', 'آیا از تایید بار اطمینان دارید؟', [
      {
        text: 'خیر',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'بله', onPress: () => approve() },
    ]);
  }
  const approve = async () => {
    try {
      setLoading(true);
      let data = await Approve_Cargo_Api(cargo.id);
      if (data.messageStatus == "Successful") {
        setLoading(false);
        toast.show(data.message, { type: "success" });
        if(reLoadData!=null) reLoadData();
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
 const deleteByAdminConfirm = async () => {
  Alert.alert('', 'آیا از لغو بار اطمینان دارید؟', [
    {
      text: 'خیر',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
    { text: 'بله', onPress: () => deleteByAdmin() },
  ]);
}
const deleteByAdmin = async () => {
  try {
    setLoading(true);
    let data = await DeleteByAdmin_Cargo_Api(cargo.id);
    if (data.messageStatus == "Successful") {
      setLoading(false);
      // refreshScreen();
      toast.show(data.message, { type: "success" });
      if(reLoadData!=null) reLoadData();
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
    <>
      <View
        style=
        {!isColorfull
          ? [globalStyles.boxContainer]
          : [globalStyles.boxContainer, { backgroundColor: StatusColor(cargo.status) }]
        }>
        <View style={[cargoInfoStyles.row1, { marginTop: 0 }]}>
          <View style={cargoInfoStyles.row1Col1}>
            <Text style={cargoInfoStyles.sourceStateTitle}>{cargo?.sourceStateTitle}</Text>
            <Text style={cargoInfoStyles.sourceCityTitle}>{cargo?.sourceCityTitle}</Text>
          </View>
          <View>
            <View style={cargoInfoStyles.row1ColCenter}>
              <FontAwesome name="long-arrow-left" style={cargoInfoStyles.arrow} size={25} color="#f47d07" />
              {
                cargo?.isSmall ? <Text style={cargoInfoStyles.isSmall}>بغل باری</Text> : <Text></Text>
              }
            </View>
          </View>
          <View style={cargoInfoStyles.row1Col2}>
            <Text style={cargoInfoStyles.destinationStateTitle}>{cargo?.destinationStateTitle}</Text>
            <Text style={cargoInfoStyles.destinationCityTitle}>{cargo?.destinationCityTitle}</Text>
          </View>
        </View>

        <View style={cargoInfoStyles.row2}>
          <View style={cargoInfoStyles.row2Col1}>
            <View style={cargoInfoStyles.carTypeContainer}>
              <Text style={cargoInfoStyles.title}>نوع ماشین: </Text>
              <Text style={cargoInfoStyles.carTypeTitle}>{cargo?.carTypeTitle ? cargo.carTypeTitle : "هر نوعی"}</Text>

            </View>
          </View>
          <View style={cargoInfoStyles.row2Col2}>
            <View style={cargoInfoStyles.freightRateContainer}>
              <Text style={cargoInfoStyles.title}>مبلغ کرایه: </Text>
              <Text style={cargoInfoStyles.freightRate}>{FormatNumber(cargo?.freightRate)} تومان</Text>
            </View>
          </View>

          {isShowCompleteInfo ? (
            <>
              <View style={cargoInfoStyles.row2Col3}>
                <View style={cargoInfoStyles.typeContainer}>
                  <Text style={cargoInfoStyles.title}>نوع بار: </Text>
                  <Text style={cargoInfoStyles.freightRate}>{cargo?.type}</Text>
                </View>
              </View>
              <View style={cargoInfoStyles.row2Col4}>
                <View style={cargoInfoStyles.weightContainer}>
                  <Text style={cargoInfoStyles.title}>وزن بار: </Text>
                  <Text style={cargoInfoStyles.freightRate}>{cargo?.weight ? cargo?.weight : "-"}</Text>
                </View>
              </View>
            </>
          ) : (<></>)
          }
        </View>


        {isShowComment && cargo?.comment ? (
          <View style={globalStyles.row}>
            <View style={cargoInfoStyles.commentContainer}>
              <Text style={cargoInfoStyles.comment}>توضیحات: {cargo?.comment}</Text>
            </View>
          </View>
        ) :
          (<></>)
        }

        {isShowTakeByDriverImage && cargo.status != 'Active' ?
          <View style={cargoInfoStyles.row4}>
            <Image
              style={cargoInfoStyles.takeByDriver_Img}
              source={require('../../../assets/imgs/takeByDriver.png')}
            />
          </View> : <></>
        }
        {isShowMoreInfoButton && cargo.status == 'Active' ? (
          <View style={cargoInfoStyles.row4}>
            <TouchableOpacity
              style={[globalStyles.submitButton, cargoInfoStyles.detailsButton]}
              onPress={() => navigation.navigate('CargoSingleScreen', { id: cargo?.id })}
            >
              <Text style={globalStyles.submitButton_Text}>اطلاعات بیشتر...</Text>
            </TouchableOpacity>
          </View>) : <></>
        }

        {
          isShowCode ?
            <>
              <View style={globalStyles.separator}>
              </View>
              <View style={globalStyles.row}>
                <Text style={globalStyles.field_Title}>کد بار:</Text>
                <Text style={[globalStyles.field_Value]}>{cargo?.code}</Text>
              </View>
            </>
            : <></>
        }
        {isShowCargoStatus ?
          <>
            <View style={globalStyles.row}>
              <Text style={globalStyles.field_Title}>وضعیت بار:</Text>
              <Text style={cargo.status == "TakeByDriver" ? [globalStyles.field_Value] : [globalStyles.field_Value]}>{persianStatus(cargo.status)}</Text>
            </View>
            {
              (cargo.cancelerUser != null && cargo.cancelerUser.code > 0) ?
                <>
                  <View style={globalStyles.row}>
                    <Text style={globalStyles.field_Title}>اعلام کنسلی:</Text>
                    <Text style={[globalStyles.field_Value]}>{cargo?.cancelerUser.fullName} ({cargo?.cancelerUser.code})</Text>
                  </View>
                </> :
                <></>
            }
          </>
          : <></>}

        {isShowSubmitterInfo ?
          <>
            <View style={globalStyles.separator}>
            </View>
            <View style={globalStyles.row}>
              <Text style={globalStyles.field_Title}>اعلام کننده بار:</Text>
              <Text style={[globalStyles.field_Value]}>{cargo?.submitterUser.fullName} ({cargo?.submitterUser.code})</Text>
            </View>
            <View style={globalStyles.row}>
              <Text style={globalStyles.field_Title}>تاریخ ثبت بار:</Text>
              <Text style={[globalStyles.field_Value]}>{cargo?.submitDateShamsi} ساعت {cargo?.submitTime}</Text>
            </View>
            <View style={globalStyles.row}>
              <Text style={globalStyles.field_Title}>شماره تماس:</Text>
              <Text onPress={() => { Linking.openURL('tel:' + cargo.tel); }} style={[globalStyles.field_Value]}>
                {cargo?.tel}
              </Text>
            </View>
          </>
          : <></>
        }


        {isShowDriverInfo && cargo.driverUser != null && cargo.driverUser.code > 0 ?
          <>
            <View style={globalStyles.separator}>
            </View>
            <View style={globalStyles.row}>
              <Text style={globalStyles.field_Title}>راننده بار:</Text>
              <Text style={[globalStyles.field_Value]}>{cargo?.driverUser?.fullName} ({cargo?.driverUser?.code})</Text>
            </View>
            <View style={globalStyles.row}>
              <Text style={globalStyles.field_Title}>تاریخ حمل بار:</Text>
              <Text style={[globalStyles.field_Value]}>{cargo?.takeDateShamsi}  ساعت {cargo?.takeTime}</Text>
            </View>
            <View style={globalStyles.row}>
              <Text style={globalStyles.field_Title}>شماره تماس راننده:</Text>
              <Text onPress={() => { Linking.openURL('tel:' + cargo?.driverUser?.mobile); }} style={[globalStyles.field_Value]}>{cargo.driverUser.mobile} </Text>
            </View>
            <View style={globalStyles.row}>
              <Plate plate1={cargo.driverUser.plate1} plate2={cargo.driverUser.plate2} plate3={cargo.driverUser.plate3} plate4={cargo.driverUser.plate4} />
            </View>

          </>
          : <></>
        }
        {
          isShowAdminButtons && (cargo.status == 'Active' || cargo.status == 'NewCargo') ?
            <>
              <View style={globalStyles.separator}>
              </View>
              <View style={[globalStyles.row, { justifyContent: 'space-around', paddingHorizontal: 5 }]}>
                <TouchableOpacity
                  style={[globalStyles.dangerButton, cargoInfoStyles.cargoDeleteButton]}
                  onPress={deleteByAdminConfirm}>
                  <Text style={[globalStyles.dangerButton_Text]}>لغو بار</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[globalStyles.submitButton, cargoInfoStyles.cargoEditButton]}
                  onPress={onEditPress
                    // () =>
                    // navigation.reset({
                    //   index: 0,
                    //   routes: [{ name: 'SubmitByMeStack', params: { screen: 'EditCargoScreen', params: { cargoId: cargo?.id } } }]
                    // })
                  }
                >
                  <Text style={globalStyles.submitButton_Text}>ویرایش</Text>
                </TouchableOpacity>
              </View>
            </>
            : <></>
        }
                {
          isShowApproveButtons && (cargo.status == 'NewCargo') ?
            <>
              <View style={globalStyles.separator}>
              </View>
              <View style={[globalStyles.row, { justifyContent: 'space-around', paddingHorizontal: 5 }]}>
               
                <TouchableOpacity
                  style={[globalStyles.successButton, cargoInfoStyles.approveButton]}
                  onPress={approveConfirm}
                >
                  <Text style={globalStyles.successButton_Text}>تایید بار</Text>
                </TouchableOpacity>
              </View>
            </>
            : <></>
        }
        
      </View >

      {isShowQueue && cargo.status == 'Active' ?
        <Queue cargo={cargo} isMyCargo={false} isMeInFrontOfQueue={false} setLoading={setLoading} />
        : <></>
      }
    </>
  )
}
