import { Dimensions, StyleSheet } from "react-native";

const calcPercent = (percent) => (Dimensions.get('window').width * percent) / 100;

export const addCargoStyles = StyleSheet.create({
   

    submitButton: {
        width: calcPercent(87),
        alignSelf: "flex-end",
        marginRight:calcPercent(1),
        paddingVertical:8,
        marginBottom:20
    },
    form_checkBoxGroup: {
        width: calcPercent(87),
        flexDirection: "row",
        justifyContent: "space-between",
    },
    form_checkBox: {
        width: calcPercent(40),

    },
    form_checkBoxTitle: {
        paddingHorizontal: 5,
        fontFamily: 'IranSans',

    },
});