import { Dimensions, StyleSheet } from "react-native";

const calcPercent = (percent) => (Dimensions.get('window').width * percent) / 100;

export const loadingStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'space-around',
        
        backgroundColor: 'rgba(224, 224,224, 0.7)',
        
        width: calcPercent(100),
        height: '100%',
        position: 'absolute',
        top: 0, right: 0,
        color: 'green',
        zIndex: 999999,

    },
    image: {
        width: 90,
        height:90
    }
});