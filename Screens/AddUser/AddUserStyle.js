import { Dimensions, StyleSheet } from "react-native";

const calcPercent = (percent) => (Dimensions.get('window').width * percent) / 100;

export const addUserStyles = StyleSheet.create({
    submitButton: {
        width: calcPercent(87),
        alignSelf: "flex-end",
        marginRight: calcPercent(1),
        paddingVertical: 8,
        marginBottom: 20
    },
    
});