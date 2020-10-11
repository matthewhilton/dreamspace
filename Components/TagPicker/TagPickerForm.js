import React, {useState, useRef, useEffect} from "react";
import { View, Dimensions, SafeAreaView} from "react-native";
import {Chip, Text, Title, withTheme, Button, TextInput, IconButton} from "react-native-paper";
import RBSheet from "react-native-raw-bottom-sheet";
import HorizontalGallery from "../HorizontalGallery";
import HorizontalRule from "../HorizontalRule";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import TagView from "./TagView";
import TagSource from "../../TagSource";

const TagPickerForm = (props) => {

    const sheetRef = useRef(null)
    const sheetHeight = Dimensions.get("screen").height*0.85;

    const [allTags, setAllTags] = useState({loading: true, data: []})

    function submitForm(){
        // TODO call props.onsubmit
        sheetRef.current.close();
    }

    // On mount run function to get tags
    useEffect(() => {
        // TagSource will also analyse recently used tags saved
        populateAllTags()
    }, [])

    function removeFromCurrent(tagName){
        const newTags = TagSource.modifyTagGrouping(tagName, allTags.data, "all");
        setAllTags({
            loading: false,
            data: newTags,
        })

        determineSuggestedTags(newTags).then((data) => {
            console.log("determined suggested:")
            console.log(newTags)
            setAllTags({
                loading: false,
                data: data
            })
        })
    }

    function addToCurrent(tagName){
        console.log("adding tag to current: ", tagName)
        setAllTags({
            loading: false,
            data: TagSource.modifyTagGrouping(tagName, allTags.data, "current")
        })
    }

    function determineSuggestedTags(tags) {
        return TagSource.getSuggestedTags(tags)
    }

    function populateAllTags() {
        TagSource.getAllTags().then((tagJson) => {
            // Populate every tag with the default property of 'all'
            let populatedTags = [];

            console.log("tag json" , tagJson)

            for(let i = 0; i < tagJson.length; i++){
                let thisItem = tagJson[i];
                thisItem["grouping"] = "all";
                populatedTags.push(thisItem)
            }
            console.log("populated tags: ", populatedTags);

            determineSuggestedTags(populatedTags).then((data) => {
                setAllTags({
                    loading: false,
                    data: data
                })
            })

        }).catch((e) => console.error(e))
    }

    return(
        <View style={{marginTop: 5}}>
            <Text> Tags </Text>
            <View style={{flex: 1, flexDirection: "row", flexWrap: true, marginVertical: 5}}>
                <Chip icon={"plus"} onPress={() => sheetRef.current.open()}> Add Tags </Chip>
            </View>

            <RBSheet
                height={sheetHeight}
                ref={sheetRef}
                closeOnDragDown={true}
                customStyles={{
                    container: {
                        backgroundColor: props.theme.colors.background_sheet,
                        height: sheetHeight
                    },
                }}
            >
                <SafeAreaView style={{height: "100%", flex: 1}}>
                    <View style={{padding: 10, flex: 1, justifyContent: "flex-start"}}>
                        <View style={{flexDirection: "row", justifyContent: "space-between",alignContent: 'center', marginVertical: 5}}>
                            <Title style={{fontSize: 30, fontWeight: "bold"}}> Tags </Title>
                            <Button mode={"contained"} onPress={submitForm}> Done </Button>
                        </View>

                            <HorizontalRule />


                        <TagView
                            title={"Current"}
                            tags={allTags.data}
                            loading={allTags.loading}
                            filter={"current"}
                            onPressed={(tagName) => removeFromCurrent(tagName)}
                            emptyContent={
                                <Text style={{color: props.theme.colors.subtext, fontSize: 17}}> No Tags Yet </Text>
                            }/>


                        <TagView
                            title={"Suggested"}
                            tags={allTags.data}
                            loading={allTags.loading}
                            filter={"suggested"}
                            onPressed={(tagName) => addToCurrent(tagName)}
                            emptyContent={
                                <Text style={{color: props.theme.colors.subtext, fontSize: 17}}> No Suggested Tags </Text>
                            }
                        >
                            <View style={{flex: 1, flexDirection: "row", alignContent: "center"}}>
                                <Text style={{color: props.theme.colors.subtext, fontSize: 17}}> Tap to add </Text>
                                <Icon name={"gesture-tap"} color={props.theme.colors.subtext} size={20}/>
                            </View>
                        </TagView>

                        <TagView
                            title={"All"}
                            antiFilter={"current"}
                            tags={allTags.data}
                            loading={allTags.loading}
                            onPressed={(tagName) => addToCurrent(tagName)}
                            emptyContent={
                                <Text style={{color: props.theme.colors.subtext, fontSize: 17}}> No Tags - Add custom tags below </Text>
                            }
                        >
                            <View style={{flex: 1, flexDirection: "row", alignContent: "center"}}>
                                <Text style={{color: props.theme.colors.subtext, fontSize: 17}}> Tap to add </Text>
                                <Icon name={"gesture-tap"} color={props.theme.colors.subtext} size={20}/>
                            </View>
                        </TagView>

                            <TextInput mode={"outlined"} label={"Type custom tags"}/>
                    </View>
                </SafeAreaView>
            </RBSheet>
        </View>
    )
}


export default withTheme(TagPickerForm);