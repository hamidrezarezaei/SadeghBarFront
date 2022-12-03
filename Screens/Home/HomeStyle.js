import { StyleSheet } from "react-native";
export const homeStyles = StyleSheet.create({
    headerTitle: {
        fontFamily: "IranSans",
    },
    tabBar:{
        height:60,
        border:0,
    },
    tabBarItem:{
        borderWidth:1,
        borderColor:'#cdcdcd',
        marginRight:2,
        marginLeft:2,
        borderTopRightRadius:5,
        borderTopLeftRadius:5,
    },
    tabBarLabel:
    {
        fontFamily: "DastNevis",
        color:'#7d7f7f',
        fontSize: 14,
        width:'100%',
        textAlign:'center',
        
    },
    tabBarLabel_Selected:
    {
        fontFamily: "DastNevis",
        color:'#ffffff',
        fontSize: 14,
        width:'100%',
        textAlign:'center',
    }
    
});
