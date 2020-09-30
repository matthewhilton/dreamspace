import React from 'react';
import { View } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import {withTheme, Button, TextInput, Title, Text} from "react-native-paper";
import Slider from '@react-native-community/slider';
import * as Haptics from 'expo-haptics';
import { PIXI } from 'expo-pixi';
import DrawingCanvas from "./DrawingCanvas";

const NewJournalEntryForm = (props) => {
    const themeColors = props.theme.colors;
    const { control, handleSubmit, errors, formState } = useForm({
        mode: "onChange"
    });
    const onSubmit = data => console.log(data);

    return(
        <View style={{flex: 1, flexDirection: 'column', margin: 10}}>

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

            <View style={{ height: 200}}>
                <DrawingCanvas />
            </View>

            <Button
                type={"submit"}
                mode="contained"
                onPress={handleSubmit(onSubmit)}>
                Submit
            </Button>

            <View style={{flex: 5}}/>
        </View>
    )
}

export default withTheme(NewJournalEntryForm);
