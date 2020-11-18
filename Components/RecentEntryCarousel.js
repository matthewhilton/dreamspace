import React, { useEffect, useRef} from 'react'
import { View, Dimensions, TouchableOpacity, Animated} from 'react-native'
import {withTheme, Text} from "react-native-paper"
import HorizontalGallery from "./HorizontalGallery"
import Icon from 'react-native-vector-icons/FontAwesome5';
import days from "../Functions/dayNames"

const RecentEntryCarousel = ({entries, theme, onPress=function(){}, itemHeight=400, shouldAnimate=false}) => {
    const maxRecentEntries = 5;

    const data = [...entries]
    const filteredEntries = data.sort((a,b) => {
        return new Date(b.date) - new Date(a.date);
    }).filter((item, i) => {
        if(i < maxRecentEntries){
            return item;
        }
    })

    return (
        entries.length > 0 ? 
      
            <View style={{marginLeft: 10}}>         
                <HorizontalGallery
                autoScrollToEnd={false}>
                    {filteredEntries.map((entry, i) => (
                        <JournalCarouselItem entry={entry} theme={theme} key={entry.uuid} itemHeight={itemHeight} onPress={() => onPress(entry)}/>
                    ))}
                </HorizontalGallery> 
            </View>
     
        : null
    )
}

const JournalCarouselItem = ({entry, theme, onPress=function(){}, itemHeight, ...props}) => {
    return(
        
        <TouchableOpacity onPress={onPress}>
            <View style={{
                height: itemHeight,
                backgroundColor: theme.colors.journalCarouselItem,
                marginRight: 10, 
                width: Dimensions.get("screen").width*0.3,
                padding: 10, 
                borderRadius: 5,
                flexDirection: "column", 
                justifyContent: "space-between",
                }}>
                
                <View style={{flexDirection: "row"}}>
                

                    {entry.drawings.length > 0 ? 
                        <Icon 
                            name={"file-image"} 
                            color={theme.colors.subtext} 
                            style={{marginLeft: 10}}
                            size={17}
                            />: null
                    }
                    {entry.audioRecordings.length > 0 ? 
                        <Icon 
                            name={"file-audio"} 
                            color={theme.colors.subtext} 
                            style={{marginLeft: 10}}
                            size={17}
                            />: null
                    } 
                    {entry.description !== "" ? 
                        <Icon 
                            name={"file-alt"} 
                            color={theme.colors.subtext} 
                            style={{marginLeft: 10}}
                            size={17}
                            />: null
                    } 
                </View>
                
                <View>
                <Text style={{
                        fontWeight: 'bold',
                        color: theme.colors.subtext, 
                        fontSize: 13
                    }}>{days[new Date(entry.date).getDay()].toUpperCase()}</Text> 
                    <Text style={{fontWeight: "bold", fontSize: 22, fontStyle: entry.title == "" ? "italic" : null}}>{entry.title || "untitled"}</Text> 
                </View>
            </View>
        </TouchableOpacity>
      
    )
}

export default withTheme(RecentEntryCarousel)
