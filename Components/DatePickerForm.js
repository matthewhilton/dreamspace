import React, {useState} from "react"
import { View } from "react-native"
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {Button, Text} from "react-native-paper";

const DatePickerForm = (props) => {
    const [visible, setVisible] = useState(false)
    return(
        <View style={{flex: 1, flexDirection: "row", alignContent: "center"}}>
            <View style={{flex: 1, justifyContent: "center"}}>
                <Text> Date </Text>
            </View>

            <View style={{flex: 2, justifyContent: "center"}}>
            <Button onPress={() => setVisible(true)} mode={"outlined"}> {props.date.toDateString()} </Button>
            </View>
            <DateTimePickerModal
            isVisible={visible}
            mode={"date"}

            onCancel={() => setVisible(false)}
            onConfirm={(date) => {
                props.onChange(date)
                setVisible(false)
            }}
            date={props.date}
            />
        </View>
    )
}

export default DatePickerForm;