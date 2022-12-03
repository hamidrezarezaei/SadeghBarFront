import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { loadingStyles } from './LoadingStyle'

export default function Loading({loading}) {
  if(loading)
  return (
    <View style={loadingStyles.container} >
      <Image
        style={loadingStyles.image}
        source={require('../../assets/imgs/loader.gif')}
        
      />
    </View>)
    else
    return(<></>);
}

const styles = StyleSheet.create({})