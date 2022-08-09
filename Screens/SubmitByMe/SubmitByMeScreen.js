import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import UserSubmissionCargoes from '../../Component/UserSubmissionCargoes/UserSubmissionCargoes'
import UserContext from '../../Context/UserContext';
// =================================================================

export default function SubmitByMeScreen(props) {
  const context = useContext(UserContext);

  return (
    <UserSubmissionCargoes userId={context.CurrentUser?.id} userFullName={context.CurrentUser?.fullName} navigation={props.navigation} isShowCompleteInfo={false}  isShowBackButton={false}/>
  )
}
