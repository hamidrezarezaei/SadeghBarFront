import { useFocusEffect, DrawerActions, StackActions, NavigationActions, CommonActions } from '@react-navigation/native';
import React, { useContext, useEffect, useState, useCallback } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './HomeScreen';
import { Image, Modal, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { UserProfile } from '../../Component/UserProfile/UserProfile';
import AddUserScreen from '../AddUser/AddUserScreen';
import UserContext from '../../Context/UserContext';
import UserListStack from '../UserList/UserListStack';
import { globalStyles } from '../../assets/Styles/GlobalStyle';
import { CurrentUserRole, IsAdminCurrentUser } from '../../Util/UserUtils';
import { Feather } from '@expo/vector-icons';
import { GetNotificationStatus_User_Api, SetNotificationStatus_User_Api } from '../../Api/userApi';
import AdminCargoListScreen from '../AdminCargoList/AdminCargoListScreen';
import NewCargoListScreen from '../NewCargoList/NewCargoListScreen';
import NewCargoListStack from '../NewCargoList/NewCargoListStack';
import AdminCargoListStack from '../AdminCargoList/AdminCargoListStack';
// =================================================================

const Drawer = createDrawerNavigator();

// =================================================================

export default function HomeNavigator(props) {
  const [profileVisible, setProfileVisible] = useState(false);
  const [isEnableNotification, setIsEnableNotification] = useState(null);
  const context = useContext(UserContext);

  // =================================================================
  useFocusEffect(
    useCallback(() => {
      loadNotificationStatus();
    }, [])
  );

  // =================================================================
  const loadNotificationStatus = async () => {
    try {
      let data = await GetNotificationStatus_User_Api();
      if (data.messageStatus == "Successful") {
        setIsEnableNotification(data.messageData.data);
        console.log('hrrtestNotification' + data.messageData.data);
      }
    }
    catch (error) {
      // setLoading(false);
      toast.show("خطا در ارتباط با سرور.", { type: "danger" });
    }
  }
  // =================================================================
  const setNotification = async (isEnable) => {
    try {
      let data = await SetNotificationStatus_User_Api({ isEnable: isEnable });
      if (data.messageStatus == "Successful") {
        setIsEnableNotification(isEnable);
      }
      else {
        toast.show(data.message, { type: "danger" });
      }
    }
    catch (error) {
      // setLoading(false);
      toast.show("خطا در ارتباط با سرور.", { type: "danger" });
    }
  }
  // =================================================================
  return (
    <>
      <Drawer.Navigator
        screenOptions={{
          swipeEdgeWidth: 0,
          drawerLabelStyle: globalStyles.menu_Item,
          headerLeft: () => {
            //اگر ادمین بود
            if (IsAdminCurrentUser(context)) {
              return (
                <TouchableOpacity onPress={() => props.navigation.dispatch(DrawerActions.openDrawer())}>
                  <MaterialIcons style={{ marginLeft: 8 }} name="menu" size={30} color="white" />
                </TouchableOpacity>
              );
            }
            else if (isEnableNotification != null && isEnableNotification == true) {
              return (
                <TouchableOpacity onPress={() => setNotification(false)}>
                  <Feather name="volume-2" style={{ marginLeft: 8 }} size={30} color="white" />
                </TouchableOpacity>
              )
            }
            else if ((isEnableNotification != null && isEnableNotification == false)) {
              return (
                <TouchableOpacity onPress={() => setNotification(true)}>
                  <Feather name="volume-x" style={{ marginLeft: 8 }} size={30} color="white" />
                </TouchableOpacity>
              )
            }
            else {
              return (<Text>{isEnableNotification?.toString()}</Text>);
            }
          },
          headerTitle: () =>
            <Text style={{ fontFamily: 'DastNevis', fontSize: 27, paddingTop: 4, color: '#ffffff' }}>صادق بار</Text>
          ,
          headerTitleAlign: 'center',
          headerRight: () => {
            if (CurrentUserRole(context)?.toString().length > 0)
              return (
                <View style={{ marginRight: 8 }}>
                  <TouchableOpacity
                    onPress={() => setProfileVisible(true)}>
                    <FontAwesome name="user-circle-o" size={30} color="#ffffff" />
                  </TouchableOpacity>
                </View>
              )
            else
              return (<></>);
          },
          headerStyle: {
            // backgroundColor: '#0074bd', 
            // backgroundColor: 'white',
            //آبی
            backgroundColor: '#0078d7',
            //نارنجی
            // backgroundColor: '#f47d07',

          },
          headerTintColor: '#fff', //Set Header text color

        }}
      >
        <Drawer.Screen name="HomeScreen" component={HomeScreen} options={{ drawerLabel: "سالن بار" }} />
        <Drawer.Screen name="NewCargoListStack" component={NewCargoListStack} options={{ drawerLabel: "بارهای در انتظار تایید" }} />
        <Drawer.Screen name="AdminCargoListStack" component={AdminCargoListStack} options={{ drawerLabel: "مدیریت بارها" }} />
        <Drawer.Screen name="UserListStack" component={UserListStack} options={{ drawerLabel: "لیست کاربران" }} />
        <Drawer.Screen name="AddUserScreen" component={AddUserScreen} options={{ drawerLabel: "ایجاد کاربر جدید" }} />
      </Drawer.Navigator>
      <Modal
        animationType="fade"
        transparent={true}
        visible={profileVisible}
        onRequestClose={() => {
          setProfileVisible(false);
        }}>
        <TouchableWithoutFeedback
          onPress={() => {
            setProfileVisible(false);
          }}>

          <UserProfile
            setProfileVisible={setProfileVisible}
            navigation={props.navigation}
          />
        </TouchableWithoutFeedback>
      </Modal>
    </>
  )
}
