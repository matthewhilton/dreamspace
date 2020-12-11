import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { Button, List, Text, TextInput, useTheme } from 'react-native-paper';
import RBSheet from "react-native-raw-bottom-sheet";
import ColorPickerForm from "../Controls/ColorPickerForm";
import TagPreview from './TagPreview';
var Color = require('color');

interface Props {
    route: {
        params: {
            mode: "new" | "edit"
        }
    }
    navigation: any
}

const TagEditorPage: React.FC<Props> = ({route, navigation}) => {
    const { mode } = route.params;

    const theme = useTheme()

    const sheetRef = React.useRef();

    const { control, handleSubmit, errors, formState, watch, reset} = useForm({
        mode: "all",
        shouldUnregister: false
    });

    useEffect(() => {
        navigation.setOptions({
            title: mode == "new" ? "Create New Tag" : "Edit Tag"
        })
    }, [mode])

    return (
        <View>
            <List.Section>
                <List.Subheader>Preview</List.Subheader>
                <View style={{marginHorizontal: 15}}>
                    <TagPreview 
                    name={watch("name", "Tag Name")} 
                    color={watch("color", "#FFFFFF")} 
                    planetNumber={1} />
                </View>
                <RBSheet 
                ref={sheetRef} 
                closeOnDragDown={true} 
                animationType="fade" openDuration={200}
                customStyles={{
                    container: {
                        backgroundColor: theme.colors.background,
                        borderRadius: 10
                    }
                }}
                height={500}
                >
                    <View>                    
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
                                                color: Color(value).darken(0.85).hex(),
                                                fontSize: 25
                                                }}> {value}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                                } />
                        </View>
                    </View>
                </RBSheet>

                <List.Subheader> Edit Properties </List.Subheader>
                
                <View
                style={{marginHorizontal: 15}}>
                    <Controller 
                        name="name"
                        control={control}
                        defaultValue=""
                        render={({value, onChange}) => <TextInput mode="outlined" label="Tag Name" value={value} onChangeText={onChange}  />}
                        />
                    
                    <Button 
                    mode={"contained"} 
                    onPress={() => sheetRef.current.open()}
                    style={{marginVertical:15}}
                    >Select Color</Button>
                </View>
            </List.Section>
        </View>
    )
}

export default TagEditorPage
