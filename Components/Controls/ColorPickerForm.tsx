import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import HsvColorPicker from 'react-native-hsv-color-picker';
var convert = require('color-convert');

interface Props {
    value: string,
    onChange: Function,
}

const ColorPickerForm:React.FC<Props> = ({value, onChange}) => {
    const [pickerVal, setPickerVal] = useState({
        h: 0,
        s: 0,
        v: 1
    })

    const [selectedVal, setSelectedVal] = useState({
        h: 0,
        s: 0,
        v: 1
    })

    const onSatValPickerChange = ({ saturation, value }) => {
        let {...newVal} = selectedVal;
        newVal.v = value;
        newVal.s = saturation;
        setSelectedVal(newVal)
    }
    
    const onHuePickerChange = ({ hue }) => {
        let {...newVal} = selectedVal;
        newVal.h = hue;
        setSelectedVal(newVal)
    }

    useEffect(() => {
        // Update the controller (convert hsv to hex)
        const hexVal = convert.hsv.hex(selectedVal.h, selectedVal.s*100, selectedVal.v*100);
        onChange("#"+hexVal);
    }, [selectedVal]);

    useEffect(() => {
        // Convert the hex color to hsv
        const hsvColor = convert.hex.hsv(value)
        setPickerVal({
            h: hsvColor[0],
            s: hsvColor[1]/100,
            v: hsvColor[2]/100
        })
    }, [value])

    return (
        <View>
            <HsvColorPicker 
            satValPickerSize={250}
            huePickerBarHeight={250}
               huePickerHue={pickerVal.h}
               onHuePickerDragMove={onHuePickerChange}
               onHuePickerPress={onHuePickerChange}
               satValPickerHue={pickerVal.h}
               satValPickerSaturation={pickerVal.s}
               satValPickerValue={pickerVal.v}
               onSatValPickerDragMove={onSatValPickerChange}
               onSatValPickerPress={onSatValPickerChange}
               huePickerBorderRadius={5}
               satValPickerBorderRadius={5}
               huePickerBarWidth={30}
            />  
        </View>
    )
}

export default ColorPickerForm
