import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import UserSubmissionCargoes from '../../Component/UserSubmissionCargoes/UserSubmissionCargoes'
import UserContext from '../../Context/UserContext';
// =================================================================

export default function SubmitByUserScreen(props) {
  const context = useContext(UserContext);
 const userId = props.route.params.userId;
 const userFullName = props.route.params.userFullName;

  return (
       <UserSubmissionCargoes userId={userId} userFullName={userFullName} navigation={props.navigation} isShowCompleteInfo={true} isShowBackButton={true}/> 
  )
}
