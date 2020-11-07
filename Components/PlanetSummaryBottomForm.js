import React, {useState, useEffect} from 'react'
import { View } from 'react-native'
import { Title, withTheme, Text, IconButton, Button} from 'react-native-paper'
import { useSelector } from 'react-redux';

const PlanetSummaryBottomForm = ({planet={}, height=200, onClose=function(){},onView=function(){}, theme}) => {
    const [tagData, setTagData] = useState({})
    if(planet == null) planet = {}

    const allTags = useSelector(state => state.tags)
    
    useEffect(() => {
        if(planet != null){

            for(const tag of allTags){
                if(tag.name === planet.tag){
                    setTagData(tag)
                    break;
                }
            }
        }
    }, [planet, allTags])

    return(
        <View style={{height: height, width: "100%", backgroundColor: theme.colors.journalFormBackground || "black", flexDirection: "column"}}>
            
            <View style={{flexDirection: 'row', justifyContent: "flex-end"}}>
                <IconButton onPress={onClose} style={{alignSelf: 'flex-end'}} icon="close" />
            </View>
            
            <View style={{flexDirection: 'row', flex: 1, marginBottom: 30, marginLeft: 10, marginRight: 10}}>
                <View style={{flex: 1, marginRight: 10}}>
                    {planet.icon}
                </View>

                <View style={{flex: 2.5, flexDirection: 'column', justifyContent:"space-between"}}>
                    <View style={{flexDirection: "column"}}>
                        <Title style={{fontWeight: 'bold', fontSize: 30}}> {planet.tag} </Title>
                        <Text style={{marginLeft: 5}}> {tagData.used} dreams </Text> 
                    </View>
                    {
                        // TODO some more data here like recently used etc maybe?
                    }
                    <Button mode="outlined" style={{marginBottom: 10}} onPress={onView}> View </Button>
                </View>
            </View> 
        </View>
    );
}

export default withTheme(PlanetSummaryBottomForm);