import { Dimensions, StyleSheet } from "react-native";

const calcPercent = (percent) => (Dimensions.get('window').width * percent) / 100;

export const sendPureSmsStyles = StyleSheet.create({
    headerContainer: {
        width: '100%',
        backgroundColor: '#6a0dad',
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
        borderColor: '#6a0dad',
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
        backgroundColor: '#6a0dad',
        alignSelf: "flex-end",
        marginRight: calcPercent(1),
        paddingVertical: 8,
    },
});