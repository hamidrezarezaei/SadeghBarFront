import { FlatList, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { globalStyles } from '../../assets/Styles/GlobalStyle'
import { userLogStyles } from './UserLogStyle'
import { useToast } from "react-native-toast-notifications";
import Loading from '../../Component/Loading/Loading';
import { Logs_User_Api } from "../../Api/userApi";
// =================================================================
export default function UserLog({ userId }) {
    const [loading, setLoading] = useState(false);
    const [userLogs, setUserLogs] = useState([]);
    const toast = useToast();
    // =================================================================
    useEffect(() => {
        loadData();
    }, []);
    // =================================================================
    const loadData = async () => {
        try {
            setLoading(true);

            let data = await Logs_User_Api(userId);

            if (data.messageStatus == "Successful") {
                setUserLogs(data.messageData.data);
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

    return (
        <View style={[globalStyles.boxContainer, userLogStyles.boxContainer]}>
            <View style={userLogStyles.headerContainer}>
                <Text style={userLogStyles.headerText}>
                    تاریخچه کاربر
                </Text>

            </View>
            <View style={userLogStyles.logsContainer}>
                {
                    userLogs?.length > 0 ?
                        userLogs.map((item, index) =>
                            <View key={index} style={[userLogStyles.logRecord]}>
                                <View style={[globalStyles.row, userLogStyles.logRow]}>
                                    <Text style={[globalStyles.field_Title, userLogStyles.textStyle]}>تاریخ </Text>
                                    <Text style={[globalStyles.field_Title, userLogStyles.textStyle]}>{item.dateShamsi}</Text>
                                </View>
                                <View style={[globalStyles.row, userLogStyles.logRow]}>
                                    <Text style={[globalStyles.field_Value, userLogStyles.textStyle]}>{item.comment}</Text>
                                </View>
                            </View>
                        ) :
                        <Text style={[globalStyles.field_Title, userLogStyles.textStyle,{textAlign:'center',marginVertical:5}]}>رکوردی جهت نمایش وجود ندارد. </Text>
                }
            </View>
            <Loading loading={loading} />
        </View>
    )
}
