import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import EditCargoScreen from '../EditCargo/EditCargoScreen';
import AdminCargoListScreen from './AdminCargoListScreen';
const stack = createStackNavigator();

export default function AdminCargoListStack() {
    return (
        <stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <stack.Screen
                name="AdminCargoListScreen"
                component={AdminCargoListScreen} />
            <stack.Screen
                name="EditCargoScreen"
                component={EditCargoScreen} />
        </stack.Navigator>
    )
}
