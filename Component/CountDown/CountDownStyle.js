import { Dimensions, StyleSheet } from "react-native";

const calcPercent = (percent) => (Dimensions.get('window').width * percent) / 100;

export const countDownStyles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: 'center',
        flexWrap: "wrap",
        alignSelf: "center",
        width: calcPercent(94),
        // backgroundColor: 'white',
        // // backgroundColor: '#c1c4c6',
        // borderRadius: 5,
        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 7,
        // },
        // shadowOpacity: 0.43,
        // shadowRadius: 9.51,
        // elevation: 15,

        // borderColor: '#484d51',
        // borderWidth: 4,
        padding: 4,
    },
    title: {
        fontFamily: "IranSansBold",
        fontSize: 15,
        width:'100%',
        textAlign:"center",
        //  color:'white',
    },
    minute:{
        fontFamily: "IranSansBold",
        fontSize: 20,
        //  color:'white',
        // borderColor: '#484d51',
        // borderWidth: 4,
        
    },
    separator:{
        fontFamily: "IranSansBold",
        fontSize: 20,
        marginLeft:8,
        marginRight:8,
        //  color:'white',
    },
    second:{
        fontFamily: "IranSansBold",
        fontSize: 20,
        //  color:'white',
    },
});