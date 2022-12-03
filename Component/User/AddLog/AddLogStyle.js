import { Dimensions, StyleSheet } from "react-native";

const calcPercent = (percent) => (Dimensions.get('window').width * percent) / 100;

export const addLogStyles = StyleSheet.create({
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
        marginTop: 35

    },
    bodyContainer: {
        width: '100%'
    },
    form_FieldTitle: {
        width: calcPercent(87)
    },
    submitButton: {
        width: calcPercent(87),
        backgroundColor: '#104c1e',
        alignSelf: "flex-end",
        marginRight: calcPercent(1),
        paddingVertical: 8,
    },
});