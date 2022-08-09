import React, { useState, useEffect } from 'react'
import { Alert, Dimensions, StyleSheet, Text, View } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';
import { globalStyles } from '../../assets/Styles/GlobalStyle';
import { Get_CarType_Api } from '../../Api/carTypeApi';
import CarTypeArray from './CarTypeArray';

const calcPercent = (percent) => (Dimensions.get('window').width * percent) / 100;

export default function CarTypeCombo({ selectedValue=null,percentWidth, zIndex, placeholder, firstItem = "", onValueChange }) {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(selectedValue==0 ? null: selectedValue);
    const [items, setItems] = useState(firstItem == "" ? CarTypeArray : [{ label: firstItem, value: '0' }, ...CarTypeArray]);

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
     setValue(selectedValue==0 ? null: selectedValue);
    }, [selectedValue]);

    const loadData = async () => {
        const data = await Get_CarType_Api();
        //  console.log(data);
        try {
            if (data.messageStatus == "Successful") {
                setItems(firstItem == "" ? data.messageData.data:[{ label: firstItem, value: '0' }, ...data.messageData.data]);
            }
            else {
                // onSetLoading(false);
                // toast.error(data.message);
            }
        }
        catch (error) {
            // onSetLoading(false);
            // toast.error(error.toString());
        }
    }

    return (
        <DropDownPicker
            listMode="SCROLLVIEW"
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            showTickIcon={false}
            zIndex={zIndex}
            style={globalStyles.combo_Style}
            containerStyle={[globalStyles.combo_ContainerStyle, { width: calcPercent(percentWidth) }]}
            selectedItemContainerStyle={globalStyles.combo_SelectedItemContainerStyle}
            textStyle={globalStyles.combo_TextStyle}
            labelStyle={globalStyles.combo_LabelStyle}
            placeholder={placeholder}
            onSelectItem={(item) => {
                onValueChange(item.value);
            }}
        />

    );
}