import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { countDownStyles } from './CountDownStyle';

export default function CountDown({ 
    remainingTime,
    onEnd
 }) {
    const [time, setTime] = useState(remainingTime);
    const timerRef = React.useRef(time);
    // =================================================================

    useEffect(() => {
        const timerId = setInterval(() => {
            timerRef.current -= 1;
            if (timerRef.current < 0) {
                clearInterval(timerId);
                onEnd();
            } else {
                setTime(timerRef.current);
            }
        }, 1000);
        return () => {
            clearInterval(timerId);
        };
    }, []);
    // =================================================================
    return (
        <View style={countDownStyles.container}>
            <Text style={countDownStyles.title}>
                مدت زمان باقیمانده شما
            </Text>
            <Text style={countDownStyles.minute}>
                {Math.floor(time % 60).toString().padStart(2,'0')}
            </Text >
            <Text style={countDownStyles.separator}>
                :
            </Text>
            <Text style={countDownStyles.second}>
                {Math.floor(time / 60).toString().padStart(2,'0')}
            </Text>

        </View>
    )
}

const styles = StyleSheet.create({})