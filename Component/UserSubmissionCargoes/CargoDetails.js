import { Linking, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native'
import React from 'react'
import { globalStyles } from '../../assets/Styles/GlobalStyle'
import { cargoDetailsStyles } from './CargoDetailsStyle';
import { FormatNumber } from '../../Util/Convertors';
import { persianStatus, StatusColor } from '../../Util/CargoUtils';
import Plate from '../Plate/Plate';
import { CancelBySubmitter_Cargo_Api } from '../../Api/cargoApi';
import { useToast } from "react-native-toast-notifications";

// =================================================================

export default function CargoDetails(
    {
        cargo,
        navigation,
        setLoading,
        refreshData,
        isShowCompleteInfo = false
    }
) {
    const toast = useToast();

    // =================================================================
    const cancelBySubmitterConfirm = async () => {
        Alert.alert('', 'آیا از لغو بار اطمینان دارید؟', [
            {
                text: 'خیر',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            { text: 'بله', onPress: () => cancelBySubmitter() },
        ]);
    }
    const cancelBySubmitter = async () => {
        try {
            setLoading(true);
            let data = await CancelBySubmitter_Cargo_Api(cargo.id);
            if (data.messageStatus == "Successful") {
                setLoading(false);
                // refreshScreen();
                toast.show(data.message, { type: "success" });
                refreshData();
            }
            else {
                setLoading(false);
                toast.show(data.message, { type: "danger" });
            }
        }
        catch (error) {
            setLoading(false);
            toast.show("خطا در ارتباط با سرور.", { type: "danger" });
        }
    }

    // =================================================================

    return (
        <View style={[globalStyles.boxContainer, { backgroundColor: StatusColor(cargo.status) }]}>
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
                <Text style={globalStyles.field_Title}>نوع ماشین:</Text>
                <Text style={globalStyles.field_Value}>{cargo.carTypeTitle}</Text>
            </View>
            <View style={globalStyles.separator}>
            </View>
            <View style={globalStyles.row}>
                <Text style={globalStyles.field_Title}>مبلغ کرایه:</Text>
                <Text style={globalStyles.field_Value}>{FormatNumber(cargo.freightRate)} تومان</Text>
            </View>

            <View style={globalStyles.separator}>
            </View>
            <View style={globalStyles.row}>
                <Text style={globalStyles.field_Title}>وضعیت بار:</Text>
                <Text style={cargo.status == "TakeByDriver" ? [globalStyles.field_Value, globalStyles.field_Value_Success] : [globalStyles.field_Value]}>{persianStatus(cargo.status)}</Text>
            </View>
            {
                (cargo.status == 'Active' || cargo.status == 'NewCargo') ?
                    <View style={[globalStyles.row, { justifyContent: 'space-between', paddingHorizontal: 5 }]}>

                        <TouchableOpacity
                            style={[globalStyles.dangerButton, cargoDetailsStyles.cargoCanceledButton]}
                            onPress={cancelBySubmitterConfirm}>
                            <Text style={[globalStyles.dangerButton_Text]}>لغو بار</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[globalStyles.submitButton, cargoDetailsStyles.detailsButton]}
                            onPress={() => navigation.navigate('EditCargoScreen', { cargoId: cargo.id })}
                        >
                            <Text style={globalStyles.submitButton_Text}>ویرایش</Text>
                        </TouchableOpacity>
                    </View> : <></>
            }
            {

                (cargo.cancelerUser != null && cargo.cancelerUser.code > 0) ?
                    <>
                        <View style={globalStyles.separator}>
                        </View>
                        <View style={globalStyles.row}>
                            <Text style={[globalStyles.field_Value, globalStyles.field_Value_Danger]}>اعلام کنسلی توسط کاربر کد {cargo.cancelerUser.code}</Text>
                        </View>
                        <View style={globalStyles.separator}>
                        </View>
                    </> :
                    <></>
            }
            {

                (cargo.driverUser != null && cargo.driverUser.code > 0) ?
                    <>
                        <View style={globalStyles.separator}>
                        </View>
                        <View style={globalStyles.row}>
                            <Text style={globalStyles.field_Title}>نام راننده بار:</Text>
                            <Text style={[globalStyles.field_Value, globalStyles.field_Value_Success]}>{cargo.driverUser.fullName}</Text>
                        </View>
                        <View style={globalStyles.separator}>
                        </View>
                        <View style={globalStyles.row}>
                            <Text style={globalStyles.field_Title}>شماره تماس راننده:</Text>
                            <Text onPress={() => { Linking.openURL('tel:' + cargo.driverUser.mobile); }} style={[globalStyles.field_Value, globalStyles.field_Value_Success]}>{cargo.driverUser.mobile} </Text>
                        </View>

                        <View style={globalStyles.separator}>
                        </View>
                        <View style={globalStyles.row}>
                            <Plate plate1={cargo.driverUser.plate1} plate2={cargo.driverUser.plate2} plate3={cargo.driverUser.plate3} plate4={cargo.driverUser.plate4} />
                        </View>

                    </> :
                    <></>
            }

        </View>
    )
}
