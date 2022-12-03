import { Linking, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import { userDocsStyles } from './UserDocsStyle'
import { globalStyles } from '../../../assets/Styles/GlobalStyle'
import UserContext from '../../../Context/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

// =================================================================

export default function UserDocs({
    isShowUserDocs,
    setIsShowUserDocs,
    navigation,
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
            visible={isShowUserDocs && context.CurrentUser.isActive.toString() == "false"}
        >
            <View style={userDocsStyles.mainContainer} >
                <View style={userDocsStyles.boxContainer} >

                    <View style={globalStyles.row}>
                        <Text style={[globalStyles.field_Title, userDocsStyles.mainText]}>جهت استفاده از تمامی امکانات برنامه، لازم است مدارک هویتی خود را ارسال نمایید.</Text>
                    </View>


                    <View style={[globalStyles.row, userDocsStyles.buttonsRow]}>
                        <TouchableOpacity
                            style={[globalStyles.secondaryButton, userDocsStyles.closeButton]}
                            onPress={() => setIsShowUserDocs(false)}>
                            <Text style={[globalStyles.secondaryButton_Text]}>بعدا میفرستم</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[globalStyles.successButton, userDocsStyles.linkButton]}
                            // onPress={() => { setIsShowUserDocs(false);Linking.openURL('https://docs.sadeghbar.com/Docs/index/' + context.CurrentUser.id.toString() + "/" + token); }}
                            onPress={() => { setIsShowUserDocs(false);  navigation.navigate('DocsScreen');}}
                        >
                            <Text style={globalStyles.successButton_Text}>ارسال مدارک</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        </Modal>
    )
}
