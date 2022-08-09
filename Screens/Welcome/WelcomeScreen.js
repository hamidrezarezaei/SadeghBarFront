import { useFocusEffect,useNavigationState  } from '@react-navigation/native';
import React, { useContext, useState, useEffect, useCallback } from 'react';
import { BackHandler, Button, Image, StyleSheet, Text, View } from 'react-native';
import { GetCurrent_User_Api } from '../../Api/userApi';
import UserContext from '../../Context/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { welcomeStyles } from './WelcomeStyle';
import { useToast } from "react-native-toast-notifications";

// =================================================================
export default function WelcomeScreen(props) {
  const context = useContext(UserContext);
  const toast = useToast();

  // =================================================================
  const screenIndex = useNavigationState(state => state.index);
  useEffect(() => {
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
  }, []);
  // =================================================================
  useFocusEffect(
    useCallback(() => {
      manageRouting();
    }, [])
  );
  // =================================================================
  const manageRouting = async () => {
  //  await AsyncStorage.removeItem('token');
    

    var token = await AsyncStorage.getItem('token');
     console.log('welcome screen token = ', token);

    if (!token) {
      props.navigation.reset({
        index: 0,
        routes: [{ name: 'LoginScreen' }],
      });
      // props.navigation.navigate('LoginScreen');
    }
    else {
      getCurrentUser();

      setTimeout(() => {
        props.navigation.reset({
          index: 0,
          routes: [{ name: 'HomeNavigator' }],
        });
      }, 2500)
    }
  }
  // =================================================================
  const getCurrentUser = async () => {
    try {
      let data = await GetCurrent_User_Api();

      if (data.messageStatus == "Successful") {
        context.CurrentUser = data.messageData.data;
        // console.log('user=', data);
        // props.navigation.navigate('VerifyScreen', { mobile: mobile });
      }
      else {
        // toast.show(data.message, { type: "danger" });
      }
    }
    catch (error) {
      await AsyncStorage.removeItem('token');
      props.navigation.navigate('LoginScreen');
      // toast.show("خطا در ارتباط با سرور.", { type: "danger" });
    }
  }
  return (
    <View style={welcomeStyles.continer}>
      <Image
        style={welcomeStyles.logo}
        source={require('../../assets/imgs/logo200_white.png')}
      />
      <Text style={welcomeStyles.slogan}>
        جابجایی بار به سراسر ایران
      </Text>
    </View>
  )
}
