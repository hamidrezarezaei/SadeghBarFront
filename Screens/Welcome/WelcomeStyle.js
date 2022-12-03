import { Dimensions, StyleSheet } from "react-native";
const calcPercent = (percent) => (Dimensions.get('window').width * percent) / 100;
export const welcomeStyles = StyleSheet.create({
    continer: {
        flex:1,
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",
        //نارنجی
        // backgroundColor: '#f47d07',
        //آبی
         backgroundColor: '#0078d7',
         
        //سفید
        //backgroundColor: '#fff',
        
    },
    internetText:{
        color:'white',
        fontFamily: 'DastNevis',
        fontSize: 20,

    },
    refreshButton:{
        marginTop:10,
        paddingHorizontal:20
    },
    logo:{
          width:calcPercent(100),
          marginTop:-10,
          resizeMode: 'contain',
         height:Dimensions.get('window').height, 
    },
    slogan:{
        fontFamily: 'DastNevis',
        // color:'white',
        color:'#0074bd',
        marginTop:15,
         fontSize: 26,
    },
});