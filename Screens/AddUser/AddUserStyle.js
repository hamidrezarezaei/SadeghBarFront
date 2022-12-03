import { Dimensions, StyleSheet } from "react-native";

const calcPercent = (percent) => (Dimensions.get('window').width * percent) / 100;

export const addUserStyles = StyleSheet.create({
    submitButton: {
        width: calcPercent(87),
        alignSelf: "flex-end",
        marginRight: calcPercent(1),
        paddingVertical: 8,
        marginBottom: 20
    },
    plate1: {
        textAlign: 'center',
        width: calcPercent(17),
    },
    plate3: {
        textAlign: 'center',
        width: calcPercent(28),
    },
    dash:{
        width: calcPercent(4),
        textAlignVertical:"center",
        textAlign:"center",
        fontSize:16,
    },
    plate4: {
        textAlign: 'left',
        width: calcPercent(17),
    },
    iran:{
        position:"absolute",
        transform: [{ rotate: '90deg' }],
        top:10,
        left:0,
        fontSize:11,
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
    }
});