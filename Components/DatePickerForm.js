import React, {useState} from "react"
import { View } from "react-native"
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {Button, Text} from "react-native-paper";

const DatePickerForm = (props) => {
    const [visible, setVisible] = useState(false)
    const dateObj = new Date(props.date)

    return(
        <View style={{flex: 1, flexDirection: "row", alignContent: "center", marginVertical: 5}}>
  
            <View style={{flex: 1, justifyContent: "center"}}>
                <Button onPress={() => setVisible(true)} mode={"outlined"} style={{padding: 5}}> {dateObj.toDateString()} </Button>
            </View>

            <DateTimePickerModal
            isVisible={visible}
            mode={"date"}
            onCancel={() => setVisible(false)}
            onConfirm={(dateObj) => {
                props.onChange(dateObj.toString())
                setVisible(false)
            }}
            date={dateObj}
            />
        </View>
    )
}

export default DatePickerForm;