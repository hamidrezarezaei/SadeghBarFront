import { Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { userBehaviorStyles } from './UserBehaviorStyle';
import { globalStyles } from '../../../assets/Styles/GlobalStyle';

export default function UserBehavior({ userId, userFullName, navigation }) {
    return (
        <View style={[globalStyles.boxContainer, userBehaviorStyles.boxContainer]}>
            <View style={[userBehaviorStyles.headerContainer, { backgroundColor: '#256e36' }]}>
                <Text style={userBehaviorStyles.headerText}>
                    رفتار کاربر
                </Text>
            </View>
            <View style={[globalStyles.row, userBehaviorStyles.userButtonRow]}>
                <TouchableOpacity
                    style={[globalStyles.successButton, userBehaviorStyles.submitByUserButton]}
                    onPress={() => { navigation.navigate('SubmitByUserStack', { screen: 'SubmitByUserScreen', params: { userId: userId, userFullName: userFullName } }); }}
                >
                    <Text style={globalStyles.successButton_Text}>بارهای اعلامی کاربر</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[globalStyles.successButton, userBehaviorStyles.carryByUserButton]}
                    onPress={() => { navigation.navigate('CarryByUserScreen', { userId: userId, userFullName: userFullName }); }}
                >
                    <Text style={globalStyles.successButton_Text}>محموله های کاربر</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
