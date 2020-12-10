import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { Button, List, Text, TextInput, useTheme } from 'react-native-paper';
import RBSheet from "react-native-raw-bottom-sheet";
import ColorPickerForm from "../Controls/ColorPickerForm";
var Color = require('color');

interface Props {
    route: {
        params: {
            mode: "new" | "edit"
        }
    }
}

const TagEditorPage: React.FC<Props> = ({route}) => {
    const { mode } = route.params;

    const theme = useTheme()

    const sheetRef = React.useRef();

    const { control, handleSubmit, errors, formState, getValues, reset} = useForm({
        mode: "all",
        shouldUnregister: false
    });

    return (
        <View>
            <List.Section>
                <List.Subheader>Information</List.Subheader>
                <TextInput mode="outlined" label="Tag Name" />
                
                <Button mode={"contained"} onPress={() => sheetRef.current.open()}>Color</Button>

                <RBSheet 
                ref={sheetRef} 
                closeOnDragDown={true} 
                animationType="fade" openDuration={200}
                customStyles={{
                    container: {
                        backgroundColor: theme.colors.background
                    }
                }}
                height={600}
                >
                    <View style={{marginBottom: 20, padding: 30}}>
                        <Controller
                            name="color"
                            control={control}
                            defaultValue="#000000"
                        render={({value, onChange}) => 
                            <View style={{alignItems: 'center', justifyContent: 'space-between', height: "100%"}}>
                                <View>
                                    <ColorPickerForm value={value} onChange={onChange} /> 
                                    <View 
                                        style={{
                                            backgroundColor: value,
                                            borderRadius: 5,
                                            padding: 10,
                                            alignItems: "center",
                                            justifyContent: "center"
                                        }}>
                                        <Text style={{
                                            fontWeight: "bold",
                                            color: Color(value).darken(0.7).hex()
                                            }}> {value}
                                        </Text>
                                    </View>
                                </View>
                                <Button style={{padding: 10, width: "100%"}} labelStyle={{fontWeight:"bold"}} mode="contained">Select Color</Button>
                            </View>
                            } />
                    </View>
                </RBSheet>

                <List.Subheader> Preview </List.Subheader>
            </List.Section>
        </View>
    )
}

export default TagEditorPage
