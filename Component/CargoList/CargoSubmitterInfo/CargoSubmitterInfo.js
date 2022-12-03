import { StyleSheet, Text, View ,Linking} from 'react-native'
import React from 'react'
import { cargoSubmitterInfoStyles } from './CargoSubmitterInfoStyle'
import { globalStyles } from '../../../assets/Styles/GlobalStyle'

export default function CargoSubmitterInfo(
    {
        cargo = null
    }) {
    return (
        <>
            {/* اگر اطلاعات تماس اعلام کننده بار وجود داشت این کامپوننت وارد عمل می شود */}
            {cargo && cargo.submitterUser && cargo.submitterUser.code ? (
                <View style={[globalStyles.boxContainer,cargoSubmitterInfoStyles.boxContainer]}>
                    <View style={cargoSubmitterInfoStyles.headerContainer}>
                        <Text style={cargoSubmitterInfoStyles.headerText}>
                                                    اطلاعات اعلام کننده بار
                        </Text>
                    </View>
                    <View style={cargoSubmitterInfoStyles.row1}>
                        <Text style={cargoSubmitterInfoStyles.fullNameTitle}>
                            نام و نام خانوادگی :
                        </Text>
                        <Text style={cargoSubmitterInfoStyles.submitterUserFullName}>
                            {cargo?.submitterUser.fullName}
                        </Text>
                    </View>
                    <View  style={cargoSubmitterInfoStyles.row2}>
                        <Text style={cargoSubmitterInfoStyles.telTitle}>
                            شماره تماس :
                        </Text>
                        <Text onPress={()=>{Linking.openURL('tel:' + cargo.tel);}} style={cargoSubmitterInfoStyles.tel}>
                            {cargo?.tel}
                        </Text>
                    </View>
                </View>
            ) : (<></>)}

        </>
    )
}
