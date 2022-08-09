import { Dimensions, StyleSheet } from "react-native";
const calcPercent = (percent) => (Dimensions.get('window').width * percent) / 100;
export const globalStyles = StyleSheet.create({

    mainContainer: {
        flex: 1,
    },
    screenContainer: {
        flexWrap: "wrap",
        direction: "column",
        justifyContent: 'center',
        alignItems: "center",
        width: calcPercent(100),
        flex: 1,
    },
    screen_Title:{
        fontFamily: "IranSansBold",
        fontSize:17,
        paddingVertical:5
    },
    boxContainer: {
        flex: 1,
        flexDirection: 'column',
        alignSelf: "center",
        width: calcPercent(94),
        backgroundColor: 'white',
        marginVertical: 8,
        paddingBottom:7,
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.43,
        shadowRadius: 9.51,
        elevation: 15,
    },
    searcButton: {
        backgroundColor: '#0078d7',
        position: "absolute",
        bottom: 17,
        right: 14,
        padding:15,
        borderRadius:46,
        zIndex:9990,
    },
    backButton:{
        backgroundColor: '#0078d7',
        position: "absolute",
        bottom: 17,
        left: 14,
        padding:15,
        borderRadius:46,
        zIndex:9990,

    },
    warning_Background: {
        backgroundColor: '#ffedb5',
    },
    danger_Background: {
        backgroundColor: '#f5b3b3',
    },
    menu_Item:{
        fontFamily: 'IranSans',

    },
    // ==========================begin form========================
    form_ScreenContainer: {
        // flexDirection: 'row',
    },
    form_Container:
    {
        flexDirection: 'column',
        alignSelf: "center",
         width: calcPercent(96),
        flexWrap: "wrap",
        justifyContent: 'space-around',
        alignItems: "center",
        backgroundColor: 'white',
        marginTop: 5,
        marginBottom: 10,
        paddingBottom:7,
        borderRadius: 5,
        marginLeft:calcPercent(4),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    form_FieldIcon: {
        width: calcPercent(13),
    },
    form_FieldTitle: {
        width: calcPercent(79),
        fontSize: 14,
        textAlignVertical: 'center',
    },
    form_FieldValue: {
        width: calcPercent(87),
        fontSize: 16,
        textAlign: 'right',
        paddingHorizontal: 5,
    },
    form_checkBoxGroup: {
        width: calcPercent(87),
        flexDirection: "row",
        justifyContent: "space-between",
    },
    form_checkBox: {
        width: calcPercent(40),

    },
    form_checkBoxTitle: {
        paddingHorizontal: 5,
        fontFamily: 'IranSans',

    },
    // ==========================end form===========================

    header: {
        fontFamily: 'IranSans',
        fontSize: 18,
        fontWeight: 'bold',
        color: 'red'
    },
    toastMessage: {
        fontFamily: 'IranSans',
        fontSize: 13,

    },
    row: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: "center",
        marginVertical: 4,
        // borderWidth:2
    },
    col_50: {
        width: '50%',
        // borderWidth: 1,
        flexDirection: 'row',
        justifyContent: "flex-start",
        paddingHorizontal: 7,
    },
    separator: {
        borderBottomWidth: 1,
        borderColor: '#cdcdcd',
        width: '90%',
        alignSelf: "center",
        marginVertical: 3,
    },
    field_Title: {
        fontFamily: "IranSans",
        fontSize: 13,
        textAlignVertical:'center'
    },
    field_Value: {
        fontFamily: "IranSansBold",
        fontSize: 14,
        paddingHorizontal: 3,
    },
  
    field_Value_Success: {
        color: '#28a745'
    },
    field_Value_Danger: {
        color: '#dc3545'
    },
    field_Value_Warning: {
        color: '#ffc107'
    },
    field_Icon: {
        textAlign: "center",
        textAlignVertical: "center",
        color: '#f47d07'
    },
    text_Input: {
        fontFamily: "IranSans",
        borderWidth: 1,
        backgroundColor: '#fff',
        borderRadius: 5,
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 10,
        paddingBottom: 8,
    },
    swith_Input: {

    },
    content: {
    },
    divider: {
        height: 8,
        borderWidth: 0,
        width: calcPercent(100),
        opacity: 0
    },
    col_1: {
        width: calcPercent(1),
    },
    submitButton: {
        backgroundColor: '#007bff',
        color: 'white',
        borderRadius: 7,
        paddingVertical: 8,
        textAlign: 'center'
    },
    submitButton_Text: {
        fontFamily: "IranSansBold",
        fontSize: 14,
        color: 'white',
        textAlign: 'center'
    },
    secondaryButton: {
        backgroundColor: '#6c757d',
        color: 'white',
        borderRadius: 7,
        paddingVertical: 8,
        textAlign: 'center'
    },
    secondaryButton_Text: {
        fontFamily: "IranSansBold",
        fontSize: 14,
        color: 'white',
        textAlign: 'center'

    },
    dangerButton: {
        backgroundColor: '#dc3545',
        color: 'white',
        borderRadius: 7,
        paddingVertical: 8,
        textAlign: 'center'
    },
    dangerButton_Text: {
        fontFamily: "IranSansBold",
        fontSize: 14,
        color: 'white',
        textAlign: 'center'

    },
    successButton: {
        backgroundColor: '#28a745',
        color: 'white',
        borderRadius: 7,
        paddingVertical: 8,
        textAlign: 'center'
    },
    successButton_Text: {
        fontFamily: "IranSansBold",
        fontSize: 14,
        color: 'white',
        textAlign: 'center'

    },
    disabledButton: {
        backgroundColor: '#cccccc'
    },
    disabledButton_Text: {
        backgroundColor: '#666666'
    },
    // =========================combo==========================
    combo_Style: {
        paddingTop: 0,
        paddingBottom: 0,
        marginTop: 0,
        marginBottom: 0,
    },
    combo_ContainerStyle: {
        paddingTop: 0,
        paddingBottom: 0,
        marginTop: 0,
        marginBottom: 0,
        // width:170
    },
    combo_SelectedItemContainerStyle: {
        backgroundColor: "#cdcdcd"
    },
    combo_TextStyle: {
        fontFamily: 'IranSans',
        fontSize: 12,
    },
    combo_LabelStyle: {
        marginTop: 0,
        marginBottom: 0,
    }
    // =======================================================
});
