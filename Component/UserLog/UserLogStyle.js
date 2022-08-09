import { Dimensions, StyleSheet } from "react-native";

const calcPercent = (percent) => (Dimensions.get('window').width * percent) / 100;

export const userLogStyles = StyleSheet.create({
    headerContainer: {
        width: '100%',
        backgroundColor: '#104c1e',
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
        borderColor: '#104c1e',
        borderWidth: 4,
        marginTop:35

    },
    logsContainer: {
        width: '100%',
    },
    logRecord: {
        flexDirection: "column",
        borderWidth: 2,
        borderColor: '#cdcdcd',
        borderRadius: 5,
        marginVertical: 5,
        marginHorizontal: 8,
    },
    logRow: {
        textAlign: "center",
    },
    textStyle: {
        color: "#7d7f7f",
    }
});