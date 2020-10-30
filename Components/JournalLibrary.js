import React, {useState} from "react"
import { Searchbar, Text, Title, withTheme } from "react-native-paper"
import { View, FlatList,TouchableWithoutFeedback } from "react-native"
import HeaderWithNav from "./HeaderWithNav"
import { useSelector } from "react-redux"
import JournalLibaryEntry from "./JournalLibraryEntry"
import journal from "../Redux/journalReducer"

const JournalLibrary = (props) => {

    const [searchQuery, setSearchQuery] = useState("")

    let journalEntries = useSelector(store => store.journal)
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

    return(
        <View style={{flex: 1}}>
            <HeaderWithNav />
            <View style={{
                flex: 1, 
                margin: 0,
                }}>
                <View
                style={{
                    backgroundColor: props.theme.colors.journalFormBackground,
                    borderRadius: 10,
                    height: "120%",
                    marginTop: 10
                }}
                >
                    <Searchbar 
                    placeholder="Search"
                    onChangeText={val => setSearchQuery(val)}
                    value={searchQuery}
                    />
                    <FlatList
                    style={{padding: 10}}
                    scrollEnabled={false}
                    keyExtractor={item => item.date}
                        data={journalEntries.sort(dateFilter).filter(searchFilter)}
                        renderItem={({item}) => <JournalLibaryEntry data={item} />}
                    />
                </View>
            </View>
        </View>
    )
}
  
export default withTheme(JournalLibrary);