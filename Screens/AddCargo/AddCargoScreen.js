import React, { useContext, useState, useEffect } from 'react'
import { Keyboard, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View, ScrollView, Button, Modal, TouchableOpacity, LogBox } from 'react-native'
import { Divider, Switch } from 'react-native-paper';
import { globalStyles } from '../../assets/Styles/GlobalStyle';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import CarTypeCombo from '../../Component/CarTypeCombo/CarTypeCombo';
import CityCombo from '../../Component/CityCombo/CityCombo';
import StateCombo from '../../Component/StateCombo/StateCombo';
import { addCargoStyles } from './AddCargoStyle';
import { useToast } from "react-native-toast-notifications";
import { Add_Cargo_Api } from '../../Api/cargoApi';
import Loading from '../../Component/Loading/Loading';
import UserContext from '../../Context/UserContext';
import { FormatNumber } from '../../Component/Util/Convertors';
import RadioButtonRN from 'radio-buttons-react-native';

// =================================================================
export default function AddCargoScreen(props) {
  const [loading, setLoading] = useState(false);
  const context = useContext(UserContext);

  const [sourceStateId, setSourceStateId] = useState(0);
  const [sourceCityId, setSourceCityId] = useState(0);

  const [destinationStateId, setDestinationStateId] = useState(0);
  const [destinationCityId, setDestinationCityId] = useState(0);

  const [carTypeId, setCarTypeId] = useState(0);
  const [isSmall, setIsSmall] = useState(false);

  const [freightRate, setFreightRate] = useState(0);
  const [cargoWeight, setCargoWeight] = useState("");
  const [cargoType, setCargoType] = useState("");
  const [tel, setTel] = useState(context.CurrentUser.mobile);
  const [comment, setComment] = useState("");
  const toast = useToast();

  const cargoTypes = [
    {
      label: 'بار کامل',
      value: false,
    },
    {
      label: 'بغل باری',
      value: true,
    }
  ];
  // =================================================================
  const onSubmit = async () => {
    try {
      setLoading(true);
      const cargo = {
        sourceStateId: sourceStateId,
        sourceCityId: sourceCityId,
        destinationStateId: destinationStateId,
        destinationCityId: destinationCityId,
        freightRate: (freightRate == null || freightRate == '') ? 0 : freightRate,
        carTypeId: carTypeId,
        isSmall: isSmall,
        weight: cargoWeight,
        type: cargoType,
        tel: tel,
        comment: comment
      }
      console.log('cargo', cargo);
      let data = await Add_Cargo_Api(cargo);
      if (data.messageStatus == "Successful") {
        setLoading(false);
        toast.show(data.message, { type: "success" });
        props.navigation.navigate('CargoListScreen');
      }
      else {
        setLoading(false);
        toast.show(data.message, { type: "danger" });
      }
    }
    catch (error) {
      setLoading(false);
      toast.show(error.toString(), { type: "danger" });
    }
  }
  // =================================================================
  return (
    <ScrollView style={{ flex: 1 }} nestedScrollEnabled={true} >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={[globalStyles.screenContainer, globalStyles.form_ScreenContainer]}>
          <View style={globalStyles.form_Container}>

            <View style={globalStyles.row}>
              <MaterialIcons name="my-location" style={[globalStyles.field_Icon, globalStyles.form_FieldIcon]} size={30} />
              <Text style={[globalStyles.field_Title, globalStyles.form_FieldTitle]}>مبدا بار:</Text>
            </View>
            <View style={globalStyles.row}>
              <StateCombo percentWidth={43} zIndex={9999} placeholder={'استان ...'} onValueChange={(value) => { setSourceStateId(value); setSourceCityId(null) }} />
              <View style={globalStyles.col_1}></View>
              <CityCombo percentWidth={43} zIndex={9999} placeholder={'شهر ...'} stateId={sourceStateId} onValueChange={setSourceCityId} />
            </View>

            <View style={globalStyles.separator}>
            </View>

            <View style={globalStyles.row}>
              <MaterialIcons name="location-on" style={[globalStyles.field_Icon, globalStyles.form_FieldIcon]} size={30} />
              <Text style={[globalStyles.field_Title, globalStyles.form_FieldTitle]}>مقصد بار:</Text>
            </View>
            <View style={globalStyles.row}>
              <StateCombo percentWidth={43} placeholder={'استان ...'} zIndex={9998} onValueChange={(value) => { setDestinationStateId(value); setDestinationCityId(null) }} />
              <View style={globalStyles.col_1}></View>
              <CityCombo percentWidth={43} zIndex={9998} placeholder={'شهر ...'} stateId={destinationStateId} onValueChange={setDestinationCityId} />
            </View>

            <View style={globalStyles.separator}>
            </View>


            <View style={globalStyles.row}>
              <AntDesign name="CodeSandbox" style={[globalStyles.field_Icon, globalStyles.form_FieldIcon]} size={30} />
              <Text style={[globalStyles.field_Title, globalStyles.form_FieldTitle]}>نوع بار:</Text>
            </View>

            <View style={globalStyles.row}>
              <TextInput style={[globalStyles.text_Input, globalStyles.form_FieldValue]}
                onChangeText={setCargoType}
                placeholder={'مثال: مبلمان ...'}
                value={cargoType}
              />
            </View>

            <View style={globalStyles.separator}>
            </View>

            <View style={globalStyles.row}>
              <FontAwesome5 name="balance-scale-right" style={[globalStyles.field_Icon, globalStyles.form_FieldIcon]} size={23} />
              <Text style={[globalStyles.field_Title, globalStyles.form_FieldTitle]}>وزن  بار:</Text>
            </View>
            <View style={globalStyles.row}>
              <TextInput style={[globalStyles.text_Input, globalStyles.form_FieldValue]}
                onChangeText={setCargoWeight}
                placeholder={'مثال: 2 تن ...'}
                value={cargoWeight}
              />
            </View>

            <View style={globalStyles.separator}>
            </View>

            <View style={globalStyles.row}>
              <MaterialCommunityIcons name="truck" style={[globalStyles.field_Icon, globalStyles.form_FieldIcon]} size={30} />
              <Text style={[globalStyles.field_Title, globalStyles.form_FieldTitle]}>نوع ماشین:</Text>
            </View>
            <View style={globalStyles.row}>
              <CarTypeCombo percentWidth={87} zIndex={9997} placeholder={'انتخاب...'} onValueChange={setCarTypeId} />
            </View>

            <View style={globalStyles.row}>
              <FontAwesome5 name="question-circle" style={[globalStyles.field_Icon, globalStyles.form_FieldIcon]} size={30} />
              <Text style={[globalStyles.field_Title, globalStyles.form_FieldTitle]}>نوع بار:</Text>
            </View>
            <View style={globalStyles.row}>
              {/* <Switch style={[globalStyles.swith_Input, addCargoStyles.isSmall_Swith]} color={'#007bff'} trackColor={{ true: '#8ac0fa' }} value={isSmall} onValueChange={onIsSmallChange} />
              <Text style={[globalStyles.field_Title, globalStyles.form_FieldTitle]}>بغل باری (یعنی حجم بار خیلی کم است.)</Text> */}

              <RadioButtonRN
                data={cargoTypes}
                selectedBtn={(e) => { setIsSmall(e.value); }}
                icon={
                  <Icon
                    name="check-circle"
                    size={25}
                    color="#2c9dd1"
                  />

                }
                initial={1}
                style={globalStyles.form_checkBoxGroup}
                boxStyle={globalStyles.form_checkBox}
                textStyle={globalStyles.form_checkBoxTitle}
              />

            </View>

            <View style={globalStyles.separator}>
            </View>
            <View style={globalStyles.row}>
              <Fontisto name="shopping-pos-machine" style={[globalStyles.field_Icon, globalStyles.form_FieldIcon]} size={30} />
              <Text style={[globalStyles.field_Title, globalStyles.form_FieldTitle]}>مبلغ کرایه: {freightRate > 0 ? FormatNumber(Number(freightRate)) : "بر حسب"} تومان</Text>
            </View>
            <View style={globalStyles.row}>
              <TextInput style={[globalStyles.text_Input, globalStyles.form_FieldValue, { textAlign: 'left' }]}
                keyboardType="numeric"
                onChangeText={setFreightRate}
                value={freightRate > 0 ? freightRate.toString() : ""}
              />
            </View>
            <View style={globalStyles.separator}>
            </View>

            <View style={globalStyles.row}>
              <MaterialIcons name="phone-forwarded" style={[globalStyles.field_Icon, globalStyles.form_FieldIcon]} size={30} />
              <Text style={[globalStyles.field_Title, globalStyles.form_FieldTitle]}>تلفن تماس:</Text>
            </View>

            <View style={globalStyles.row}>
              <TextInput style={[globalStyles.text_Input, globalStyles.form_FieldValue, { textAlign: 'left' }]}
                keyboardType="numeric"
                onChangeText={setTel}
                value={tel}
              />
            </View>

            <View style={globalStyles.separator}>
            </View>

            <View style={globalStyles.row}>
              <FontAwesome name="comments" style={[globalStyles.field_Icon, globalStyles.form_FieldIcon]} size={30} />
              <Text style={[globalStyles.field_Title, globalStyles.form_FieldTitle]}>توضیحات:</Text>
            </View>

            <View style={globalStyles.row}>
              <TextInput style={[globalStyles.text_Input, globalStyles.form_FieldValue]}
                onChangeText={setComment}
                scrollEnabled={true}
                multiline={true}
                numberOfLines={4}
                placeholder={'توضیحات بیشتر در مورد بار ...'}
                value={comment}
              />
            </View>
            <View style={globalStyles.row}>
              <TouchableOpacity
                style={[globalStyles.submitButton, addCargoStyles.submitButton]}
                onPress={onSubmit}
              >
                <Text style={globalStyles.submitButton_Text}> اضافه کردن بار</Text>
              </TouchableOpacity>
            </View>

            <Loading loading={loading} />
          </View>
        </View>
      </TouchableWithoutFeedback>
      <Loading />
    </ScrollView>
  )
}