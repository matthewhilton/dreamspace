import React, {useState, useRef} from "react"
import { Searchbar, Text, Button, withTheme, FAB } from "react-native-paper"
import { View, FlatList,Dimensions, Animated } from "react-native"
import HeaderWithNav from "./HeaderWithNav"
import { useSelector, useDispatch } from "react-redux"
import JournalLibaryEntry from "./JournalLibraryEntry"
import journal from "../Redux/journalReducer"
import { useNavigation } from "@react-navigation/native"
import RecentEntryCarousel from "./RecentEntryCarousel"
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';



const JournalLibrary = (props) => {
    const [searchQuery, setSearchQuery] = useState("")

    let journalEntries = useSelector(store => store.journal)
    const dispatch = useDispatch();
    if(journalEntries === undefined) journalEntries = [];

    const dateFilter = (a,b) => {
        var dateA = new Date(a.date), dateB = new Date(b.date);
        return dateA - dateB;
    }

    const searchFilter = (item) => {
        if(searchQuery === "") {
            return true;
        } else {
            if(item.title.toLowerCase().includes(searchQuery.toLowerCase())) return true;
        }

        return false;
    }

    // Add two dummy journal entries to end (which become at the start because they are reversed)
    // So that the header components can override them in the flatlist, allowing for only the second
    // header item in the flat list to the stickied (not the first one)
    let listJournalEntries = [...journalEntries.sort(dateFilter).filter(searchFilter), {
        uuid: uuidv4() + " DUMMY",
        drawings: [],
        audioRecordings: [],
    }, {
        uuid: uuidv4() + " DUMMY",
        drawings: [],
        audioRecordings: [],
    }];

    console.log(listJournalEntries)

    const navigation = useNavigation();
    return(
        <View style={{flex: 1, margin: 6}}>
            <HeaderWithNav />
            <View style={{
                margin: 0,
                }}>
                <View
                style={{
                    backgroundColor: props.theme.colors.journalFormBackground,
                    borderRadius: 10,
                    flexDirection: 'column',
                    marginTop: 10,
                    height: Dimensions.get("screen").height-200
                }}>
   
                    <FlatList
                    stickyHeaderIndices={[1]}
                    style={{height: "100%"}}
                    keyExtractor={item => item.uuid}
                        data={listJournalEntries.reverse()}
                        renderItem={({item, index}) => {
                        if(index >= 2){
                            return (
                                <JournalLibaryEntry data={item} onPress={() => {
                                    navigation.navigate("JournalEntryView", {
                                        data: item
                                    })
                            }} />
                            )
                        } else if(index == 1){
                            return(
                                <Searchbar 
                                placeholder="Search"
                                onChangeText={val => setSearchQuery(val)}
                                value={searchQuery}
                                />
                            )
                        } else {
                            return(
                                <RecentEntryCarousel entries={journalEntries} onPress={(item) => navigation.navigate("JournalEntryView", {
                                    data: item
                                })} 
                                itemHeight={Dimensions.get('screen').height*0.2}/>
                            )
                        }
                    }}
                    />
                </View>

                <FAB
                    icon="plus"
                    onPress={() => navigation.navigate("Home", {autoOpenForm: true})}
                    style={{
                        position: 'absolute',
                        right: 20, 
                        bottom: 20,
                    }}
                />
            </View>
        </View>
    )
}
  
export default withTheme(JournalLibrary);