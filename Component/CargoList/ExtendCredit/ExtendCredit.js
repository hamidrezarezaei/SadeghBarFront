import { Linking, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import { extendCreditStyles } from './ExtendCreditStyle'
import { globalStyles } from '../../../assets/Styles/GlobalStyle'
import UserContext from '../../../Context/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

// =================================================================

export default function ExtendCredit({
    isShowExtendCredit,
    setIsShowExtendCredit,
}) {
    // =================================================================

    const context = useContext(UserContext);
    const [token, setToken] = useState(null);
    // =================================================================
    useEffect(() => {
        loadToken();
    }, []);
    // =================================================================
    const loadToken = async () => {
        setToken(await AsyncStorage.getItem('token'));
    }
    // =================================================================

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isShowExtendCredit && context.CurrentUser.dayCountToExpire < 10}
        >
            <View style={extendCreditStyles.mainContainer} >
                <View style={extendCreditStyles.boxContainer} >

                    <View style={globalStyles.row}>
                        <Text style={[globalStyles.feld_Title, extendCreditStyles.mainText, globalStyles.field_Value_Danger]}>از اعتبار حساب کاربری شما تنها {context.CurrentUser.dayCountToExpire} روز دیگر باقی مانده است. </Text>
                    </View>


                    <View style={[globalStyles.row, extendCreditStyles.buttonsRow]}>
                        <TouchableOpacity
                            style={[globalStyles.secondaryButton, extendCreditStyles.closeButton]}
                            onPress={() => setIsShowExtendCredit(false)}>
                            <Text style={[globalStyles.secondaryButton_Text]}>بستن پنجره</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[globalStyles.successButton, extendCreditStyles.linkButton]}
                            onPress={() => { setisShowExtendCredit(false);Linking.openURL('https://payment.sadeghbar.com/Payment/index' + context.CurrentUser.id.toString() + "/" + token); }}
                        >
                            <Text style={globalStyles.successButton_Text}>تمدید اعتبار</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        </Modal>
    )
}
