import { Dimensions, StyleSheet } from "react-native";

const calcPercent = (percent) => (Dimensions.get('window').width * percent) / 100;

export const userDocsStyles = StyleSheet.create({
    mainContainer: {
        width: calcPercent(100),
        flex: 1,
        flexDirection: 'column',
        alignSelf: "center",
        backgroundColor: 'rgba(224, 224,224, 0.9)',

    },
    boxContainer: {
        width: calcPercent(86),
        alignSelf: "center",
        marginTop: 100,
        backgroundColor: 'white',
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.43,
        shadowRadius: 9.51,
        elevation: 15,
        borderColor: '#333',
        borderWidth: 1,
        padding: 10,
    },
    mainText:{
        fontSize:14,
        lineHeight:40,
        textAlign:"center",
        marginBottom:10
    },
    buttonsRow:{
        width: calcPercent(70),
        alignSelf:'center',
        justifyContent:"space-between"
    },
    linkButton: {
        width: calcPercent(32),
    },
    closeButton:{
        width: calcPercent(32),
    },
});