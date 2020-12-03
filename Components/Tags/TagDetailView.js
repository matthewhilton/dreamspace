import React from 'react'
import {Text, View} from 'react-native'
import {useSelector} from "react-redux"

const TagDetailView = ({route, navigation}) => {
    const tagUUID = route.params.tagUUID;
    if(tagUUID == undefined) {
        // TODO show error message and navigate away
        console.error("No Tag UUID given. Navigation error likely.")
    }

    const tagData = useSelector(state => state.tags.find((tag) => tag.uuid == tagUUID))
    console.log(tagData)
    return (
        <View>
            <Text></Text>
        </View>
    )
}

export default TagDetailView
