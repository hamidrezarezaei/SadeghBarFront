import { Dimensions, StyleSheet } from "react-native";

const calcPercent = (percent) => (Dimensions.get('window').width * percent) / 100;

export const cargoSubmitterInfoStyles = StyleSheet.create({
    boxContainer: {
        borderColor:'#104c1e',
        borderWidth:4
    },
    headerContainer: {
        width: '100%',
        backgroundColor: '#104c1e',
    },
    headerText: {
        textAlign: "center",
        fontFamily: 'IranSansBold',
        fontSize: 13,
        color: '#333',
        padding: 8,
        color: 'white'
    },
    row1: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 7,
    },
    fullNameTitle: {
        fontFamily: 'IranSans',
        fontSize: 13,
        // color:'white',
        color: '#333',

    },
    submitterUserFullName: {
        fontFamily: 'IranSansBold',
        fontSize: 13,
        // color:'white',
        color: '#333',
    },
    row2: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 7,
        paddingTop:0

    },
    telTitle: {
        fontFamily: 'IranSans',
        fontSize: 13,
        // color:'white',
        color: '#333',
    },
    tel: {
        fontFamily: 'IranSansBold',
        fontSize: 14,
        // color:'white',
        color: '#333',
    },
});