import { Dimensions, StyleSheet } from "react-native";

const calcPercent = (percent) => (Dimensions.get('window').width * percent) / 100;

export const cargoSingleStyles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        flexDirection: "column",
    },
    
    Button: {
        width: '48%',
        paddingTop: 10,
        paddingBottom: 10,
    },
   
});