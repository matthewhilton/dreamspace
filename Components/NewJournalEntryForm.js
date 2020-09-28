import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import {withTheme, Button, TextInput} from "react-native-paper";

const NewJournalEntryForm = (props) => {
    const themeColors = props.theme.colors;
    const { control, handleSubmit, errors } = useForm();
    const onSubmit = (d) => {console.log(d)}

    console.log(errors)

    return(
        <View>
            <View style={styles.container}>
                <Text style={{color: "white"}}> Title </Text>
                <Controller
                    name="title"
                    control={control}
                    rules={{required: true}}
                    render={(props) =>
                        <TextInput {...props}
                                   onChangeText={(value) => {props.onChange(value)}}

                        />
                    }
                />
            </View>

            <Button color={themeColors.buttonAccent} dark mode="contained" onPress={handleSubmit(onSubmit)}> Submit </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        color: "white",
    },

    button: {

    }
})

export default withTheme(NewJournalEntryForm);
