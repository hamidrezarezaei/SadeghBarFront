import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import UserContext from '../../Context/UserContext';
import UserCarriedCargoes from '../../Component/UserCarriedCargoes/UserCarriedCargoes';

export default function CarryByMeScreen(props) {
  const context = useContext(UserContext);

  return (
    <UserCarriedCargoes userId={context.CurrentUser?.id} userFullName={context.CurrentUser?.fullName} navigation={props.navigation}  isShowCompleteInfo={false}  isShowBackButton={false}/>

  )
}
