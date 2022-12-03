import { Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View,Modal } from 'react-native'
import React, { useContext } from 'react'
import { searchCargoStyles } from './SearchCargoStyle'
import BouncyCheckbox from "react-native-bouncy-checkbox";
import StateCombo from '../../Combo/StateCombo/StateCombo'
import CarTypeCombo from '../../Combo/CarTypeCombo/CarTypeCombo'
import { globalStyles } from '../../../assets/Styles/GlobalStyle'
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import UserContext from '../../../Context/UserContext';
import { IsAdminCurrentUser } from '../../../Util/UserUtils'

// =================================================================

export default function SearchCargo({
  code,
  setCode,
  sourceStateId,
  setSourceStateId,
  destinationStateId,
  setDestinationStateId,
  carTypeId,
  setCarTypeId,
  includeSmalls,
  setIncludeSmalls,
  includeLarges,
  setIncludeLarges,
  isShowSearchCargo,
  SetIsShowSearchCargo
}) {

  // const onIsSmallChange = () => setIncludeSmalls(!includeSmalls);
  const context = useContext(UserContext);
  // =================================================================
  const clearFillter = () => {
    setCode(0);
    setSourceStateId(0);
    setDestinationStateId(0);
    setCarTypeId(0);
    setIncludeSmalls(true);
    SetIsShowSearchCargo(false);
  }
  // =================================================================
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isShowSearchCargo}
      onRequestClose={() => {
        SetIsShowSearchCargo(false);
      }}>
      <TouchableWithoutFeedback onPress={() => SetIsShowSearchCargo(false)}>
        <View style={searchCargoStyles.mainContainer} >
          <View style={searchCargoStyles.searchContainer} >
            {
              IsAdminCurrentUser(context) ?
                <View style={globalStyles.row}>
                  <AntDesign name="qrcode" style={[globalStyles.field_Icon, searchCargoStyles.field_Icon]} size={25} />
                  <Text style={[globalStyles.field_Title, searchCargoStyles.search_SourceTitle]}>کد بار:</Text>
                  <TextInput style={[globalStyles.text_Input, globalStyles.form_FieldValue, searchCargoStyles.codeValue, { textAlign: 'left' }]}
                    onChangeText={setCode}
                    keyboardType="numeric"
                    value={code == 0 ? "" : code.toString()}
                  />
                </View> : <></>
            }


            <View style={globalStyles.row}>
              <FontAwesome5 name="dot-circle" style={[globalStyles.field_Icon, searchCargoStyles.field_Icon]} size={25} />
              <Text style={[globalStyles.field_Title, searchCargoStyles.search_SourceTitle]}>مبدا:</Text>
              <StateCombo selectedValue={sourceStateId} percentWidth={50} zIndex={9999} placeholder={'همه استانها'} firstItem={'همه استانها'} onValueChange={setSourceStateId} />
            </View>
            <View style={globalStyles.row}>
              <Ionicons name="location-outline" style={[globalStyles.field_Icon, searchCargoStyles.field_Icon]} size={35} />
              <Text style={[globalStyles.field_Title, searchCargoStyles.search_DestinationTitle]}>مقصد:</Text>
              <StateCombo selectedValue={destinationStateId} percentWidth={50} zIndex={9998} placeholder={'همه استانها'} firstItem={'همه استانها'} onValueChange={setDestinationStateId} />
            </View>
            <View style={globalStyles.row}>
              <MaterialCommunityIcons name="truck-check-outline" style={[globalStyles.field_Icon, searchCargoStyles.field_Icon]} size={28} />
              <Text style={[globalStyles.field_Title, searchCargoStyles.search_CarTypeTitle]}>ماشین:</Text>
              <CarTypeCombo selectedValue={carTypeId} percentWidth={50} zIndex={9997} placeholder={'همه نوع ماشین'} firstItem={'همه نوع ماشین'} onValueChange={setCarTypeId} />
            </View>
            <View style={[globalStyles.row, { marginBottom: 10, marginTop: 8 }]}>
              <MaterialCommunityIcons name="circle-slice-2" style={[globalStyles.field_Icon, searchCargoStyles.field_Icon]} size={28} />
              <Text style={[globalStyles.field_Title, searchCargoStyles.search_CarTypeTitle]}>نمایش:</Text>
              <View style={searchCargoStyles.search_CheckBoxContainer}>
                <Text style={[globalStyles.field_Title, searchCargoStyles.search_CheckBoxTitle]}>بغل باری</Text>
                <BouncyCheckbox
                  size={25}
                  fillColor="#0078d7"
                  unfillColor="#FFFFFF"
                  iconStyle={{ borderColor: "#0078d7" }}
                  innerIconStyle={{ borderWidth: 2 }}
                  // textStyle={globalStyles.field_Title}
                  isChecked={includeSmalls}
                  onPress={() => setIncludeSmalls(!includeSmalls)}
                />
                <Text style={[globalStyles.field_Title, searchCargoStyles.search_CheckBoxTitle]}>بار کامل:</Text>
                <BouncyCheckbox
                  size={25}
                  fillColor="#0078d7"
                  unfillColor="#FFFFFF"
                  iconStyle={{ borderColor: "#0078d7" }}
                  innerIconStyle={{ borderWidth: 2 }}
                  textStyle={globalStyles.field_Title}
                  isChecked={includeLarges}
                  onPress={() => setIncludeLarges(!includeLarges)}
                />
              </View>
            </View>
            <View style={[globalStyles.row, searchCargoStyles.buttonsRow]}>
              <TouchableOpacity
                style={[globalStyles.dangerButton, searchCargoStyles.clearFilterButton]}
                onPress={clearFillter}>
                <Text style={[globalStyles.dangerButton_Text]}>بازگشت</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[globalStyles.successButton, searchCargoStyles.searchButton]}
                onPress={() => SetIsShowSearchCargo(false)}>
                <Text style={globalStyles.successButton_Text}>جستجو</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>


  )
}

