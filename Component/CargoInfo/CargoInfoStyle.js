import { Dimensions, StyleSheet } from "react-native";

const calcPercent = (percent) => (Dimensions.get('window').width * percent) / 100;

export const cargoInfoStyles = StyleSheet.create({
    row1: {
        flex: 1,
        flexDirection: 'row',

    },
    row1Col1:
    {
        flex: 1,
        borderBottomColor: '#cdcdcd',
        borderBottomWidth: 1,
        padding: 10,
        alignItems: 'center'
    },
    row1Col2:
    {
        flex: 1,
        borderBottomColor: '#cdcdcd',
        borderBottomWidth: 1,
        borderLeftColor: '#cdcdcd',
        borderLeftWidth: 1,
        padding: 10,
        alignItems: 'center'

    },
    arrowLeft: {
        position: 'absolute',
        left: -15,
        top: 20,
        zIndex: 999
    },
    sourceStateTitle: {
        fontFamily: 'IranSansBold',
        marginBottom: 5,
        color: '#333',
        // fontSize: 18,

    },
    sourceCityTitle: {
        fontFamily: 'IranSans',
        color: '#333',
    },
    destinationStateTitle: {
        fontFamily: 'IranSansBold',
        marginBottom: 5,
        color: '#333',
    },
    destinationCityTitle: {
        fontFamily: 'IranSans',
        color: '#333',
    },
    row2: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: "wrap",

    },
    row2Col1:
    {
        width: '50%',
        flexDirection: 'row',
        justifyContent: 'center',
        //borderWidth: 1,
        paddingTop: 10,
        paddingBottom: 10,
    },
    carTypeContainer:
    {
        // borderWidth: 1,
        flexDirection: 'row',
        borderColor: '#cdcdcd',
        padding: 5
    },
    row2Col2:
    {
        width: '50%',
        flexDirection: 'row',
        justifyContent: 'center',
        //borderWidth: 1,
        paddingTop: 10,
        paddingBottom: 10,
    },
    freightRateContainer: {
        borderWidth: 1,
        flexDirection: 'row',
        borderColor: '#cdcdcd',
        backgroundColor: '#fdcd78',
        borderRadius: 5,
        padding: 5,
        paddingTop: 2,
        paddingBottom: 2,
    },

    row2Col3:
    {
        width: '50%',
        flexDirection: 'row',
        justifyContent: 'center',
        //borderWidth: 1,
        paddingTop: 0,
        paddingBottom: 10,
    },
    typeContainer: {
        // borderWidth: 1,
        flexDirection: 'row',
        borderColor: '#cdcdcd',
        padding: 5
    },
    row2Col4:
    {
        width: '50%',
        flexDirection: 'row',
        justifyContent: 'center',
        //borderWidth: 1,
        paddingTop: 0,
        paddingBottom: 10,
    },
    weightContainer: {
        // borderWidth: 1,
        flexDirection: 'row',
        padding: 5
    },
    title: {
        fontFamily: 'IranSans',
        fontSize: 12,
        color: '#333',
    },
    carTypeTitle: {
        fontFamily: 'IranSansBold',
        fontSize: 12,
    },
    freightRate: {
        fontFamily: 'IranSansBold',
        fontSize: 12,
    },

    commentContainer: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        paddingTop: 0,

    },
    comment: {
        fontFamily: 'IranSansBold',
        flex: 1,
        flexWrap: "wrap",
        fontSize: 12,
        textAlign: "center",
        padding: 5,
        borderWidth: 1,
        borderColor: '#cdcdcd',
        backgroundColor: '#fbe2b6',
    },
    row4: {
        flex: 1,
        paddingBottom: 10,
        minHeight: 50,
    },
    detailsButton: {
        width: '80%',
        alignSelf: "center"
    },
    takeByDriver_Img: {
        transform: [{ rotate: '-10deg' }],
        alignSelf: 'center',

    },
});