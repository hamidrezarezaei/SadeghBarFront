import { Dimensions, StyleSheet } from "react-native";

const calcPercent = (percent) => (Dimensions.get('window').width * percent) / 100;

export const userSingleStyles = StyleSheet.create({
    headerContainer: {
        width: '100%',
        backgroundColor: '#01477c',
        marginBottom: 4,
    },
    headerText: {
        textAlign: "center",
        fontFamily: 'IranSansBold',
        fontSize: 14,
        color: '#fff',
        padding: 8,

    },
    boxContainer: {
        width: calcPercent(96),
        borderColor: '#01477c',
        borderWidth: 4,

    },
    isActive_Swith: {
        width: calcPercent(15),
    },
    form_FieldTitle:{
        width: calcPercent(76),
        color: '#01477c',
    },
    field_Value_Success: {
        color: '#28a745',
        fontSize:15,
        fontFamily:'IranSansBold'
    },
    form_FieldIcon:{
        color: '#01477c'
    },
    submitButton: {
        width: calcPercent(87),
        alignSelf: "flex-end",
        marginRight: calcPercent(1),
        // marginBottom: 20
    },
    userButtonRow:{
        width: calcPercent(87),
justifyContent:"space-between",
    },
    submitByUserButton:{
        width: calcPercent(40),
        alignSelf: "flex-end",
    },
    carryByUserButton:{
        width: calcPercent(40),
        alignSelf: "flex-end",
    },
});