import React, { useEffect, useState } from 'react'
import { Alert, Dimensions, StyleSheet, Text, View } from 'react-native'
import { globalStyles } from '../../assets/Styles/GlobalStyle';
import DropDownPicker from 'react-native-dropdown-picker';
import StateArray from './StateArray';

const calcPercent = (percent) => (Dimensions.get('window').width * percent) / 100;

export default function StateCombo({selectedValue=null, percentWidth, zIndex, placeholder, firstItem = "", onValueChange }) {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(selectedValue==0 ? null: selectedValue);
    const items = firstItem == "" ? StateArray : [{ label: firstItem, value: '0' }, ...StateArray];
  // =================================================================
    useEffect(() => {
        setValue(selectedValue==0 ? null: selectedValue);
       }, [selectedValue]);
  // =================================================================
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