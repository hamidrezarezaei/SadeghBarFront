import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { userInfoStyles } from './UserInfoStyle';
import { globalStyles } from '../../../assets/Styles/GlobalStyle';

export default function UserInfo(
  {
    user,
    navigation,
  }) {
  return (
    <TouchableOpacity
    onPress={() => navigation.navigate('UserSingleScreen', { id: user?.id })}
    >
    <View style={user?.isSuspend? [globalStyles.boxContainer, globalStyles.danger_Background]: user?.isActive ? globalStyles.boxContainer : [globalStyles.boxContainer, globalStyles.warning_Background]}>
      <View style={globalStyles.row}>
        <Text style={globalStyles.field_Title}>کد کاربر:</Text>
        <Text style={globalStyles.field_Value}>{user.code}</Text>
      </View>

      <View style={globalStyles.row}>
        <Text style={globalStyles.field_Title}>نام و نام خانوادگی:</Text>
        <Text style={globalStyles.field_Value}>{user.name} {user.family}</Text>
      </View>

      {/* <View style={globalStyles.row}>
        <Text style={globalStyles.field_Title}>شماره موبایل:</Text>
        <Text style={globalStyles.field_Value}>{user.mobile} </Text>
      </View> */}

      <View style={globalStyles.row}>
        <Text style={[globalStyles.field_Title]}>نوع کاربر:</Text>
        <Text style={[globalStyles.field_Value]}>
          {user?.role == 0 ? "سوپر ادمین" : ""}
          {user?.role == 1 ? "ادمین" : ""}
          {user?.role == 2 ? "راننده" : ""}
          {user?.role == 3 ? "باربری" : ""}
          {user?.role == 4 ? "صاحب کالا" : ""}
        </Text>
      </View>
      <View style={globalStyles.row}>
        {user?.role == 2 ?
          <View style={globalStyles.row}>
            <Text style={[globalStyles.field_Title]}>نوع وسیله نقلیه:</Text>
            <Text style={[globalStyles.field_Value]}>{user?.carTypeTitle}</Text>
          </View> : <></>
        }
      </View>
      <View style={globalStyles.row}>
        <Text style={[globalStyles.field_Title]}>اعتبار حساب:</Text>
        {user?.dayCountToExpire > 10 ?
          <Text style={[globalStyles.field_Value, globalStyles.field_Value_Success]}>{user?.dayCountToExpire} روز دیگر</Text>
          :
          <Text style={[globalStyles.field_Value, globalStyles.field_Value_Danger]}>{user?.dayCountToExpire} روز دیگر</Text>
        }

      </View>
      <View style={globalStyles.row}>
        <Text style={[globalStyles.field_Title]}>وضعیت احراز هویت:</Text>

        {user?.isActive ?
          <Text style={[globalStyles.field_Value, globalStyles.field_Value_Success]}>
            تایید شده
          </Text>
          :
          <Text style={[globalStyles.field_Value, globalStyles.field_Value_Danger]}>
            در انتظار ارسال مدارک
          </Text>
        }
      </View>
      {user?.isSuspend ?
        <View style={globalStyles.row}>
          <Text style={[globalStyles.field_Title]}>وضعیت کاربر:</Text>
          <Text style={[globalStyles.field_Value, globalStyles.field_Value_Danger]}>
            تعلیق به مدت {user?.dayCountToUnSuspend} روز
          </Text>
        </View>
        : <></>
      }
    </View >
     </TouchableOpacity >
  )
}
