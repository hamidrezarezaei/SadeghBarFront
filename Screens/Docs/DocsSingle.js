import React, { useState, useEffect, useRef } from 'react';
import { Text, View, TouchableOpacity, Image, Modal, TouchableWithoutFeedback, ImageBackground } from 'react-native';
import { UploadDocs_Api } from '../../Api/DocsApi';
import CameraScreen from './CameraScreen';
import { useToast } from "react-native-toast-notifications";
import { ResizeImage } from '../../Util/ImageUtils';
import * as ImagePicker from 'expo-image-picker';
import { docsSingleStyles } from './DocsSingleStyle';
import { globalStyles } from '../../assets/Styles/GlobalStyle';


export default function DocsSingle({ userId, docName, imgUri, resetImages, title, setLoading }) {
    const [cameraVisible, setCameraVisible] = useState(false);
    const toast = useToast();

    // =================================================================
    photoTaked = async (photo) => {
        try {
            setLoading(true);
            let manipResult = await ResizeImage(photo);
            let data = await UploadDocs_Api(userId, docName, manipResult.uri);
            if (data.messageStatus == "Successful") {
                setLoading(false);
                toast.show(data.message, { type: "success" });
            }
            else {
                setLoading(false);
                toast.show(data.message, { type: "danger" });
            }
            resetImages();
        }
        catch (error) {
            setLoading(false);
            toast.show(error.toString(), { type: "danger" });
        }
    }
    // =================================================================
    const selectImage = async () => {

        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: false,
            // aspect: [4, 3],
            quality: 1,
        });

        if (result.cancelled) {
            return;
        }

        let data = await UploadDocs_Api(userId, docName, result.uri);
        if (data.messageStatus == "Successful") {
            toast.show(data.message, { type: "success" });
        }

        resetImages();
    }
    // =================================================================

    return (
        <>
            <Modal
                animationType="fade"
                transparent={true}
                visible={cameraVisible}
                onRequestClose={() => {
                    setCameraVisible(false);
                }}>
                <CameraScreen
                    onPhotoTaked={photoTaked}
                    setCameraVisible={setCameraVisible}
                />
            </Modal>
            <View style={[globalStyles.row]}>
                <View >
                    <View style={[globalStyles.boxContainer, docsSingleStyles.container]}>
                        <Text style={[docsSingleStyles.title]}>{title}</Text>
                        <ImageBackground source={{ uri: "https://docs.sadeghbar.com/Image/default.png" }} resizeMode="cover" >
                            <Image
                                style={docsSingleStyles.image}
                                source={{ uri: imgUri }}
                            />
                        </ImageBackground>

                        <TouchableOpacity
                            style={[globalStyles.submitButton, docsSingleStyles.takeImageButton]}

                            onPress={() => { setCameraVisible(true) }}
                        >
                            <Text style={globalStyles.submitButton_Text}>گرفتن عکس با دوربین گوشی</Text>
                        </TouchableOpacity>


                        <TouchableOpacity
                            style={[globalStyles.submitButton, docsSingleStyles.selectImageButton]}
                            onPress={selectImage}
                        >
                            <Text style={globalStyles.submitButton_Text}>انتخاب از گالری</Text>
                        </TouchableOpacity>

                    </View>
                </View>

            </View>

        </>

    )
}
