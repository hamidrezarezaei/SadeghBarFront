import 'react-native-gesture-handler';
import React, { useRef } from 'react'
import { I18nManager } from 'react-native';
import { useFonts } from 'expo-font';
import { View } from 'react-native';
import { globalStyles } from './assets/Styles/GlobalStyle';
import { ToastProvider } from 'react-native-toast-notifications'
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './Screens/Welcome/WelcomeScreen';
import HomeNavigator from './Screens/Home/HomeNavigator';
import LoginScreen from './Screens/Login/LoginScreen';
import VerifyScreen from './Screens/Verify/VerifyScreen';
import UserContext from './Context/UserContext';
import AddUserScreen from './Screens/AddUser/AddUserScreen';

//* Support for RTL
I18nManager.allowRTL(true);
I18nManager.forceRTL(true);

const stack = createStackNavigator();

export default function App() {
  const [isFontLoaded] = useFonts({
    IranSans: require('./assets/fonts/IRANSans.ttf'),
    IranSansBold: require('./assets/fonts/IRANSans_Bold.ttf'),
    // Entezar: require('./assets/fonts/Entezar.ttf'),
    DastNevis: require('./assets/fonts/DastNevis.otf'),


  });

  if (!isFontLoaded) {
    return null;
  }
  return (
    <UserContext.Provider value={{
      mobile: null,
      CurrentUser: null
    }}>
      <ToastProvider
        placement="top"
        duration={2500}
        offsetTop={90}
        successIcon={<AntDesign name="checkcircleo" size={24} color="white" />}
        dangerIcon={<MaterialIcons name="error-outline" size={24} color="white" />}
        textStyle={globalStyles.toastMessage}
      >
        <View style={globalStyles.mainContainer}>
          <NavigationContainer>
            <stack.Navigator
              screenOptions={{
                headerShown: false
              }}
            >
              <stack.Screen
              name="WelcomeScreen"
              component={WelcomeScreen} />
            <stack.Screen
              name="HomeNavigator"
              component={HomeNavigator} />
            <stack.Screen
              name="LoginScreen"
              component={LoginScreen} />
            <stack.Screen
              name="VerifyScreen"
              component={VerifyScreen} />
            </stack.Navigator>

          </NavigationContainer>
        </View>
      </ToastProvider>
    </UserContext.Provider >
  );

}
