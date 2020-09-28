import React from 'react';
import { View } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import {withTheme, Button, TextInput, Title } from "react-native-paper";
import Slider from '@react-native-community/slider';
import * as Haptics from 'expo-haptics';

const NewJournalEntryForm = (props) => {
    const themeColors = props.theme.colors;
    const { control, handleSubmit, errors, formState } = useForm({
        mode: "onChange"
    });
    const onSubmit = data => console.log(data);

    return(
        <View>

            <Title>
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
                   <Slider
                       {...props}
                       minimumValue={1}
                       maximumValue={10}
                       step={1}
                       onValueChange={(value) => {
                           Haptics.selectionAsync()
                           props.onChange(value)
                       }}
                       value={props.value}
                       thumbTintColor={themeColors.text}
                       minimumTrackTintColor={themeColors.primary}
                   />}
            />

            <Button
                type={"submit"}
                mode="contained"
                onPress={handleSubmit(onSubmit)}>
                Submit
            </Button>
        </View>
    )
}

export default withTheme(NewJournalEntryForm);
