import { Dimensions, StyleSheet } from "react-native";

const calcPercent = (percent) => (Dimensions.get('window').width * percent) / 100;

export const queueStyles = StyleSheet.create({
    boxContainer:{
        borderColor: '#484d51',
        borderWidth: 4,
        paddingBottom: 4,
    },
    headerContainer: {
        width: '100%',
        backgroundColor: '#484d51',
        marginBottom: 4,
    },
    headerText: {
        textAlign: "center",
        fontFamily: 'IranSansBold',
        fontSize: 14,
        color: '#333',
        padding: 8,
        color: 'white',

    },
    queueEmpty: {
        alignSelf: "center",
        fontFamily: "IranSans",
        fontSize: 12,
        padding: 10,
        color: '#848484'
    },
    row: {
        width: calcPercent(88),
        alignSelf: "center",
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        borderColor: '#cdcdcd',
        borderWidth: 1,
        padding: 4,
        paddingRight: 15,
        borderRadius: 30,
        marginBottom: 2,
        marginTop: 2
    },
    disableRow: {
        backgroundColor: '#efefef',
    },
    disableText: {
        color: '#767676',
    },
    index: {
        fontFamily: "IranSansBold",
        borderColor: '#cdcdcd',
        borderWidth: 1,
        borderRadius: 30,
        width: 30,
        textAlignVertical: "center",
        textAlign: 'center'
    },
    driverCode: {
        fontFamily: "IranSans",
        fontSize: 12,
        textAlignVertical: "center",
        // borderWidth: 1,
        width: 100,

    },
    status: {
        fontFamily: "IranSans",
        fontSize: 12,
        textAlignVertical: "center",
    },
    forbidden: {
        width: '100%',
        fontFamily: "IranSans",
        fontSize: 13,
        textAlign: "center",
        color: 'red',
        paddingBottom:20,
        paddingTop:20,
    },
});