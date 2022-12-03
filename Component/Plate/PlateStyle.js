import { Dimensions, StyleSheet } from "react-native";

const calcPercent = (percent) => (Dimensions.get('window').width * percent) / 100;

export const plateStyles = StyleSheet.create({
    container: {
        // borderColor:'#cdcdcd',
        flexDirection: "row-reverse",
        borderRadius: 5,
        borderWidth: 1,
        width: calcPercent(40)
    },
    col1: {
        width: calcPercent(10),
        backgroundColor: '#003399',
        alignItems:"center",
    },
    iranImg:{
        marginBottom:4,
    },
    col1Text: {
        color: "#fff",
        fontSize:7,
        width:'100%',
        textAlign:'right',
    },
    col2: {
        width: calcPercent(20),
        alignItems: "center",
        justifyContent: "center",
    },
    col2Text: {
        textAlign: "center",
        textAlignVertical: "center",
    },

    col3: {
        flexDirection: "column",
        width: calcPercent(10),
        borderRightWidth: 1,
    },
    iran: {
        fontSize: 9,
        textAlign: "center",
        padding: 0,
    },
    col3Text: {
        textAlign: "center",
    },
})