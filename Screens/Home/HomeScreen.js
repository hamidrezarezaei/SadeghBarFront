import React,{useContext} from 'react'
import { StyleSheet, Text } from 'react-native'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from '@react-navigation/native';
import AddCargoScreen from '../AddCargo/AddCargoScreen';
import { homeStyles } from './HomeStyle';
import CargoListStack from '../CargoList/CargoListStack';
import SubmitByMeStack from '../SubmitByMe/SubmitByMeStack';
import CarryByMeScreen from '../CarryByMe/CarryByMeScreen';
import KeyboardAvoidingComponent from '../KeyboardAvoidingComponent';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { IsFreightageCurrentUser, IsProductOwnerCurrentUser } from '../../Util/UserUtils';
import UserContext from '../../Context/UserContext';

const Tab = createBottomTabNavigator();

// "#FE9802"
const selectedColor = "orange"

export default function HomeScreen() {
  const context = useContext(UserContext);

  return (
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          headerTitleStyle: homeStyles.headerTitle,
          tabBarStyle: homeStyles.tabBar,
          tabBarItemStyle: homeStyles.tabBarItem,
          tabBarLabelStyle: homeStyles.tabBarLabel,
          tabBarHideOnKeyboard:"true",
          tabBarActiveBackgroundColor: '#0078d7'
          
        }}

      >
        <Tab.Screen
          name="CargoListStack"
          component={CargoListStack}
          options={{
            tabBarLabel:
              ({ focused }) => {
                return (<Text style={focused ? homeStyles.tabBarLabel_Selected : homeStyles.tabBarLabel} >سالن بار</Text>)
              },
            tabBarIcon: ({ focused }) => { return (<MaterialCommunityIcons name="truck-fast-outline" size={38} color={focused ? "#ffffff" : "#7d7f7f"} />) },
          }}

          listeners={({ navigation }) => ({
            tabPress: (e) => {
              e.preventDefault();
              navigation.navigate("CargoListScreen");
            },
          })}
        />
        <Tab.Screen
          name="AddCargoScreen"
          // component={AddCargoStack}
          component={AddCargoScreen}
          options={{
            tabBarLabel:
              ({ focused }) => {
                return (<Text style={focused ? homeStyles.tabBarLabel_Selected : homeStyles.tabBarLabel} >اعلام بار</Text>)
              },
            tabBarIcon: ({ focused }) => (<MaterialIcons name="playlist-add" size={35} color={focused ? "#ffffff" : "#7d7f7f"} />)
          }}
        />
        <Tab.Screen
          name="SubmitByMeStack"
          component={SubmitByMeStack}
          options={{
            tabBarLabel:
              ({ focused }) => {
                return (<Text style={focused ? homeStyles.tabBarLabel_Selected : homeStyles.tabBarLabel} >بارهای من</Text>)
              },
            tabBarIcon: ({ focused }) => (<Feather name="box" size={35} color={focused ? "#ffffff" : "#7d7f7f"} />)

          }}
          
          listeners={({ navigation }) => ({
            tabPress: (e) => {
              e.preventDefault();
              navigation.navigate('SubmitByMeStack', {screen: 'SubmitByMeScreen'});
              // navigation.navigate("SubmitByMeScreen");
            },
          })}
        />
        {!IsProductOwnerCurrentUser(context) && !IsFreightageCurrentUser(context) ?
        <Tab.Screen
          name="CarryByMeScreen"
          component={CarryByMeScreen}
          options={{
            tabBarLabel:
              ({ focused }) => {
                return (<Text style={focused ? [homeStyles.tabBarLabel_Selected ,{fontSize:12}]: [homeStyles.tabBarLabel,{fontSize:12}]} >محموله های من</Text>)
              },
            tabBarIcon: ({ focused }) => (<MaterialCommunityIcons name="checkbox-marked-circle-outline" size={35} color={focused ? "#ffffff" : "#7d7f7f"} />)
          }}
        />
        :<></>
      }

      </Tab.Navigator>
  )
}
