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
    form_FieldTitle: {
        width: calcPercent(76),
        color: '#01477c',
    },
    field_Value_Success: {
        color: '#28a745',
        fontSize: 15,
        fontFamily: 'IranSansBold'
    },
    form_IsActiveTitle: {
        width: 'auto',
        marginRight: 5,
    },
    form_FieldIcon: {
        color: '#01477c'
    },
    submitButton: {
        width: calcPercent(87),
        alignSelf: "flex-end",
        marginRight: calcPercent(1),
        // marginBottom: 20
    },
    userButtonRow: {
        width: calcPercent(87),
        justifyContent: "space-between",
    },

    plate1: {
        textAlign: 'center',
        width: calcPercent(17),
    },
    plate3: {
        textAlign: 'center',
        width: calcPercent(28),
    },
    dash: {
        width: calcPercent(4),
        textAlignVertical: "center",
        textAlign: "center",
        fontSize: 16,
    },
    plate4: {
        textAlign: 'left',
        width: calcPercent(17),
    },
    iran: {
        position: "absolute",
        transform: [{ rotate: '90deg' }],
        top: 10,
        left: 0,
        fontSize: 11,
    },

    form_checkBoxGroup: {
        width: calcPercent(87),
        flexDirection: "row",
        justifyContent: "space-between",
    },
    form_checkBox: {
        width: calcPercent(28),

    },
    form_checkBoxTitle: {
        paddingHorizontal: 5,
        fontFamily: 'IranSans',
        fontSize: 13,

    },
});