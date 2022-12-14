import { Dimensions, StyleSheet } from "react-native";

const calcPercent = (percent) => (Dimensions.get('window').width * percent) / 100;

export const searchCargoStyles = StyleSheet.create({
    mainContainer: {
        width: calcPercent(100),
        flex: 1,
        flexDirection: 'column',
        alignSelf: "center",
        backgroundColor: 'rgba(224, 224,224, 0.9)',

    },
    searchContainer: {
        width: calcPercent(86),
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
        width: calcPercent(9),
        textAlign: "center",
    },
    codeValue:{
        width: calcPercent(50),

    },
    search_SourceTitle: {
        fontSize: 13,
        width: calcPercent(17),
        textAlignVertical: "center",
        paddingRight: 4
    },
    search_DestinationTitle: {
        fontSize: 13,
        width: calcPercent(17),
        textAlignVertical: "center",
        paddingRight: 4,
    },
    search_CarTypeTitle: {
        fontSize: 13,
        width: calcPercent(17),
        textAlignVertical: "center",
        paddingRight: 4,
    },
    search_CheckBoxContainer:{
        width: calcPercent(50),
        flexDirection:"row",
        justifyContent:"space-around",

    },
    search_CheckBoxTitle: {
        fontSize: 13,
        // width: calcPercent(45),
        textAlignVertical: "center",
        paddingRight: 4,
        paddingLeft:2,
    },
    search_BorderBottom: {
        borderBottomColor: '#cdcdcd',
        borderBottomWidth: 2,
        width: calcPercent(100),
    },
  
    buttonsRow:{
        width: calcPercent(70),
        alignSelf:'center',
        justifyContent:"space-between"
    },
    searchButton: {
        width: calcPercent(32),
    },
    clearFilterButton:{
        width: calcPercent(32),
    },
});