import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import UserContext from '../../Context/UserContext';
import UserCarriedCargoes from '../../Component/UserCarriedCargoes/UserCarriedCargoes';

export default function CarryByUserScreen(props) {
  const context = useContext(UserContext);
  const userId = props.route.params.userId;
  const userFullName = props.route.params.userFullName;

  return (
    <UserCarriedCargoes userId={userId} userFullName={userFullName} navigation={props.navigation}  isShowCompleteInfo={true} isShowBackButton={true}/>

  )
}
