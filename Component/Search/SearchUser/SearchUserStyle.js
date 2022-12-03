import { Dimensions, StyleSheet } from "react-native";

const calcPercent = (percent) => (Dimensions.get('window').width * percent) / 100;

export const searchUserStyles = StyleSheet.create({
    mainContainer: {
        width: calcPercent(100),
        flex: 1,
        flexDirection: 'column',
        alignSelf: "center",
        backgroundColor: 'rgba(224, 224,224, 0.9)',

    },
    searchContainer: {
        width: calcPercent(95),
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

     search_BorderBottom: {
        borderBottomColor: '#cdcdcd',
        borderBottomWidth: 2,
        width: calcPercent(100),
    },
   
    form_FieldValue:{
        width: calcPercent(65),
    },
    field_Title:{
        width: calcPercent(25),
        textAlignVertical:"center",
        // borderWidth:1
    },
   
     
    form_checkBoxGroup:{
        width: calcPercent(65),
        flexDirection: "row",
        justifyContent: "space-between",
    },
    form_checkBox:{
        width: calcPercent(22),
         borderWidth:0,
        paddingVertical:0,
        paddingLeft:8
    },
    form_checkBoxTitle:{
        fontFamily: 'IranSans',
        fontSize:11,
        width:calcPercent(15),
        paddingRight:7,
    },
    form_checkBox_userType:
    {
        width: calcPercent(15),
        borderWidth:0,
        paddingVertical:0,
        paddingLeft:2

    },
    form_checkBoxTitle_userType:{
        paddingHorizontal: 1,
        fontFamily: 'IranSans',
        fontSize:9,
        width:calcPercent(14),
        paddingRight:9,
        // borderWidth:1
    },
    separator:{
        width: calcPercent(90),

    },
    buttonsRow:{
        width: calcPercent(90),
        alignSelf:'center',
        justifyContent:"space-between"
    },
    searchButton: {
        width: calcPercent(42),
    },
    clearFilterButton:{
        width: calcPercent(42),
    },
});