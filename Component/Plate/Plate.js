import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { globalStyles } from '../../assets/Styles/GlobalStyle'
import { plateStyles } from './PlateStyle'

export default function Plate({ plate1, plate2, plate3, plate4 }) {
  return (
    <View style={plateStyles.container}>
      <View style={plateStyles.col1}>
        <Image
        style={plateStyles.iranImg}
          source={require('../../assets/imgs/iran.jpg')}
        />
        <Text style={[globalStyles.field_Value, plateStyles.col1Text]}>I.R.</Text>
        <Text style={[globalStyles.field_Value, plateStyles.col1Text]}>IRAN</Text>
      </View>
      <View style={[plateStyles.col2]}>
        <Text style={[globalStyles.field_Value, plateStyles.col2Text]}>
          {plate3} {plate2} {plate1}
        </Text>
      </View>
      <View style={[plateStyles.col3]}>
        <Text style={[globalStyles.field_Value, plateStyles.iran]}>
          ایران
        </Text>
        <Text style={[globalStyles.field_Value, plateStyles.col3Text]}>
          {plate4}
        </Text>
      </View>
      <View>

      </View>

    </View>
  )
}
