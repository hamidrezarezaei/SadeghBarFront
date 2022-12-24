import React, { useEffect, useContext, useState } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, Alert } from 'react-native'
import { Enter_Queue_Api, Exit_Queue_Api, GetItems_Queue_Api } from '../../../Api/queueApi';
import { globalStyles } from '../../../assets/Styles/GlobalStyle';
import UserContext from '../../../Context/UserContext';
import { persianStatus } from '../../../Util/QueueUtils';
import { IsAdminCurrentUser } from '../../../Util/UserUtils';
import { queueStyles } from './QueueStyle'
import { useToast } from 'react-native-toast-notifications';
import BehaviorButtons from '../BehaviorButtons/BehaviorButtons';
// =================================================================
export default function Queue({
    cargo,
    loadCargo,
    navigation,
    setLoading,
    isMyCargo,
    setRemainingTime,
    setIsMeWaitingInQueue,
    isMeInFrontOfQueue,
    setIsMeInFrontOfQueue,
}) {
    const context = useContext(UserContext);
    const toast = useToast();
    const [queueItems, setQueueItems] = useState([]);

  
    // =================================================================
    let timerId = null;
    useEffect(() => {
        setLoading(true);

        if (!cargo) return;
        loadQueueItems();
        try {
            clearInterval(timerId);
        }
        catch { }
        // console.log('interval start');

        timerId = setInterval(() => {
            loadQueueItems();
        }, 4000);
        setLoading(false);
        return () => {
            // console.log('interval clear');
            clearInterval(timerId);
        };
    }, [cargo]);
    // =================================================================
    const loadQueueItems = async () => {
        try {
        // console.log('load queue');
            if (!cargo)
                return;

            let data = await GetItems_Queue_Api(cargo.id);
            if (data.messageStatus == "Successful") {
                let qi = data.messageData.data;
                setQueueItems(qi);


                //اگر کس دیگه ای بار را گرفته است برگرد
                // البته برای غیر مدیرها
                if (!IsAdminCurrentUser(context) && isTakeByAnotherDriver(data.messageData.data)) {
                    toast.show("بار توسط راننده دیگری گرفته شد.", { type: "warning" });
                    if (navigation)
                        navigation.goBack();
                }

                if (setIsMeWaitingInQueue) {
                    setIsMeWaitingInQueue(isMeWaitingInQueue(data.messageData.data));
                }

                //اگر سر صف هستیم زمان باقی مانده را هم بگیر
                if (checkIsMeInFrontOfQueue(qi)) {
                    if(loadCargo)
                        loadCargo();
                    setRemainingTime(0);
                    var me = qi.filter(q => q.isMe && q.isFront)[0];
                    setRemainingTime(me.remainingSecond);

                    if (setIsMeInFrontOfQueue) {
                        setIsMeInFrontOfQueue(true);
                    }
                }
                else {
                    setRemainingTime(0);
                    if (setIsMeInFrontOfQueue)
                        setIsMeInFrontOfQueue(false);
                }
            }
            else {
                // toast.show(data.message + 'krr', { type: "danger" });
            }
        }
        catch {

        }
    }
    // =================================================================
    const checkIsMeInFrontOfQueue = (qi) => {
        let x = qi.filter(q => q.isMe && q.isFront);
        if (x && x.length)
            return true;
    }
    // =================================================================
    const isTakeByAnotherDriver = (qi) => {
        let x = qi.filter(q => q.status == 'Accepted' && !q.isMe);
        if (x && x.length)
            return true;
        return false;
    }

    // =================================================================
    const isMeWaitingInQueue = (qi) => {
        let x = qi.filter(q => q.isMe && q.status == 'Waiting');
        if (x && x.length)
            return true;
    }
    // =================================================================
    if (!isMeInFrontOfQueue)
        return (
            <View style={[globalStyles.boxContainer, queueStyles.boxContainer]}>
                <View style={queueStyles.headerContainer}>
                    <Text style={queueStyles.headerText}>
                        صف انتظار
                    </Text>
                </View>

                {isMyCargo ?
                    <Text style={queueStyles.forbidden}>مشاهده صف انتظار برای اعلام کننده بار امکانپذیر نمی باشد.</Text> :
                    (!queueItems || queueItems.length == 0) ? (
                        <Text style={queueStyles.queueEmpty}>
                            . . . .
                        </Text>
                    )
                        :
                        queueItems.map((item, index) => {
                            return (
                                <View key={index} style={(item.status == 'TimeOut' || item.status == 'ExitFromQueue') ? [queueStyles.row, queueStyles.disableRow] : queueStyles.row}>
                                    <Text style={(item.status == 'TimeOut' || item.status == 'ExitFromQueue') ? [queueStyles.index, queueStyles.disableText] : queueStyles.index}>{index + 1}</Text>
                                    <Text style={(item.status == 'TimeOut' || item.status == 'ExitFromQueue') ? [queueStyles.driverCode, queueStyles.disableText] : queueStyles.driverCode}>
                                        {

                                            item.isMe || IsAdminCurrentUser(context) ? (
                                                item.driverFullName
                                            ) : (
                                                "کاربر با کد " + item.driverCode
                                            )
                                        }
                                    </Text>
                                    <Text style={(item.status == 'TimeOut' || item.status == 'ExitFromQueue') ? [queueStyles.status, queueStyles.disableText] : queueStyles.status}>وضعیت : {persianStatus(item.status)}</Text>
                                </View>
                            )
                        }
                        )}
            </View>
        )
    else
        return (<></>)
}