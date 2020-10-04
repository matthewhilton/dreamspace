import React, {useState, useRef} from "react";
import { View, Dimensions, SafeAreaView} from "react-native";
import {Chip, Text, Title, withTheme, Button, TextInput, IconButton} from "react-native-paper";
import RBSheet from "react-native-raw-bottom-sheet";
import HorizontalGallery from "../HorizontalGallery";
import HorizontalRule from "../HorizontalRule";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import TagView from "./TagView";

const TagPickerForm = (props) => {
    const [tags, setTags] = useState([])
    const sheetRef = useRef(null)
    const sheetHeight = Dimensions.get("screen").height*0.75;

    // TODO - get prefill tags from somewhere in storage - maybe redux store?

    function submitForm(){
        // TODO call props.onsubmit
        sheetRef.current.close();
    }

    // TODO - when custom tag is entered, send to redux store, which will update the tag.

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
                                tags={tags}
                                emptyContent={
                                    <Text style={{color: props.theme.colors.subtext, fontSize: 17}}> No Tags Yet </Text>
                                }/>
                            <TagView
                                title={"Commonly Used"}
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