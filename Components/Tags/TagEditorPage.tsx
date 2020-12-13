import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';
import useTags from "../../Hooks/UseTags"
import { Button, IconButton, List, Text, TextInput, useTheme } from 'react-native-paper';
import RBSheet from "react-native-raw-bottom-sheet";
import ColorPickerForm from "../Controls/ColorPickerForm";
import PlanetPickerForm from '../Controls/PlanetPickerForm';
import TagPreview from './TagPreview';
var Color = require('color');

interface Props {
    route: {
        params: {
            mode: "new" | "edit"
            tagUUID?: number
        }
    }
    navigation: any
}

const TagEditorPage: React.FC<Props> = ({route, navigation}) => {
    const { mode } = route.params;
    const { tags, createTag, editTag } = useTags();

    const theme = useTheme()

    const colorPickerSheetRef = React.useRef();
    const planetPickerSheetRef = React.useRef();

    const { control, handleSubmit, errors, formState, watch, reset} = useForm({
        mode: "all",
        shouldUnregister: false
    });

    useEffect(() => {
        navigation.setOptions({
            title: mode == "new" ? "Create New Tag" : "Edit Tag",
        })

        if(mode == "edit"){
            // Prefill the form data with the data from the given tag tagUUID
            const tagEditUUID = route.params.tagUUID;
            const prefillData = tags.find((tag) => tag.uuid === tagEditUUID)
            reset({
                color: prefillData.color,
                name: prefillData.name,
                planetNumber: prefillData.planet.icon,
            })
        }
    }, [mode])

    const onSubmit = (data) => {
        if(mode == "new"){
            createTag(data.name, data.color, data.planetNumber)
            navigation.goBack();
            // TODO success notification
        } else if(mode == "edit"){
            editTag(route.params.tagUUID, data.name, data.color, data.planetNumber)
            navigation.goBack();
        }
        // TODO edit mode 
    }

    const onError = (error) => {
        // TODO alert user
        console.error("Error saving tag data: ", error)
    }
    return (
        <View>
            <List.Section>
                <List.Subheader>Preview</List.Subheader>
                <View style={{marginHorizontal: 15}}>
                    <TagPreview 
                    name={watch("name", "Tag Name")} 
                    color={watch("color", "#FFFFFF")} 
                    planetNumber={watch("planetNumber", 0)} />
                </View>
                <RBSheet 
                ref={colorPickerSheetRef} 
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

                <RBSheet
                ref={planetPickerSheetRef} 
                closeOnDragDown={true} 
                animationType="fade" openDuration={200}
                customStyles={{
                    container: {
                        backgroundColor: theme.colors.background,
                        borderRadius: 10
                    }
                }}
                height={500}>
                    <Controller
                    name="planetNumber"
                    control={control}
                    defaultValue={0}
                    render={({value, onChange}) => (
                        <View>
                            <PlanetPickerForm value={value} onChange={onChange} />
                        </View>
                    )} />
                </RBSheet>

                <List.Subheader> Edit Properties </List.Subheader>
                
                <View
                style={{marginHorizontal: 15}}>
                    <Controller 
                        name="name"
                        control={control}
                        defaultValue={null}
                        rules={{required: true}}
                        render={({value, onChange}) => <TextInput mode="outlined" label="Tag Name" value={value} onChangeText={onChange}  />}
                        />
                    
                        <Button 
                        mode={"contained"} 
                        onPress={() => colorPickerSheetRef.current.open()}
                        style={{marginVertical:15}}
                        >
                            Select Color
                        </Button>

                        <Button 
                        mode={"contained"} 
                        onPress={() => planetPickerSheetRef.current.open()}
                        style={{marginVertical:15}}
                        >
                            Select Planet Icon
                        </Button>
                </View>
            </List.Section>

            <Button onPress={handleSubmit(onSubmit, onError)} disabled={!formState.isValid}> Save </Button>
        </View>
    )
}

export default TagEditorPage
