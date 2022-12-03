import { Dimensions, StyleSheet } from "react-native";

const calcPercent = (percent) => (Dimensions.get('window').width * percent) / 100;

export const cargoDetailsStyles = StyleSheet.create({
    detailsButton:{
        width: '48%',
        paddingTop:10,
        paddingBottom:10,
    },
    cargoCanceledButton:{
        width:'48%',
        paddingTop:10,
        paddingBottom:10,
    },
});