import { StyleSheet } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import CargoListScreen from './CargoListScreen';
import CargoSingleScreen from '../CargoSingle/CargoSingleScreen';

const stack = createStackNavigator();

export default function CargoListStack() {
  return (
    <stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <stack.Screen
        name="CargoListScreen"
        component={CargoListScreen} />
      <stack.Screen
        name="CargoSingleScreen"
        component={CargoSingleScreen} />
    </stack.Navigator>
  )
}
