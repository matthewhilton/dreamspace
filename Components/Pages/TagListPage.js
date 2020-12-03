import React from 'react'
import { View, ScrollView } from 'react-native'
import BigButton from '../Controls/BigButton'
import HeaderWithNav from '../Controls/HeaderWithNav'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Text, Title, useTheme} from "react-native-paper"

const TagListPage = () => {
    const theme = useTheme();
    return (
        <View style={{margin: 6}}>
            <HeaderWithNav title={"Tags"} />

            <View style={{marginTop: 20}}>
                <Text style={{marginLeft: 10, color: theme.colors.subtext}}>What would you like to do ? </Text>
                <View style={{flexDirection: 'row', marginLeft: 10, marginTop: 10}}>
                    <TagListButton iconName="plus-square" text="Add" color="#77e084"/>
                    <TagListButton iconName="edit" text="Edit" color="#6bede7"/>
                    <TagListButton iconName="trash-alt" text="Delete" color="#e07272"/>
                </View>
            </View>

            <ScrollView>

            </ScrollView>
        </View>
    )
}

const TagListButton = ({iconName="edit", text="", ...props}) => {
    const theme = useTheme();
    return(
        <View style={{marginRight: 10}}>
            <BigButton {...props}> 
                <Icon name={iconName} size={20}/>
                <Text style={{
                    color: theme.colors.backgroundColor,
                    fontWeight: 'bold',
                    fontSize: 17
                }}> {text} </Text>
            </BigButton>
        </View>
    )
}

export default TagListPage
