import { Dimensions, StyleSheet } from "react-native";

const calcPercent = (percent) => (Dimensions.get('window').width * percent) / 100;

export const behaviorButtonsStyles = StyleSheet.create({
    row_Buttons: {
        width: calcPercent(94),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: "center",
        flexWrap: "wrap",
        // borderWidth:1,
        paddingTop: 5,
        paddingBottom: 20,
    },
    takeButton:
    {
        width: '48%',
        paddingTop: 10,
        paddingBottom: 10,

    },
    dontTakeButton: {
        width: '48%',
        paddingTop: 10,
        paddingBottom: 10,
    },
    extendTimeButton: {
        width: '48%',
        marginTop: 15,
        paddingTop: 10,
        paddingBottom: 10,
    },
    cargoCanceledButton: {
        width: '48%',
        marginTop: 15,
        paddingTop: 10,
        paddingBottom: 10,
    },
    row_EnterExit: {
        width: calcPercent(94),
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        alignSelf: "center",
        // borderWidth:1,
        marginBottom: 20,
    },
    enterButton: {
        width: '48%',
    },
    exitButton: {
        width: '48%',
    },
    returnButton: {
        width: '48%',
    },
});