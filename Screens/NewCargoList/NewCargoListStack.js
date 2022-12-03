import { StyleSheet, Text, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import EditCargoScreen from '../EditCargo/EditCargoScreen';
import NewCargoListScreen from './NewCargoListScreen';
const stack = createStackNavigator();

export default function NewCargoListStack() {
    return (
        <stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <stack.Screen
                name="NewCargoListScreen"
                component={NewCargoListScreen} />
            <stack.Screen
                name="EditCargoScreen"
                component={EditCargoScreen} />
        </stack.Navigator>
    )
}
