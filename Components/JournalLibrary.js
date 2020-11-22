import React, {useState} from "react"
import { Searchbar, Text, withTheme, FAB } from "react-native-paper"
import { View, SectionList ,Dimensions, UIManager, LayoutAnimation } from "react-native"
import HeaderWithNav from "./HeaderWithNav"
import { useSelector } from "react-redux"
import JournalLibaryEntry from "./JournalLibraryEntry"
import { useNavigation } from "@react-navigation/native"
import RecentEntryCarousel from "./RecentEntryCarousel"
import 'react-native-get-random-values';
import groupBy from "../Functions/groupBy"
import months from "../Functions/monthNames"
import useSettings from "../Hooks/UseSettings"
import * as LocalAuthentication from 'expo-local-authentication';
import AuthenticationView from "./AuthenticationView"

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

    const dateYearGrouping = (item) => {
        let date = new Date(item.date);
        return(months[date.getMonth()]+ " " + date.getFullYear())
    }

    let allEntries = useSelector(store => store.journal)
    let journalEntries = [...allEntries].filter((item) => searchFilter(item)).sort((a,b) => dateFilter(a,b)).reverse();

    // Then sort them into groups of the month and the year
    const groupedEntries = groupBy(journalEntries, dateYearGrouping)

    // Reformat to fit into sectionList
    const keys = Object.keys(groupedEntries);
    let groupedEntriesSectioned = [];
    for(const key of keys){
        groupedEntriesSectioned.push({
          title: key,
          data: groupedEntries[key]  
        })
    }

    if(journalEntries === undefined) journalEntries = [];

    const navigation = useNavigation();

    const [shouldCarouselShow, setShouldCarouselShow] = useState(true)

    LayoutAnimation.configureNext(LayoutAnimation.create(300, LayoutAnimation.Types.keyboard, LayoutAnimation.Properties.opacity));

    const carouselItemHeight = Dimensions.get('screen').height*0.2;

    const {settings} = useSettings()

    return(
        <View style={{flex: 1, margin: 6, height: "100%"}}>
            
            <HeaderWithNav title={"Journal Library"} />
            <AuthenticationView>
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
                            onFocus={() => {
                                setShouldCarouselShow(false)
                            }}
                            onBlur={() => {
                                if(searchQuery == ""){
                                    setShouldCarouselShow(true)
                                } else {
                                    setShouldCarouselShow(false)
                                }
                            }}
                            value={searchQuery}
                            />
    <View style={{marginHorizontal: 10}}>
                    <SectionList
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
                        sections={groupedEntriesSectioned}
                        renderItem={({item, index}) => (
                            <JournalLibaryEntry data={item} key={item.uuid} onPress={() => {
                                navigation.navigate("JournalEntryView", {
                                    data: item
                                })
                            }} />
                        )}
                        renderSectionHeader={({section: {title}}) => (
                            <View style={{
                                backgroundColor: props.theme.colors.journalListDivider,
                                padding: 5,
                                }}>
                                <Text style={{fontWeight: "bold", color: props.theme.colors.subtext}}> {title} </Text>
                            </View>
                        )}
                    />
                    
</View>


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
            </AuthenticationView>
            
        </View>
    )
}
  
export default withTheme(JournalLibrary);