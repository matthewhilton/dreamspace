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
        <View style={{height: height, width: "100%", backgroundColor: theme.colors.journalFormBackground || "black", flexDirection: "column", borderRadius: 20, padding: 5}}>
            <View style={{flexDirection: 'row', justifyContent: "flex-end"}}>
                <IconButton onPress={onClose} icon="close" />
            </View>
            
            <View style={{flexDirection: 'row'}}>
                <View style={{flexDirection: 'column', height: 100, width: 100, marginRight: 10}}>{planet.icon}</View>

                <View style={{flexDirection: 'column', flex: 2, justifyContent: 'space-between'}} >
                    <Title style={{fontWeight: 'bold', fontSize: 25}} numberOfLines={1}>{planet.tag}</Title>
                    <Text>{tagData.used} dreams</Text> 
                    <Button mode="contained" onPress={onView}> View </Button>
                </View>
            </View>
        </View>
    );
}

export default withTheme(PlanetSummaryBottomForm);