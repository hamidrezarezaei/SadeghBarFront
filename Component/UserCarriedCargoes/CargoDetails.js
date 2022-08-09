import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { globalStyles } from '../../assets/Styles/GlobalStyle'
import { FormatNumber } from '../Util/Convertors';
// =================================================================

export default function CargoDetails(
    {
        cargo,
        navigation,
        isShowCompleteInfo = false
    }
) {
    // =================================================================
    const persianStatus = (status) => {
        switch (status) {
            case ("NewCargo"): return "تایید نشده";
            case ("Active"): return "فعال";
            case ("TakeByDriver"): return "حمل شده";
            case ("CancelByDriver"): return "کنسل شده توسط راننده";
            case ("CancelBySubmitter"): return "کنسل شده توسط اعلام کننده";
            case ("UpdatedBySubmitter"): return "ویرایش شده";
            case ("UpdatedByAdmin"): return "ویرایش شده توسط مدیر";
            case ("DeleteByAdmin"): return "حذف شده توسط مدیر";
        }
    }
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
                <Text style={globalStyles.field_Title}>تاریخ ثبت بار:</Text>
                <Text style={globalStyles.field_Value}>{cargo.submitDateShamsi}</Text>
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
                            <Text style={[globalStyles.field_Value,globalStyles.field_Value_Success]}>{cargo.submitterUserFullName} ({cargo.submitterUserCode})</Text>
                        </View>
                    </> :
                    <></>
            }
        </View>
    )
}
