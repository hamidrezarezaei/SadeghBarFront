import { Dimensions, StyleSheet } from "react-native";
const calcPercent = (percent) => (Dimensions.get('window').width * percent) / 100;

export const userListStyles = StyleSheet.create({
    // =======================================================
    usersContainer: {
        width: calcPercent(100),
    },

});