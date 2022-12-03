// import 'react-native-gesture-handler';
import React from 'react'
import { I18nManager, StatusBar } from 'react-native';
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
import DocsScreen from './Screens/Docs/DocsScreen';
// =================================================================

//* Support for RTL
I18nManager.forceRTL(true);
I18nManager.allowRTL(true);

const stack = createStackNavigator();

// =================================================================
export default function App() {
  const [isFontLoaded] = useFonts({
    IranSans: require('./assets/fonts/IRANSans.ttf'),
    IranSansBold: require('./assets/fonts/IRANSans_Bold.ttf'),
    DastNevis: require('./assets/fonts/DastNevis.otf'),
  });

  // =================================================================


  if (!isFontLoaded) {
    return null;
  }
  // =================================================================
  return (
    <View style={{ backgroundColor: '#0074bd', width: '100%', height: '100%' }}>
      <StatusBar backgroundColor="#0074bd" barStyle="light-content" />
      <UserContext.Provider value={{
        mobile: null,
        CurrentUser: null
      }}>
        <ToastProvider
          placement="top"
          duration={3500}
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
                <stack.Screen
                  name="DocsScreen"
                  component={DocsScreen} />
              </stack.Navigator>

            </NavigationContainer>
          </View>
        </ToastProvider>
      </UserContext.Provider >
    </View>
  );
}
