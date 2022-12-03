import { Dimensions, StyleSheet } from "react-native";
const calcPercent = (percent) => (Dimensions.get('window').width * percent) / 100;

export const newCargoListStyles = StyleSheet.create({
    // =======================================================
    cargoesContainer: {
        width: calcPercent(100),
        // paddingBottom: 120,
    },
    searcButton: {
        backgroundColor: '#0078d7',
        position: "absolute",
        bottom: 17,
        left: 14,
        padding:15,
        borderRadius:46,
        zIndex:9990,
    }
});