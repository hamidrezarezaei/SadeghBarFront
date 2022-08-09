import { Dimensions, StyleSheet } from "react-native";

const calcPercent = (percent) => (Dimensions.get('window').width * percent) / 100;

export const userProfileStyles = StyleSheet.create({
    mainContainer: {
        width: calcPercent(100),
        flex: 1,
        flexDirection: 'column',
        alignSelf: "center",
        backgroundColor: 'rgba(224, 224,224, 0.9)',

    },
    profileContainer: {
        flex:undefined,
        width: calcPercent(90),
        marginTop: 30,
        borderColor: '#333',
        borderWidth: 1,
        padding: 10,
    },

   

    Button_Container: {
        flexDirection: "row",
        width: '100%',
        justifyContent: "center",
        paddingVertical: 2,
    },
    button_Label:
    {
        fontFamily: 'IranSans',
        fontSize: 14,
        width: '62%',
        marginLeft: 10,
        textAlignVertical: "center",
    },
    Button_Icon1: {
        // borderWidth: 1,
         width:'10%',
        textAlignVertical: "center",
        textAlign:"center",
    },
    Button_Icon2: {
        textAlignVertical: "center",
        // borderWidth: 1,
        width:'10%'
    },
});