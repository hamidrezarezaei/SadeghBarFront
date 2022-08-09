import React from 'react'
import { Text, StyleSheet, View, TouchableOpacity, Image } from 'react-native'
import { cargoInfoStyles } from './CargoInfoStyle';
import { FontAwesome } from '@expo/vector-icons';
import { globalStyles } from '../../assets/Styles/GlobalStyle';
import { FormatNumber } from '../Util/Convertors';

export default function CargoInfo(
  {
    cargo,
    navigation,
    isShowMoreInfoButton = true,
    isShowCompleteInfo = false
  }) {
  return (
    <View style={globalStyles.boxContainer}>

      <View style={[cargoInfoStyles.row1, { marginTop: 0 }]}>
        <View style={cargoInfoStyles.row1Col1}>
          <Text style={cargoInfoStyles.sourceStateTitle}>{cargo?.sourceStateTitle}</Text>
          <Text style={cargoInfoStyles.sourceCityTitle}>{cargo?.sourceCityTitle}</Text>
        </View>
        <View >
          <FontAwesome style={cargoInfoStyles.arrowLeft} name="long-arrow-left" size={30} color="orange" />
        </View>
        <View style={cargoInfoStyles.row1Col2}>
          <Text style={cargoInfoStyles.destinationStateTitle}>{cargo?.destinationStateTitle}</Text>
          <Text style={cargoInfoStyles.destinationCityTitle}>{cargo?.destinationCityTitle}</Text>
        </View>
      </View>

      <View style={cargoInfoStyles.row2}>
        <View style={cargoInfoStyles.row2Col1}>
          <View style={cargoInfoStyles.carTypeContainer}>
            <Text style={cargoInfoStyles.title}>نوع ماشین: </Text>
            <Text style={cargoInfoStyles.carTypeTitle}>{cargo?.carTypeTitle ? cargo.carTypeTitle : "هر نوعی"}</Text>
          </View>
        </View>
        <View style={cargoInfoStyles.row2Col2}>
          <View style={cargoInfoStyles.freightRateContainer}>
            <Text style={cargoInfoStyles.title}>مبلغ کرایه: </Text>
            <Text style={cargoInfoStyles.freightRate}>{FormatNumber(cargo?.freightRate)} تومان</Text>
          </View>
        </View>
      
        {isShowCompleteInfo ? (
          <>
            <View style={cargoInfoStyles.row2Col3}>
              <View style={cargoInfoStyles.typeContainer}>
                <Text style={cargoInfoStyles.title}>نوع بار: </Text>
                <Text style={cargoInfoStyles.freightRate}>{cargo?.type}</Text>
              </View>
            </View>
            <View style={cargoInfoStyles.row2Col4}>
              <View style={cargoInfoStyles.weightContainer}>
                <Text style={cargoInfoStyles.title}>وزن بار: </Text>
                <Text style={cargoInfoStyles.freightRate}>{cargo?.weight}</Text>
              </View>
            </View>
          </>
        ) : (<></>)
        }
      </View>
      {isShowCompleteInfo && cargo?.comment ? (
        <View style={globalStyles.row}>
          <View style={cargoInfoStyles.commentContainer}>
            <Text style={cargoInfoStyles.comment}>{cargo?.comment}</Text>
          </View>
        </View>
      ) :
        (<></>)
      }
      
      {isShowMoreInfoButton ? (
        <View style={cargoInfoStyles.row4}>
          {cargo.status == 'Active' ?
            <TouchableOpacity
              style={[globalStyles.submitButton, cargoInfoStyles.detailsButton]}
              // style={[globalStyles.successButton, cargoInfoStyles.detailsButton]}
              onPress={() => navigation.navigate('CargoSingleScreen', { id: cargo?.id })}
            >
              <Text style={globalStyles.submitButton_Text}>اطلاعات بیشتر...</Text>
            </TouchableOpacity> :
            <Image
              style={cargoInfoStyles.takeByDriver_Img}
              source={require('../../assets/imgs/takeByDriver.png')}
            />
          }

        </View>) : (<></>)
      }
    </View>
  )
}
