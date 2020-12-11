import React from 'react';
import { ScrollView, View, TouchableOpacity } from 'react-native';
import { FAB, Text, useTheme } from "react-native-paper";
import useTags from "../../Hooks/UseTags";
import HeaderWithNav from '../Controls/HeaderWithNav';
import usePlanets from "../../Hooks/UsePlanets"
import Icon from 'react-native-vector-icons/FontAwesome5';
import TagEditorPage from '../Tags/TagEditorPage';
var Color = require('color');

const TagListPage = ({navigation}) => {
    const { tags, createTag } = useTags();

    // Sort by most used first
    tags.sort((a, b) => {
        return b.used-a.used;
    })

    return (
        <View style={{margin: 6, height: "100%"}}>
            <HeaderWithNav title={"Tags"} />
         
            <ScrollView style={{marginHorizontal: 10}}>
                {tags.map(tag => (
                    <TagListItem tag={tag} key={tag.uuid} onPress={() => {
                        navigation.navigate("Tags", { screen: 'TagDetailView', params: { tagUUID: tag.uuid}})
                    }} />
                ))}
            </ScrollView>
            
            <FAB
                icon="plus"
                onPress={() => navigation.navigate("Tags", { screen: 'TagEditor', params: { mode: "new"}})}
                style={{
                    position: 'absolute',
                    right: 20, 
                    bottom: 70,
                }}
            />
        </View>
    )
}

const TagListItem = ({tag, onPress=function(){}}) => {
    const {getPlanetIcon} = usePlanets();
    const theme = useTheme();
    return(
        <TouchableOpacity onPress={onPress}>
            <View style={{
                flexDirection: "row", 
                alignItems: "center", 
                marginVertical: 8, 
                justifyContent: "space-between", 
                borderRadius: 8, 
                backgroundColor: Color(theme.colors.background).lighten(0.6).hex()
                }}>
                <View style={{
                    flexDirection: "row", 
                    alignItems: "center", 
                    padding: 8,
                    }}>
                    <Text style={{
                        fontSize: 18,
                        fontWeight: "bold"
                        }}> {tag.name} </Text>
                    <Icon name="tag" solid style={{color: tag.color}}/>
                </View>
                
                <View style={{width: 60, height: 60, backgroundColor: tag.color, padding: 5, borderRadius: 8}}>
                    {getPlanetIcon(tag.planet.icon)}
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default TagListPage
