import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import UserListScreen from './UserListScreen';
import UserSingleScreen from '../UserSingle/UserSingleScreen';
import SubmitByUserScreen from '../SubmitByUser/SubmitByUserScreen';
import CarryByUserScreen from '../CarryByUser/CarryByUserScreen';
import SubmitByUserStack from '../SubmitByUser/SubmitByUserStack';
const stack = createStackNavigator();

export default function UserListStack() {
  return (
    <stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <stack.Screen
        name="UserListScreen"
        component={UserListScreen} />
      <stack.Screen
        name="UserSingleScreen"
        component={UserSingleScreen} />
      <stack.Screen
        name="SubmitByUserStack"
        component={SubmitByUserStack} />
      <stack.Screen
        name="CarryByUserScreen"
        component={CarryByUserScreen} />
    </stack.Navigator>
  )
}