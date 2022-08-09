import React, { useContext, useEffect, useState } from 'react'
import { Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { globalStyles } from '../../assets/Styles/GlobalStyle'
import { userProfileStyles } from './UserProfileStyle'
import { useToast } from "react-native-toast-notifications";
import Loading from '../Loading/Loading';
import { GetCurrent_User_Api } from '../../Api/userApi';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Fontisto } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import UserContext from '../../Context/UserContext';

// =================================================================
export const UserProfile = ({
    setProfileVisible,
    navigation
}) => {
    const [loading, setLoading] = useState(false);
    const context = useContext(UserContext);

    const [currentUser, setCurrentUser] = useState(null);
    const toast = useToast();
    // =================================================================
    useEffect(() => {
        loadData();
    }, []);
    // =================================================================
    const loadData = async () => {
        try {
            setLoading(true);
            let data = await GetCurrent_User_Api();
            if (data.messageStatus == "Successful") {
                // console.log('currentUser=', data.messageData.data);
                setCurrentUser(data.messageData.data);
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

    const logOut = async () => {
        await AsyncStorage.removeItem('token');
        context.CurrentUser=null;
        navigation.reset({
            index: 0,
            routes: [{ name: 'LoginScreen' }],
          });
        // navigation.navigate('LoginScreen');
    }
    // =================================================================
    return (
        <TouchableWithoutFeedback onPress={() => setProfileVisible(false)}>
            <View style={userProfileStyles.mainContainer} >
                <View style={[globalStyles.boxContainer,userProfileStyles.profileContainer]} >
                    <View style={globalStyles.row}>
                        <FontAwesome name="user-circle-o" size={60} color="#333" />
                    </View>
                    <View style={globalStyles.row}>
                        <Text style={[globalStyles.field_Title]}>نام و نام خانوادگی:</Text>
                        <Text style={[globalStyles.field_Value]}>{currentUser?.fullName}</Text>
                    </View>
                    <View style={globalStyles.row}>
                        <Text style={[globalStyles.field_Title]}>شماره موبایل:</Text>
                        <Text style={[globalStyles.field_Value]}>{currentUser?.mobile}</Text>
                    </View>
                    <View style={globalStyles.row}>
                        <Text style={[globalStyles.field_Title]}>نوع کاربر:</Text>
                        <Text style={[globalStyles.field_Value]}>
                            {currentUser?.role == "Driver" ? "راننده" : ""}
                            {currentUser?.role == "Freightage" ? "باربری" : ""}
                            {currentUser?.role == "Admin" ? "ادمین" : ""}
                            {currentUser?.role == "SuperAdmin" ? "سوپر ادمین" : ""}
                        </Text>
                    </View>
                    {currentUser?.role == "Driver" ?
                        <View style={globalStyles.row}>
                            <Text style={[globalStyles.field_Title]}>نوع وسیله نقلیه:</Text>
                            <Text style={[globalStyles.field_Value]}>{currentUser?.carTypeTitle}</Text>
                        </View> : <></>
                    }
                    <View style={globalStyles.separator}>
                    </View>
                    <View style={globalStyles.row}>
                        <Text style={[globalStyles.field_Title]}>اعتبار حساب:</Text>
                        {currentUser?.dayCountToExpire > 10 ?
                            <Text style={[globalStyles.field_Value, globalStyles.field_Value_Success]}>{currentUser?.dayCountToExpire} روز دیگر</Text>
                            :
                            <Text style={[globalStyles.field_Value, globalStyles.field_Value_Danger]}>{currentUser?.dayCountToExpire} روز دیگر</Text>
                        }

                    </View>
                    <View style={globalStyles.row}>
                        <Text style={[globalStyles.field_Title]}>وضعیت احراز هویت:</Text>

                        {currentUser?.isActive ?
                            <Text style={[globalStyles.field_Value, globalStyles.field_Value_Success]}>
                                تایید شده
                            </Text>
                            :
                            <Text style={[globalStyles.field_Value, globalStyles.field_Value_Danger]}>
                                در انتظار ارسال مدارک
                            </Text>
                        }
                    </View>
                    {currentUser?.isSuspend ?
                        <>
                            <View style={globalStyles.row}>
                                <Text style={[globalStyles.field_Title]}>وضعیت کاربر:</Text>
                                <Text style={[globalStyles.field_Value, globalStyles.field_Value_Danger]}>
                                    تعلیق به مدت {currentUser?.dayCountToUnSuspend} روز
                                </Text>
                            </View>
                            <View style={globalStyles.row}>
                                <Text style={[globalStyles.field_Title]}>علت تعلیق:</Text>
                                <Text style={[globalStyles.field_Value, globalStyles.field_Value_Danger]}>
                                    {currentUser?.suspendReason}
                                </Text>
                            </View></> : <></>
                    }
                    <View style={globalStyles.separator}>
                    </View>
                    <View style={globalStyles.row}>
                        <TouchableOpacity
                            style={[userProfileStyles.Button_Container]}
                        >
                            <FontAwesome name="credit-card" style={[userProfileStyles.Button_Icon1]} size={24} color="#f47d07" />
                            <Text style={userProfileStyles.button_Label}>تمدید اعتبار حساب</Text>
                            <AntDesign style={[userProfileStyles.Button_Icon2]} name="leftcircleo" size={24} color="#f47d07" />
                        </TouchableOpacity>
                    </View>
                    <View style={globalStyles.separator}>
                    </View>
                    <View style={globalStyles.row}>
                        <TouchableOpacity
                            style={[userProfileStyles.Button_Container]}
                        >
                            <Ionicons name="ios-shield-checkmark-sharp" style={[userProfileStyles.Button_Icon1]} size={26} color="#f47d07" />
                            <Text style={userProfileStyles.button_Label}>ارسال مدارک هویتی</Text>
                            <AntDesign style={[userProfileStyles.Button_Icon2]} name="leftcircleo" size={24} color="#f47d07" />
                        </TouchableOpacity>
                    </View>
                    <View style={globalStyles.separator}>
                    </View>
                    <View style={globalStyles.row}>
                        <TouchableOpacity
                            style={[userProfileStyles.Button_Container]}
                        >
                            <MaterialIcons name="phone-forwarded" style={[userProfileStyles.Button_Icon1]} size={30} color="#f47d07" />
                            <Text style={userProfileStyles.button_Label}>تماس با پشتیبانی</Text>
                            <AntDesign style={[userProfileStyles.Button_Icon2]} name="leftcircleo" size={24} color="#f47d07" />
                        </TouchableOpacity>
                    </View>
                    <View style={globalStyles.separator}>
                    </View>
                    <View style={globalStyles.row}>
                        <TouchableOpacity
                            style={[userProfileStyles.Button_Container]}
                            onPress={logOut}>
                            <MaterialCommunityIcons style={[userProfileStyles.Button_Icon1]} name="logout" size={30} color="#f47d07" />
                            <Text style={userProfileStyles.button_Label}>خروج از حساب کاربری</Text>
                            <AntDesign style={[userProfileStyles.Button_Icon2]} name="leftcircleo" size={24} color="#f47d07" />
                        </TouchableOpacity>
                    </View>

                </View>
                <Loading loading={loading} />
            </View>
        </TouchableWithoutFeedback>
    )
}
