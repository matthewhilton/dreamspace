import React from 'react';
import { View } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import {withTheme, Button, TextInput, Title } from "react-native-paper";


const NewJournalEntryForm = (props) => {
    const themeColors = props.theme.colors;
    const { control, handleSubmit, errors, formState } = useForm({
        mode: "onChange"
    });
    const onSubmit = (d) => {console.log(d)}

    console.log(errors)

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
                        mode={"flat"}
                        label={"Title"}
                        onChangeText={(value) => {props.onChange(value)}}
                        value={props.value}
                        error={errors.title}
                    />}
            />

            <Controller
                name="description"
                control={control}
                rules={{required: true}}
                defaultValue={""}
                render={(props) =>
                    <TextInput
                        mode={"flat"}
                        label={"Description"}
                        multiline={true}
                        error={errors.description}
                        onChangeText={(value) => {props.onChange(value)}}
                        value={props.value}
                    />}
            />

            <Button
                mode="contained"
                onPress={handleSubmit(onSubmit)}>
                Submit
            </Button>
        </View>
    )
}

export default withTheme(NewJournalEntryForm);
