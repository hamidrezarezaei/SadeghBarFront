import React, { useEffect, useState } from 'react'
import { Alert, Dimensions, Keyboard, StyleSheet, Text, View } from 'react-native'
import { globalStyles } from '../../../assets/Styles/GlobalStyle';
import DropDownPicker from 'react-native-dropdown-picker';
import CharArray from './CharArray';

const calcPercent = (percent) => (Dimensions.get('window').width * percent) / 100;

export default function CharCombo({selectedValue='الف', percentWidth, zIndex, placeholder, firstItem = "", onValueChange }) {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(selectedValue==0 ? null: selectedValue);
    const items = firstItem == "" ? CharArray : [{ label: firstItem, value: '0' }, ...CharArray];
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
            showArrowIcon={false}
            zIndex={zIndex}
            style={[globalStyles.combo_Style]}
            containerStyle={[globalStyles.combo_ContainerStyle, { width: calcPercent(percentWidth),alignItems:'center'} ]}
            selectedItemContainerStyle={globalStyles.combo_SelectedItemContainerStyle}
            textStyle={[globalStyles.combo_TextStyle,{textAlign:'center'}]}
            labelStyle={[globalStyles.combo_LabelStyle]}
            placeholder={""}
            onSelectItem={(item) => {
                onValueChange(item.value);
            }}
            onPress={()=>Keyboard.dismiss()}
        />
    );
}