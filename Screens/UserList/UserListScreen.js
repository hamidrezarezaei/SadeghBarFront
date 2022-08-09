import { Text, View, Button, TouchableWithoutFeedback, ScrollView, Keyboard, FlatList, TouchableOpacity, Modal, TouchableHighlight } from 'react-native'
import React, { useCallback, useState, useEffect } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { useToast } from "react-native-toast-notifications";
import Loading from '../../Component/Loading/Loading';
import { globalStyles } from '../../assets/Styles/GlobalStyle';
import CargoInfo from '../../Component/CargoInfo/CargoInfo';
import SearchCargo from '../../Component/SearchCargo/SearchCargo';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { GetAll_User_Api } from '../../Api/userApi';
import { userListStyles } from './UserListStyle';
import UserInfo from '../../Component/UserInfo/UserInfo';
import SearchUser from '../../Component/SearchUser/SearchUser';
import { setStatusBarBackgroundColor } from 'expo-status-bar';
// =================================================================

export default function UserListScreen(props) {
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const [users, setUsers] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageCount, setPageCount] = useState(1);

    const [code, setCode] = useState(0);
    const [name, setName] = useState("");
    const [family, setFamily] = useState("");
    const [isSuspend, setIsSuspend] = useState(null);
    const [isActive, setIsActive] = useState(null);
    const [driverOnly, setDriverOnly] = useState(false);
    const [freightageOnly, setFreightageOnly] = useState(false);
    const [carTypeId, setCarTypeId] = useState(0);

    const toast = useToast();
    // =================================================================
    useFocusEffect(
        useCallback(() => {
            setPageNumber(1);
            loadData(1);
            //   }, [sourceStateId, destinationStateId, carTypeId, isSmall])
        }, [code, name, family, isSuspend, isActive, driverOnly, freightageOnly, carTypeId])
    );
    // =================================================================
    //وقتی که اسکرول به آخر رسید و شماره صفحه تغییر کرد دیتاهای صفحه بعدی لود می شوند.
    useEffect(() => {
        if (pageNumber == 1)
            return;
        if (pageNumber > pageCount)
            return;
        loadData(pageNumber);
    }, [pageNumber]);
    // =================================================================
    const loadData = async (pNumber = 1) => {
        try {
            setLoading(true);

            let searchParams = {
                PageNumber: pNumber,
                code: code,
                name: name,
                family: family,
                isSuspend: isSuspend,
                isActive: isActive,
                driverOnly: driverOnly,
                freightageOnly: freightageOnly,
                CarTypeId: carTypeId,
            };

            let data = await GetAll_User_Api(searchParams);
            if (data.messageStatus == "Successful") {
                setPageCount(data.messageData.pageCount);
                if (pNumber == 1)
                    setUsers(data.messageData.data);
                else
                    setUsers([...users, ...data.messageData.data]);

                setLoading(false);
            }
            else {
                setLoading(false);
                toast.show(data.message, { type: "danger" });
            }
        }
        catch (error) {
            setLoading(false);
            toast.show("خطا در ارتباط با سرور.", { type: "danger" });
        }
    }
    // =================================================================
    const FlatList_Item = (item) => {
        return (
            <UserInfo user={item} navigation={props.navigation} />
        );
    }
    // =================================================================
    return (
        <View style={{ flex: 1 }} nestedScrollEnabled={true} >
            <View style={[globalStyles.row]}>
                <Text style={[globalStyles.screen_Title]}>لیست کاربران</Text>
            </View>
            <View style={[globalStyles.screenContainer]} >
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(false);
                    }}>
                    <TouchableWithoutFeedback
                        onPress={() => {
                            setModalVisible(false);
                        }}>
                        <SearchUser
                            code={code}
                            setCode={setCode}
                            name={name}
                            setName={setName}
                            family={family}
                            setFamily={setFamily}
                            isSuspend={isSuspend}
                            setIsSuspend={setIsSuspend}
                            isActive={isActive}
                            setIsActive={setIsActive}
                            driverOnly={driverOnly}
                            setDriverOnly={setDriverOnly}
                            freightageOnly={freightageOnly}
                            setFreightageOnly={setFreightageOnly}
                            carTypeId={carTypeId}
                            setCarTypeId={setCarTypeId}

                            setModalVisible={setModalVisible}
                        />
                    </TouchableWithoutFeedback>
                </Modal>
                <View style={userListStyles.usersContainer}>
                    <FlatList
                        data={users}
                        renderItem={({ item }) => FlatList_Item(item)}
                        onEndReached={() => { if (pageNumber < pageCount) setPageNumber(pageNumber + 1) }}
                        onEndReachedThreshold={.8}
                    />
                </View>
                <TouchableOpacity
                    style={globalStyles.searcButton}
                    onPress={() => setModalVisible(true)}>
                    {/* <Feather name="filter" size={30} color="white" /> */}
                    <FontAwesome name="search" size={30} color="white" />
                    {/* <Ionicons name="ios-search-circle-sharp" size={30}  color="#f47d07" /> */}
                </TouchableOpacity>
            </View>
            <Loading loading={loading} />
        </View>
    )
}