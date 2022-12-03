import AsyncStorage from '@react-native-async-storage/async-storage';

// =================================================================
export const SetLastCargoId = async (id) => {
    let x = await AsyncStorage.getItem('LastCargoId');
    if (x && parseInt(id) < x)
        return;
    await AsyncStorage.setItem("LastCargoId", id.toString());
}
// =================================================================
export const GetLastCargoId = async () => {

    let id = await AsyncStorage.getItem('LastCargoId');
    if (id)
        return parseInt(id);
    return 0;
}