import React from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import { globalStyles } from '../../assets/Styles/GlobalStyle';
import { queueStyles } from './QueueStyle'
// =================================================================
export default function Queue({
    queueItems = null,
    onEnterToQueue,
    onExitFromQueue,
    isMyCargo,
    navigation
}) {
    // =================================================================
    const isMeWaitingInQueue = () => {
        let x = queueItems.filter(q => q.isMe && q.status == 'Waiting');
        if (x && x.length)
            return true;
    }
    // =================================================================
    const persianStatus = (status) => {
        switch (status) {
            case 'TimeOut':
                return "بار را نمی برد";
            case 'Waiting':
                return "در حال انتظار";
            case 'WaitingByExtendTime':
                return "در حال انتظار";
            case 'Accepted':
                return "بار را می برد";
            case 'ExitFromQueue':
                return "خروج از صف";
            default:
                return status;
        }
    }
    // =================================================================
    return (
        <>
            <View style={[globalStyles.boxContainer,queueStyles.boxContainer]}>
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
                                            
                                            item.isMe ? (
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

            <View style={queueStyles.row_EnterExit}>
                {!isMyCargo ?
                    isMeWaitingInQueue() ?
                        (
                            <TouchableOpacity
                                style={[globalStyles.dangerButton, queueStyles.exitButton]}
                                onPress={onExitFromQueue}>
                                <Text style={globalStyles.dangerButton_Text}>خروج از صف</Text>
                            </TouchableOpacity>) :
                        (
                            <TouchableOpacity
                                style={[globalStyles.submitButton, queueStyles.enterButton]}
                                onPress={onEnterToQueue}>
                                <Text style={globalStyles.submitButton_Text}>ورود به صف</Text>
                            </TouchableOpacity>
                        ) : (<></>)}
                <TouchableOpacity
                    style={[globalStyles.secondaryButton, queueStyles.returnButton]}
                    onPress={() => navigation.goBack()}>
                    <Text style={globalStyles.secondaryButton_Text}>بازگشت</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}