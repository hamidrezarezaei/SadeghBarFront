import { Dimensions, StyleSheet } from "react-native";
const calcPercent = (percent) => (Dimensions.get('window').width * percent) / 100;

export const docsSingleStyles = StyleSheet.create({
    container: {
        width: calcPercent(80),
        alignItems: "center",
        textAlign: "center",
    },

    title: {
        fontFamily: "IranSansBold",
        fontSize: 16,
        paddingVertical: 10
    },

    image: {
        borderWidth: 2,
        borderRadius: 5,
        borderColor: '#cdcdcd',
        width: calcPercent(70),
        resizeMode: 'contain',
        height: (Dimensions.get('window').height * 50) / 100,
        

    },
   
    takeImageButton:{
        width: calcPercent(70),
        marginVertical:6
    },
    selectImageButton:{
        width: calcPercent(70),
        marginVertical:6

    }
});