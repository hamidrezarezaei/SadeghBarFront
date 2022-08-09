import { Dimensions, StyleSheet } from "react-native";

const calcPercent = (percent) => (Dimensions.get('window').width * percent) / 100;

export const searchCargoStyles = StyleSheet.create({
    mainContainer: {
        width: calcPercent(100),
        flex: 1,
        flexDirection: 'column',
        alignSelf: "center",
        backgroundColor: 'rgba(224, 224,224, 0.7)',

    },
    searchContainer: {
        width: calcPercent(80),
        alignSelf: "center",
        marginTop: 30,
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

    field_Icon: {
        width: calcPercent(8),
        textAlign: "center",
    },
    codeValue:{
        width: calcPercent(50),

    },
    search_SourceTitle: {
        fontSize: 13,
        width: calcPercent(12),
        textAlignVertical: "center",
        paddingRight: 4
    },
    search_DestinationTitle: {
        fontSize: 13,
        width: calcPercent(12),
        textAlignVertical: "center",
        paddingRight: 4,
    },
    search_CarTypeTitle: {
        fontSize: 13,
        width: calcPercent(12),
        textAlignVertical: "center",
        paddingRight: 4,
    },
    search_IsSmallTitle: {
        fontSize: 13,
        width: calcPercent(35),
        textAlignVertical: "center",
        paddingRight: 4,
    },
    search_BorderBottom: {
        borderBottomColor: '#cdcdcd',
        borderBottomWidth: 2,
        width: calcPercent(100),
    },
    isSmall_Swith: {
        width: calcPercent(29),
    },
    returnButton: {
        width: calcPercent(70),
    },
});