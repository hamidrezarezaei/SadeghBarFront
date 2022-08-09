import { StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import { searchCargoStyles } from './SearchCargoStyle'
import { Switch } from 'react-native-paper'
import StateCombo from '../StateCombo/StateCombo'
import CarTypeCombo from '../CarTypeCombo/CarTypeCombo'
import { globalStyles } from '../../assets/Styles/GlobalStyle'
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function SearchCargo({
  code,
  setCode,
  sourceStateId,
  setSourceStateId,
  destinationStateId,
  setDestinationStateId,
  carTypeId,
  setCarTypeId,
  isSmall,
  setIsSmall,
  setModalVisible
}) {

  const onIsSmallChange = () => setIsSmall(!isSmall);

  return (
    <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
      <View style={searchCargoStyles.mainContainer} >
        <View style={searchCargoStyles.searchContainer} >
          <View style={globalStyles.row}>
            <AntDesign name="qrcode"  style={[globalStyles.field_Icon, searchCargoStyles.field_Icon]} size={25} />
            <Text style={[globalStyles.field_Title, searchCargoStyles.search_SourceTitle]}>کد بار:</Text>
            <TextInput style={[globalStyles.text_Input, globalStyles.form_FieldValue, searchCargoStyles.codeValue, { textAlign: 'left' }]}
              onChangeText={setCode}
              keyboardType="numeric"
              value={code == 0 ? "" : code.toString()}
            />
          </View>
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
            <CarTypeCombo selectedValue={carTypeId} percentWidth={50} zIndex={9997} placeholder={'همه انواع'} firstItem={'همه انواع'} onValueChange={setCarTypeId} />
          </View>
          <View style={globalStyles.row}>
            <MaterialCommunityIcons name="circle-slice-2" style={[globalStyles.field_Icon, searchCargoStyles.field_Icon]} size={28} />
            <Text style={[globalStyles.field_Title, searchCargoStyles.search_IsSmallTitle]}>نمایش بغل باری ها</Text>
            <Switch style={[globalStyles.swith_Input, searchCargoStyles.isSmall_Swith]} color={'#007bff'} trackColor={{ true: '#8ac0fa' }} value={isSmall} onValueChange={onIsSmallChange} />
          </View>
          <View style={globalStyles.row}>
            <TouchableOpacity
              style={[globalStyles.secondaryButton, searchCargoStyles.returnButton]}
              onPress={() => setModalVisible(false)}>
              <Text style={globalStyles.secondaryButton_Text}>بازگشت</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

