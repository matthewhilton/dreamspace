import React, { useState} from 'react';
import { View, ScrollView, Image} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import {withTheme, Button, TextInput, Title, Text} from "react-native-paper";
import Slider from '@react-native-community/slider';
import * as Haptics from 'expo-haptics';
import DrawingCanvas from "./DrawingCanvas";
import DrawingPreview from "./DrawingPreview";
import HorizontalGallery from "./HorizontalGallery";
import {useActionSheet} from "@expo/react-native-action-sheet";
import 'react-native-get-random-values';
import uuid from 'uuid';
import DrawingForm from "./DrawingForm";

const NewJournalEntryForm = (props) => {
    const themeColors = props.theme.colors;
    const { control, handleSubmit, errors , getValues, setValue} = useForm({
        mode: "onChange"
    });
    const [drawingOpen, setDrawingOpen] = useState(false)
    const [drawings, setDrawings] = useState([])
    const onSubmit = data => console.log(data);



    console.log("rerendered!");

    return(
        <View style={{flex: 1, flexDirection: 'column', margin: 10}}>
            <ScrollView

            canCancelContentTouches={!drawingOpen}
            showsVerticalScrollIndicator={false}>
            <Title style={{fontSize: 30, fontWeight: 'bold'}}>
                New Entry
            </Title>
            <Controller
                name="title"
                control={control}
                rules={{required: true}}
                defaultValue={""}
                render={(props) =>
                    <TextInput
                        {...props}
                        mode={"outlined"}
                        label={"Title"}
                        onChangeText={(value) => {props.onChange(value)}}
                        value={props.value}
                        error={errors.title}
                    />}
            />


            <Controller
                name="description"
                control={control}
                defaultValue={""}
                render={(props) =>
                    <TextInput
                        {...props}
                        mode={"outlined"}
                        label={"Description"}
                        multiline={true}
                        error={errors.description}
                        onChangeText={(value) => {props.onChange(value)}}
                        value={props.value}
                    />}
            />

            <Controller
                name="dreamRating"
                control={control}
                rules={{required: true}}
                defaultValue={5}
                render={(props) =>
                    <View style={{flex: 1}}>
                        <View style={{flex: 1, flexDirection: 'row', alignContent: "center"}}>
                           <Slider
                               {...props}
                               minimumValue={1}
                               maximumValue={10}
                               step={1}
                               style={{flex: 1}}
                               onValueChange={(value) => {
                                   Haptics.selectionAsync()
                                   props.onChange(value)
                               }}
                               value={props.value}
                               thumbTintColor={themeColors.text}
                               minimumTrackTintColor={themeColors.primary}
                           />
                           <Text style={{padding: 13}}> {props.value} </Text>
                        </View>
                    </View>
                }
            />

            <Controller
                name={"drawings"}
                control={control}
                defaultValue={[]}
                render={(props) => (
                    <DrawingForm
                        onChange={(data) => props.onChange(data)}
                        onOpenChange={(val) => setDrawingOpen(val)}
                    />
                )}
                />




            <Button
                type={"submit"}
                mode="contained"
                onPress={handleSubmit(onSubmit)}>
                Submit
            </Button>

            </ScrollView>
        </View>
    )
}

export default withTheme(NewJournalEntryForm);
