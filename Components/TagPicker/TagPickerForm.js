import React, {useState, useRef, useEffect} from "react";
import { View, Dimensions, SafeAreaView, KeyboardAvoidingView, ScrollView} from "react-native";
import {Chip, Text, Title, withTheme, Button, TextInput, Snackbar} from "react-native-paper";
import RBSheet from "react-native-raw-bottom-sheet";
import HorizontalRule from "../HorizontalRule";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import TagView from "./TagView";
import TagSource from "../../TagSource";

const TagPickerForm = (props) => {
    const sheetRef = useRef(null)
    const sheetHeight = Dimensions.get("screen").height*0.85;

    const [tagQuery, setTagQuery] = useState({loading: true, data: []})
    const [customTagText, setCustomTagText] = useState(null)

    function submitForm(){
        // TODO call props.onsubmit
        const tagNamesSelected = tagQuery.data.filter((item) => {
            if (item.selected) {
                return item.name
            }
        })

        props.onSubmit(tagNamesSelected)

        sheetRef.current.close();
    }

    useEffect(() => {
        TagSource.getAllTags().then((data) => {
            setTagQuery({
                loading: false,
                data: data
            })
        })
    }, [])

    function tagPressed(tagPressedName){
        let tagState = {...tagQuery}

        for(const [i, tag] of tagState.data.entries()){
            if(tag.name === tagPressedName){
                tagState.data[i].selected = !tagState.data[i].selected;
            }
        }
        setTagQuery(tagState);
    }

    function createNewTag(){
        // Nothing entered
        if(customTagText === "" || customTagText === null){
            return;
        }

        // User typed a tag that is already in the list, so just select it
        if(tagQuery.data.some(item => item.name == customTagText)){
            tagPressed(customTagText)
            setCustomTagText(null)
            return;
        }

        let newTagState = [...tagQuery.data]
        const tagColor = "white"

        newTagState.push({
            name: customTagText,
            used: 0,
            selected: true,
            color: tagColor
        })

        setTagQuery({
            loading: false,
            data: newTagState
        })
        setCustomTagText(null)
    }


    return(
        <View style={{marginTop: 5}}>
            <Text> Tags </Text>

            <TagView
                title={""}
                tags={tagQuery.data.filter((item) => {if(item.selected) return item })}
                persistentTag={<Chip icon={"plus"} onPress={() => sheetRef.current.open()}> Edit Tags </Chip>}
              />

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
                            <Title style={{fontSize: 30, fontWeight: "bold"}}> Add Tags </Title>
                            <Button mode={"contained"} onPress={submitForm}> Done </Button>
                        </View>
                        <HorizontalRule />
                        <TextInput
                            value={customTagText}
                            onChangeText={(text) => setCustomTagText(text)}
                            mode={"outlined"}
                            label={"New Tag"}
                            onSubmitEditing={() => createNewTag()}
                            blurOnSubmit={false}
                        />
                        <ScrollView>
                            <TagView
                            title={""}
                            tags={tagQuery.data}
                            loading={tagQuery.loading}
                            onPressed={(tagName) => tagPressed(tagName)}
                            emptyContent={
                                <Text style={{color: props.theme.colors.subtext, fontSize: 17}}> No Tags Found </Text>
                            }>
                                <View style={{flexDirection: "row", alignContent: "center", marginVertical: 7}}>
                                    <Text style={{color: props.theme.colors.subtext, fontSize: 17}}> Tap to select </Text>
                                    <Icon name={"gesture-tap"} color={props.theme.colors.subtext} size={20}/>
                                </View>
                            </TagView>
                        </ScrollView>

                        <Text style={{
                            color: props.theme.colors.placeholder,
                            textAlign: "center"
                        }}> To customise and modify tags, go to the tag management screen in settings.</Text>
                    </View>
                </SafeAreaView>
            </RBSheet>
        </View>
    )
}


export default withTheme(TagPickerForm);