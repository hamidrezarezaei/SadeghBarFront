import { Dimensions, StyleSheet } from "react-native";
import { color } from "react-native-reanimated";
const calcPercent = (percent) => (Dimensions.get('window').width * percent) / 100;

export const cameraScreenStyles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
    },
    camera: {
        flex:1,
        width: calcPercent(100),
        height:Dimensions.get('window').height,
        alignItems: "center",
        textAlign: "center",
    },
    takePhotoButton:{
       borderRadius:40,
       borderColor:'#333',
       borderWidth:3,
       backgroundColor:'white',
       padding:20,
       textAlign:"center",
       top:Dimensions.get('window').height - 150,
    },
    whiteScreen:{
        flex: 1,
        backgroundColor: 'white',
        width: calcPercent(100),
        height: '100%',
        position: 'absolute',
        top: 0, right: 0,
        color: 'green',
        zIndex: 999999,
    }
});