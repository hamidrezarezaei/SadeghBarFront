import { StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import { searchUserStyles } from './SearchUserStyle'
import StateCombo from '../../Combo/StateCombo/StateCombo'
import CarTypeCombo from '../../Combo/CarTypeCombo/CarTypeCombo'
import { globalStyles } from '../../../assets/Styles/GlobalStyle'
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import RadioButtonRN from 'radio-buttons-react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

// =================================================================
export default function SearchUser({
    code,
    setCode,
    name,
    setName,
    family,
    setFamily,
    isSuspend,
    setIsSuspend,
    isActive,
    setIsActive,
    driverOnly,
    setDriverOnly,
    freightageOnly,
    setFreightageOnly,
    productOwnerOnly,
    setProductOwnerOnly,
    carTypeId,
    setCarTypeId,
    setModalVisible
}) {
    const userActiveStatus = [
        {
            label: 'همه',
            value: null,
        },
        {
            label: 'فعال',
            value: true,
        },
        {
            label: 'غیر فعال',
            value: false,
        }
    ];
    const userTypes = [
        {
            label: 'همه',
            value: 'all',
        },
        {
            label: 'راننده',
            value: 'driverOnly',
        },
        {
            label: 'باربری',
            value: 'freightageOnly',
        },
        {
            label: 'صاحب کالا',
            value: 'productOwnerOnly',
        }
    ];
    const userSuspendStatus = [
        {
            label: 'همه',
            value: null,
        },
        {
            label: 'معلق',
            value: true,
        },
        {
            label: 'غیر معلق',
            value: false,
        }
    ];
    const onIsSmallChange = () => setIsSmall(!isSmall);
    // =================================================================
  const clearFillter = () => {
    setCode(0);
    setName("");
    setFamily("");
    setIsSuspend(null);
    setIsActive(null);
    setDriverOnly(false);
    setFreightageOnly(false);
    setProductOwnerOnly(false);
    setCarTypeId(0);
    setModalVisible(false);
  }
  
    // =================================================================
    return (
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <View style={searchUserStyles.mainContainer} >
                <View style={searchUserStyles.searchContainer} >
                    <View style={globalStyles.row}>
                        <Text style={[globalStyles.field_Title, searchUserStyles.search_SourceTitle, searchUserStyles.field_Title]}>کد کاربر:</Text>
                        <TextInput style={[globalStyles.text_Input, globalStyles.form_FieldValue, searchUserStyles.form_FieldValue, { textAlign: 'left' }]}
                            onChangeText={setCode}
                            keyboardType="numeric"
                            value={code == 0 ? "" : code.toString()}
                        />
                    </View>
                    <View style={[globalStyles.separator, searchUserStyles.separator]}>
                    </View>

                    <View style={globalStyles.row}>
                        <Text style={[globalStyles.field_Title, searchUserStyles.search_SourceTitle, searchUserStyles.field_Title]}>نام کاربر:</Text>
                        <TextInput style={[globalStyles.text_Input, globalStyles.form_FieldValue, searchUserStyles.form_FieldValue]}
                            onChangeText={setName}
                            value={name}
                        />
                    </View>
                    <View style={[globalStyles.separator, searchUserStyles.separator]}>
                    </View>

                    <View style={globalStyles.row}>
                        <Text style={[globalStyles.field_Title, searchUserStyles.search_SourceTitle, searchUserStyles.field_Title]}>نام خانوادگی:</Text>
                        <TextInput style={[globalStyles.text_Input, globalStyles.form_FieldValue, searchUserStyles.form_FieldValue]}
                            onChangeText={setFamily}
                            value={family}
                        />
                    </View>
                    <View style={[globalStyles.separator, searchUserStyles.separator]}>
                    </View>

                    <View style={globalStyles.row}>
                        <Text style={[globalStyles.field_Title, searchUserStyles.search_SourceTitle, searchUserStyles.field_Title]}>نوع کاربری:</Text>
                        <RadioButtonRN
                            data={userTypes}
                            selectedBtn={(e) => {
                                if (e.value == 'all') {
                                    setDriverOnly(false);
                                    setFreightageOnly(false);
                                    setProductOwnerOnly(false);
                                }
                                else if (e.value == 'driverOnly') {
                                    setDriverOnly(true);
                                    setFreightageOnly(false);
                                    setProductOwnerOnly(false);
                                }
                                else if(e.value == 'freightageOnly'){
                                    setDriverOnly(false);
                                    setFreightageOnly(true);
                                    setProductOwnerOnly(false);
                                }
                                else if(e.value == 'productOwnerOnly'){
                                    setDriverOnly(false);
                                    setFreightageOnly(false);
                                    setProductOwnerOnly(true);
                                }
                            }}
                            icon={
                                <Icon
                                    name="check-circle"
                                    size={25}
                                    color="#2c9dd1"
                                />
                            }
                            initial={driverOnly ? 2 : freightageOnly ? 3 : productOwnerOnly?4: 1}
                            style={searchUserStyles.form_checkBoxGroup}
                            boxStyle={searchUserStyles.form_checkBox_userType}
                            textStyle={searchUserStyles.form_checkBoxTitle_userType}
                        />
                    </View>
                    <View style={[globalStyles.separator, searchUserStyles.separator]}>
                    </View>

                    <View style={globalStyles.row}>
                        <Text style={[globalStyles.field_Title, searchUserStyles.search_SourceTitle, searchUserStyles.field_Title]}>نوع ماشین:</Text>
                        <CarTypeCombo selectedValue={carTypeId} percentWidth={65} zIndex={9997} placeholder={'همه انواع'} firstItem={'همه انواع'} onValueChange={setCarTypeId} />
                    </View>
                    <View style={[globalStyles.separator, searchUserStyles.separator]}>
                    </View>

                    <View style={globalStyles.row}>
                        <Text style={[globalStyles.field_Title, searchUserStyles.search_SourceTitle, searchUserStyles.field_Title]}>وضعیت مدارک:</Text>
                        <RadioButtonRN
                            data={userActiveStatus}
                            selectedBtn={(e) => { setIsActive(e.value); }}
                            icon={
                                <Icon
                                    name="check-circle"
                                    size={25}
                                    color="#2c9dd1"
                                />
                            }
                            initial={isActive == null ? 1 : isActive ? 2 : 3}
                            style={searchUserStyles.form_checkBoxGroup}
                            boxStyle={ searchUserStyles.form_checkBox}
                            textStyle={searchUserStyles.form_checkBoxTitle}
                        />
                    </View>
                    <View style={[globalStyles.separator, searchUserStyles.separator]}>
                    </View>

                    <View style={globalStyles.row}>
                        <Text style={[globalStyles.field_Title, searchUserStyles.search_SourceTitle, searchUserStyles.field_Title]}>وضعیت تعلیق:</Text>
                        <RadioButtonRN
                            data={userSuspendStatus}
                            selectedBtn={(e) => { setIsSuspend(e.value); }}
                            icon={
                                <Icon
                                    name="check-circle"
                                    size={25}
                                    color="#2c9dd1"
                                />
                            }
                            initial={isSuspend == null ? 1 : isSuspend ? 2 : 3}
                            style={searchUserStyles.form_checkBoxGroup}
                            boxStyle={searchUserStyles.form_checkBox}
                            textStyle={ searchUserStyles.form_checkBoxTitle}
                        />
                    </View>
                    <View style={[globalStyles.separator, searchUserStyles.separator]}>
                    </View>
                    <View style={[globalStyles.row, searchUserStyles.buttonsRow]}>
                    <TouchableOpacity
              style={[globalStyles.dangerButton, searchUserStyles.clearFilterButton]}
              onPress={clearFillter}>
              <Text style={[globalStyles.dangerButton_Text]}>بازگشت</Text>
            </TouchableOpacity>

                        <TouchableOpacity
                            style={[globalStyles.successButton, searchUserStyles.searchButton]}
                            onPress={() => setModalVisible(false)}>
                            <Text style={globalStyles.successButton_Text}>جستجو</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

