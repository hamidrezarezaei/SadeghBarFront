import { Dimensions, StyleSheet } from "react-native";

const calcPercent = (percent) => (Dimensions.get('window').width * percent) / 100;

export const userBehaviorStyles = StyleSheet.create({
    boxContainer: {
        width: calcPercent(96),
        borderWidth: 4,
        marginTop: 35,
         borderColor: '#256e36'
    },
    headerText: {
        textAlign: "center",
        fontFamily: 'IranSansBold',
        fontSize: 14,
        color: '#fff',
        padding: 8,

    },
    userButtonRow: {
        width: calcPercent(87),
        justifyContent: "space-between",
        alignSelf:"center",
        paddingVertical:5,
    },
    submitByUserButton: {
        width: calcPercent(40),
        alignSelf: "flex-end",
    },
    carryByUserButton: {
        width: calcPercent(40),
        alignSelf: "flex-end",
    },
})