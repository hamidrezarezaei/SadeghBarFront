import React, { useState, useEffect, useRef } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import { cameraScreenStyles } from './CameraScreenStyle';
import { AntDesign } from '@expo/vector-icons';
import Loading from '../../Component/Loading/Loading';

export default function CameraScreen({ onPhotoTaked, setCameraVisible }) {

    const [hasPermission, setHasPermission] = useState(null);
    const [loading, setLoading] = useState(false);

    const ref = useRef(null)

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    takePhoto = async () => {
        setLoading(true);
        const photo = await ref.current.takePictureAsync({ quality: 0.6 });
        setLoading(false);
        setCameraVisible(false);
        onPhotoTaked(photo);
    }


    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={[cameraScreenStyles.container]}>
            <Camera style={[cameraScreenStyles.camera]} type={Camera.Constants.Type.back} ref={ref}>
                <View
                    style={{
                        flex: 1,
                        backgroundColor: 'transparent',
                        flexDirection: 'row',
                    }}>
                    <TouchableOpacity
                        onPress={takePhoto}
                    >
                        <AntDesign style={cameraScreenStyles.takePhotoButton} name="camera" size={40} color="#333" />
                    </TouchableOpacity>
                </View>
            </Camera>
            {loading ?
                <View style={cameraScreenStyles.whiteScreen} >
                </View> : <></>
            }

            <Loading loading={loading} />

        </View>
    )
}
