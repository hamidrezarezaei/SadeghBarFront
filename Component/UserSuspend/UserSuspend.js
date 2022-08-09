import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { globalStyles } from '../../assets/Styles/GlobalStyle'
import { userSuspendStyles } from './UserSuspendStyle'
import { useToast } from "react-native-toast-notifications";
import Loading from '../../Component/Loading/Loading';
import { Suspend_User_Api, UnSuspend_User_Api } from '../../Api/userApi';
// =================================================================
export default function UserSuspend({navigation, userId, isSuspend, dayCountToUnSuspend, suspendReason }) {
    const [loading, setLoading] = useState(false);
    const [dayCount, setDayCount] = useState(0);
    const [reason, setReason] = useState("");
    const [comment, setComment] = useState("");

    const toast = useToast();
    // =================================================================
    // useEffect(() => {
    // }, []);
    // =================================================================
    const onSuspendSubmit = async () => {
        try {
            setLoading(true);
            const suspendUserInfo = {
                userId,
                dayCount,
                reason
            }

            let data = await Suspend_User_Api(suspendUserInfo);
            if (data.messageStatus == "Successful") {
                setLoading(false);
                toast.show(data.message, { type: "success" });
                navigation.navigate('UserListScreen');
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
    const onUnSuspendSubmit = async () => {
        try {
            setLoading(true);
            const unSuspendUserInfo = {
                userId,
                comment
            }

            let data = await UnSuspend_User_Api(unSuspendUserInfo);
            if (data.messageStatus == "Successful") {
                setLoading(false);
                toast.show(data.message, { type: "success" });
                navigation.navigate('UserListScreen');
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
    return (
        <View style={[globalStyles.boxContainer, userSuspendStyles.boxContainer]}>
            <View style={userSuspendStyles.headerContainer}>
                <Text style={userSuspendStyles.headerText}>
                    {isSuspend ? "رفع تعلیق کاربر" : "تعلیق کاربر"}
                </Text>
            </View>
            {isSuspend ?
                <View style={userSuspendStyles.bodyContainer}>
                    <View style={globalStyles.row}>
                        <Text style={[globalStyles.text_Input, globalStyles.form_FieldValue, globalStyles.danger_Background, { fontSize: 13, textAlign: 'center' }]}>کاربر به علت {suspendReason} به مدت {dayCountToUnSuspend} روز دیگر در حالت تعلیق است.</Text>
                    </View>

                    <View style={globalStyles.row}>
                        <Text style={[globalStyles.field_Title, globalStyles.form_FieldTitle, userSuspendStyles.form_FieldTitle]}>توضیح جهت رفع تعلیق:</Text>
                    </View>
                    <View style={globalStyles.row}>
                        <TextInput style={[globalStyles.text_Input, globalStyles.form_FieldValue]}
                            multiline={true}
                            numberOfLines={2}
                            onChangeText={setComment}
                            value={comment}
                        />
                    </View>
                    <View style={globalStyles.row}>
                        <TouchableOpacity
                            style={[globalStyles.successButton, userSuspendStyles.submitButton]}
                            onPress={onUnSuspendSubmit}
                        >
                            <Text style={globalStyles.successButton_Text}>رفع تعلیق کاربر</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                :
                (<View style={userSuspendStyles.bodyContainer}>
                    <View style={globalStyles.row}>
                        <Text style={[globalStyles.field_Title, globalStyles.form_FieldTitle, userSuspendStyles.form_FieldTitle]}>مدت تعلیق (به روز):</Text>
                    </View>
                    <View style={globalStyles.row}>
                        <TextInput style={[globalStyles.text_Input, globalStyles.form_FieldValue, { textAlign: 'left' }]}
                            onChangeText={setDayCount}
                            keyboardType="numeric"
                            value={dayCount.toString()}
                        />
                    </View>

                    <View style={globalStyles.separator}>
                    </View>

                    <View style={globalStyles.row}>
                        <Text style={[globalStyles.field_Title, globalStyles.form_FieldTitle, userSuspendStyles.form_FieldTitle]}>علت تعلیق:</Text>
                    </View>
                    <View style={globalStyles.row}>
                        <TextInput style={[globalStyles.text_Input, globalStyles.form_FieldValue]}
                            multiline={true}
                            numberOfLines={2}
                            onChangeText={setReason}
                            value={reason}
                        />
                    </View>
                    <View style={globalStyles.row}>
                        <TouchableOpacity
                            style={[globalStyles.dangerButton, userSuspendStyles.submitButton]}
                            onPress={onSuspendSubmit}
                        >
                            <Text style={globalStyles.dangerButton_Text}> تعلیق کاربر</Text>
                        </TouchableOpacity>
                    </View>
                </View>)
            }
            <Loading loading={loading} />
        </View>
    )
}
