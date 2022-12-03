import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { globalStyles } from '../../assets/Styles/GlobalStyle'
import { FormatNumber } from '../../Util/Convertors';
// =================================================================

export default function CargoDetails(
    {
        cargo,
        navigation,
        isShowCompleteInfo = false
    }
) {
    // =================================================================
   
    return (
        <View style={globalStyles.boxContainer}>

            <View style={globalStyles.row}>
                <Text style={globalStyles.field_Title}>کد بار:</Text>
                <Text style={globalStyles.field_Value}>{cargo.code}</Text>
            </View>
            <View style={globalStyles.separator}>
            </View>

          

            <View style={globalStyles.row}>
                <Text style={globalStyles.field_Title}>مبدا بار:</Text>
                <Text style={globalStyles.field_Value}>استان {cargo.sourceStateTitle}{cargo?.sourceCityId > 0 ? " - شهر " + cargo?.sourceCityTitle : ""}</Text>
            </View>
            <View style={globalStyles.separator}>
            </View>
            <View style={globalStyles.row}>
                <Text style={globalStyles.field_Title}>مقصد بار:</Text>
                <Text style={globalStyles.field_Value}>استان {cargo.destinationStateTitle}{cargo?.destinationCityId > 0 ? " - شهر " + cargo?.destinationCityTitle : ""}</Text>
            </View>
            <View style={globalStyles.separator}>
            </View>
            <View style={globalStyles.row}>
                <Text style={globalStyles.field_Title}>تاریخ ثبت بار:</Text>
                <Text style={globalStyles.field_Value}>{cargo.submitDateShamsi} - ساعت {cargo.submitTime}</Text>
            </View>
            <View style={globalStyles.separator}>
            </View>
            <View style={globalStyles.row}>
                <Text style={globalStyles.field_Title}>تاریخ حمل بار:</Text>
                <Text style={globalStyles.field_Value}>{cargo.takeDateShamsi} - ساعت {cargo.takeTime}</Text>
            </View>
            <View style={globalStyles.separator}>
            </View>
            <View style={globalStyles.row}>
                <Text style={globalStyles.field_Title}>مبلغ کرایه:</Text>
                <Text style={globalStyles.field_Value}>{FormatNumber(cargo.freightRate)} تومان</Text>
            </View>
       
            {
                isShowCompleteInfo && cargo.driverUserCode > 0 ?
                    <>
                        <View style={globalStyles.separator}>
                        </View>
                        <View style={globalStyles.row}>
                            <Text style={globalStyles.field_Title}>اعلام کننده بار:</Text>
                            <Text style={[globalStyles.field_Value,globalStyles.field_Value_Success]}>{cargo.submitterUser.fullName} ({cargo.submitterUserCode})</Text>
                        </View>
                    </> :
                    <></>
            }
        </View>
    )
}
