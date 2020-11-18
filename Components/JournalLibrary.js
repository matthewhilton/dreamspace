import React, {useState, useRef} from "react"
import { Searchbar, Text, Button, withTheme, FAB } from "react-native-paper"
import { View, FlatList ,Dimensions, UIManager, LayoutAnimation } from "react-native"
import HeaderWithNav from "./HeaderWithNav"
import { useSelector, useDispatch } from "react-redux"
import JournalLibaryEntry from "./JournalLibraryEntry"
import journal from "../Redux/journalReducer"
import { useNavigation } from "@react-navigation/native"
import RecentEntryCarousel from "./RecentEntryCarousel"
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }


const JournalLibrary = (props) => {
    const [searchQuery, setSearchQuery] = useState("")

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

    let allEntries = useSelector(store => store.journal)
    let journalEntries = [...allEntries].filter((item) => searchFilter(item)).sort((a,b) => dateFilter(a,b)).reverse();

    if(journalEntries === undefined) journalEntries = [];

    const navigation = useNavigation();

    const [shouldCarouselShow, setShouldCarouselShow] = useState(true)

    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)

    const carouselItemHeight = Dimensions.get('screen').height*0.2;
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
                     {shouldCarouselShow ?  <RecentEntryCarousel shouldAnimate={true} entries={allEntries} onPress={(item) => navigation.navigate("JournalEntryView", {
                                    data: item
                                })} 
                                itemHeight={carouselItemHeight}/> : null}
                    
                    

                    <Searchbar 
                        style={{backgroundColor: props.theme.colors.journalFormBackground}}
                                placeholder="Search"
                                onChangeText={val => {
                                    setSearchQuery(val)
                                    if(val === ""){
                                        setShouldCarouselShow(true)
                                    } else {
                                        setShouldCarouselShow(false)
                                    }
                                }}
                                value={searchQuery}
                                />

                    <FlatList
                    onScroll={(e) => {
                        const scrollY = e.nativeEvent.contentOffset.y;
                        if(scrollY > 0 && scrollY > carouselItemHeight/3){
                            setShouldCarouselShow(false)
                        }

                        if(scrollY < 0 && Math.abs(scrollY) > carouselItemHeight/2.5){
                            setShouldCarouselShow(true)
                        }
                    }}
                    contentContainerStyle={{paddingBottom: 100}}
                    scrollEventThrottle={5}
                    style={{height: "100%"}}
                    keyExtractor={item => item.uuid}
                        data={journalEntries}
                        renderItem={({item, index}) => (
                            <JournalLibaryEntry data={item} key={item.uuid} onPress={() => {
                                navigation.navigate("JournalEntryView", {
                                    data: item
                                })
                        }} />
                        )}
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