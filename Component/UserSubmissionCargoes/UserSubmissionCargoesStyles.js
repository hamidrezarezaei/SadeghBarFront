import { Dimensions, StyleSheet } from "react-native";
const calcPercent = (percent) => (Dimensions.get('window').width * percent) / 100;

export const userSubmissionCargoesStyles = StyleSheet.create({
    // =======================================================
    cargoesContainer: {
        width: calcPercent(100),
        // paddingBottom: 120,
    },
   
});