import { useFocusEffect, DrawerActions, StackActions, NavigationActions, CommonActions } from '@react-navigation/native';
import React, { useContext, useState, useCallback } from 'react'
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

// =================================================================

const Drawer = createDrawerNavigator();
// =================================================================

export default function HomeNavigator(props) {
  const [profileVisible, setProfileVisible] = useState(false);
  const context = useContext(UserContext);
  // =================================================================
  useFocusEffect(
    useCallback(() => {
    }, [])
  );
  // =================================================================
  return (
    <>
      <Drawer.Navigator
        screenOptions={{
          swipeEdgeWidth: 0,
          drawerLabelStyle:globalStyles.menu_Item,
          headerLeft: () => {
            if (context.CurrentUser?.role == 'SuperAdmin' || context.CurrentUser?.role == 'Admin') {
              return (
                <TouchableOpacity onPress={() => props.navigation.dispatch(DrawerActions.openDrawer())}>
                  <MaterialIcons style={{ marginLeft: 8 }} name="menu" size={30} color="white" />
                </TouchableOpacity>
              );
            }
            else
              return (<></>);
          },
          headerTitle: () =>
            <Text style={{ fontFamily: 'DastNevis', fontSize: 27, paddingTop: 4, color: '#ffffff' }}>صادق بار</Text>
          ,
          headerTitleAlign: 'center',
          headerRight: () => {
            if (context.CurrentUser != null)
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
        backBehavior="none"
      >
        <Drawer.Screen name="HomeScreen" component={HomeScreen} options={{drawerLabel:"صفحه اصلی"}}/>
        <Drawer.Screen name="UserListStack" component={UserListStack} options={{drawerLabel:"لیست کاربران"}}/>
        <Drawer.Screen name="AddUserScreen" component={AddUserScreen}  options={{drawerLabel:"ایجاد کاربر جدید"}}/>
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
