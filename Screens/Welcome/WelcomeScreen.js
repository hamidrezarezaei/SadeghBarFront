// import * as Device from 'expo-device';
// import {Restart} from 'fiction-expo-restart';
import { useNavigationState } from '@react-navigation/native';
import React, {useRef, useContext, useState, useEffect } from 'react';
import { BackHandler, Image, Text, TouchableOpacity, View } from 'react-native';
import { GetCurrent_User_Api, UpdateExpoToken_User_Api } from '../../Api/userApi';
import UserContext from '../../Context/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { welcomeStyles } from './WelcomeStyle';
import RNRestart from 'react-native-restart';
import NetInfo from '@react-native-community/netinfo';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { globalStyles } from '../../assets/Styles/GlobalStyle';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
// =================================================================
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});
// =================================================================
export default function WelcomeScreen(props) {
  const context = useContext(UserContext);
  const [internetStatus, setInternetStatus] = useState(true);


  // =================================================================
  const screenIndex = useNavigationState(state => state.index);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect( () => {
    //برای مشکلی که در در فارسی به انگلیسی بود
    handleFirstRestart();

    //برای مدیریت دابل کلیک برای خروج
    handleExitDoubleClick();
    ChcekInternet();

  }, []);
  // =================================================================
  const ChcekInternet =  () => {
    NetInfo.fetch().then(state => {
      setInternetStatus(state.isConnected);
      if (state.isConnected) {
        try {
          //توکن مربوط به نوتیفیکیشن را به سرور میفرستیم
          registerForPushNotificationsAsync();

          // This listener is fired whenever a notification is received while the app is foregrounded
          notificationListener.current = Notifications.addNotificationReceivedListener();

          // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
          responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
          });
        }
        catch (error) {
           UpdateExpoToken_User_Api({ expoToken: error });
        }
        manageRouting();
      }
    });
  }
  // =================================================================
  const handleExitDoubleClick = () => {
    let currentCount = 0;
    if (screenIndex <= 0) {
      BackHandler.addEventListener("hardwareBackPress", () => {
        if (currentCount === 1) {
          BackHandler.exitApp();
          return true;
        }
        currentCount += 1;
        setTimeout(() => {
          currentCount = 0;
        }, 1000);
        return true;
      });
    }
  }
  // =================================================================
  const handleFirstRestart = async () => {
    let isFirstRunDone = await AsyncStorage.getItem('isFirstRunDone');
    if (isFirstRunDone == null || isFirstRunDone.toString() != 'true') {
      await AsyncStorage.setItem('isFirstRunDone', 'true');
      RNRestart.Restart();
    }
  }
  // =================================================================
  const manageRouting = async () => {
    //  await AsyncStorage.removeItem('token');

    var token = await AsyncStorage.getItem('token');
    // console.log('welcome screen token = ', token);

    if (!token) {
      props.navigation.reset({
        index: 0,
        routes: [{ name: 'LoginScreen' }],
      });
      // props.navigation.navigate('LoginScreen');
    }
    else {
      await getCurrentUser();
      setTimeout(() => {
        props.navigation.reset({
          index: 0,
           routes: [{ name: 'HomeNavigator' }],
          // routes: [{ name: 'DocsScreen' }],
        });
      }, 1500);
    }
  }
  // =================================================================
  const getCurrentUser = async () => {
    try {
      let data = await GetCurrent_User_Api();

      if (data.messageStatus == "Successful") {
        context.CurrentUser = data.messageData.data;
      }
      else {
      }
    }
    catch (error) {
      setInternetStatus(false);
      // await AsyncStorage.removeItem('token');
      // props.navigation.navigate('LoginScreen');
      // toast.show("خطا در ارتباط با سرور.", { type: "danger" });
    }
  }
  // =================================================================
  return (
    <View style={welcomeStyles.continer}>
      {!internetStatus ?
        <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <MaterialCommunityIcons name="wifi-off" size={100} color="white" />
          <Text style={welcomeStyles.internetText}>عدم اتصال به اینترنت</Text>
          <TouchableOpacity
            style={[[globalStyles.successButton, welcomeStyles.refreshButton]]}
            onPress={() => ChcekInternet()}
          >
            <Text style={globalStyles.successButton_Text}>تلاش مجدد ...</Text>
          </TouchableOpacity>
        </View>
        :
        <Image
          style={welcomeStyles.logo}
          source={require('../../assets/splash.png')}
        />

      }
    </View>
  )
}
// =================================================================
// =================================================================
async function registerForPushNotificationsAsync() {
  try {

    let token;
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
    await UpdateExpoToken_User_Api({ expoToken: 'not granted' });
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      token = 'e1';
    }

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('sadeghbar', {
        name: 'sadeghbar',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
        sound: 'notifysound.wav',
      });
    }
    await UpdateExpoToken_User_Api({ expoToken: token });
    console.log(token);
    return token;
  }
  catch(error) {
    await UpdateExpoToken_User_Api({ expoToken: '2' + error });
    
   }
}
