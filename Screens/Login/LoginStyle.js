import { Dimensions, StyleSheet } from "react-native";
const calcPercent = (percent) => (Dimensions.get('window').width * percent) / 100;

export const loginStyles = StyleSheet.create({
    // =======================================================
    continer: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        //نارنجی
        // backgroundColor: '#f47d07',
        //آبی
        // backgroundColor: '#0074bd',
        //سفید
        backgroundColor: '#fff',

    },
    forStartText: {
        fontFamily: "IranSans",
        color: '#333',
        fontSize: 15,
        marginTop: 40,
        width: calcPercent(80),
        textAlign: 'center',

    },
    mobile: {
        borderWidth: 2,
        borderColor:'#0074bd',
        borderRadius: 8,
        width: calcPercent(80),
        marginVertical: 10,
        fontSize: 20,
        padding: 5,
        textAlign: "center",
    },
    lawText: {
        fontFamily: "IranSans",
        color: '#333',
        fontSize: 14,
        width: calcPercent(80),
        textAlign: 'center',
    },
    submitButton: {
        width: calcPercent(80),
        marginTop: 20,
        paddingVertical: 8,

    }
});