import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import EditCargoScreen from '../EditCargo/EditCargoScreen';
import SubmitByMeScreen from './SubmitByMeScreen';

const stack = createStackNavigator();

export default function SubmitByMeStack() {
  return (
    <stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <stack.Screen
        name="SubmitByMeScreen"
        component={SubmitByMeScreen} />
      <stack.Screen
        name="EditCargoScreen"
        component={EditCargoScreen} />
    </stack.Navigator>
  )
}
