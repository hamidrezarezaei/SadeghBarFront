import React, { useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import EditCargoScreen from '../EditCargo/EditCargoScreen';
import SubmitByUserScreen from './SubmitByUserScreen';
  // =================================================================

const stack = createStackNavigator();

export default function SubmitByUserStack(props) {
  // =================================================================
  return (
    <stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <stack.Screen
        name="SubmitByUserScreen"
        component={SubmitByUserScreen} />
      <stack.Screen
        name="EditCargoScreen"
        component={EditCargoScreen} />
    </stack.Navigator>
  )
}
