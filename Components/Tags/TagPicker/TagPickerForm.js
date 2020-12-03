import React, {useState, useRef, useEffect} from "react";
import { View, Dimensions, SafeAreaView, KeyboardAvoidingView, ScrollView, TextInputComponent} from "react-native";
import {Chip, Text, Title, withTheme, Button, TextInput, Snackbar} from "react-native-paper";
import { useDispatch, useSelector } from "react-redux"
import RBSheet from "react-native-raw-bottom-sheet";
import HorizontalRule from "../../Display/HorizontalRule";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import TagView from "./TagView";
import AlertAsync from "react-native-alert-async"
import KeyboardSpacer from "react-native-keyboard-spacer";

import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import useTags from "../../../Hooks/UseTags"

const TagPickerForm = (props) => {
    const sheetRef = useRef(null)
    const sheetHeight = Dimensions.get("screen").height*0.8;
    const [customTagText, setCustomTagText] = useState(null)

    const tagNamesSelected = props.value.map((item) => item.name)

    // Connect to redux store
    const dispatch = useDispatch()

    let {tags, createTag} = useTags();

    function submitForm(){
        sheetRef.current.close();
    }

    function tagPressed(tagPressedUUID){
        // Get the currently selected tags (from props.value)
        let currentSelected = [...props.value]
        for(const [i, tag] of currentSelected.entries()){
            if(tag.uuid == tagPressedUUID){
                // Is already in the list (so should remove it and update controller via props)
                currentSelected.splice(i, 1);
                props.onChange(currentSelected);
                return;
            }
        }

        // Tag not found on list already, so add it (and then update controller via props)
        // First get the tag data 
        const tagPressedData = tags.find(tag => tag.uuid == tagPressedUUID)
        props.onChange([...props.value, tagPressedData])
    }

    async function tagLongPressed(tagUUID){
        // On long press, show alert to delete tag

        const choice = await AlertAsync(
            "Delete Tag?",
            "Deleting a tag will remove it from any other dreams that have been tagged with it",
            [
                {text: 'Delete', onPress: () => 'yes', style: 'destructive'},
                {text: 'Cancel', onPress: () => 'no', style: 'cancel'},
            ],
        );

        if (choice == 'no') {
            return;
        }

        // Else continue on deleting tag
        dispatch({type: "DELETE", object: "TAG", data: tagUUID})

        // Also delete from prop controller if exists there
        let newValue = [...props.value]
        newValue = newValue.filter((item) => {if(item.uuid != tagUUID) return item})
        props.onChange(newValue)
    }

    function createNewTag(){
        // Nothing entered
        if(customTagText === "" || customTagText === null){
            return;
        }

        // User typed a tag that is already in the list, so just select it
        // First find the UUID to be able to select it
        const tagPressedSearch = tags.find(item => item.name.toUpperCase() == customTagText.toUpperCase())
        if(tagPressedSearch != null){
            tagPressed(tagPressedSearch.uuid)
            setCustomTagText(null)
            return;
        }

        const defaultTagColor = "white"

        // TODO determine icon randomly, or some other method?
        const tagData = createTag(customTagText, defaultTagColor, Math.random()*10 > 5 ? 1 : 0)

        // Also update controller via props
        props.onChange([...props.value, tagData])

        setCustomTagText(null)
    }

    const tagsWithSelectedProperty = tags.map((item) => {
        if(tagNamesSelected.includes(item.name)){
            item.selected = true;
        } else {
            item.selected = false;
        }

        return item;
    })

    function addDefaultTags() {
        const defaultTags = [
            { name: "False Awakening", color: "#f27844"},
            { name: "Flying", color: "#62e3dc"},
            { name: "Recurring", color: "#5dde68"},
            { name: "Nightmare", color: "#635c5c"},
            { name: "Sleep Paralysis", color: "#b440cf"}
        ]

        // Dispatch all these to the redux store
        defaultTags.forEach((defaultTag) => {
            createTag(defaultTag.name, defaultTag.color, Math.random()*10 > 5 ? 1 : 0)
        })
    }

    return(
        <View style={{marginTop: 5}}>
            <Title style={{fontWeight: "bold"}}> Tags </Title>
            <HorizontalRule />

            <TagView
                title={""}
                tags={props.value}
                onPressed={() => sheetRef.current.open()}
                persistentTag={<Chip icon={"plus"} onPress={() => sheetRef.current.open()} style={{margin: 3}}> Tags </Chip>}
              />

            <RBSheet
                height={sheetHeight}
                ref={sheetRef}
                closeOnDragDown={true}
                customStyles={{
                    container: {
                        backgroundColor: props.theme.colors.journalFormBackground,
                    },
                }}
            >
               
                <SafeAreaView style={{height: sheetHeight, flex: 1}}>
                    <View style={{padding: 10, flex: 1, justifyContent: "flex-start"}}>
                        <View style={{flexDirection: "row", justifyContent: "space-between",alignContent: 'center', marginVertical: 5}}>
                            <Title style={{fontSize: 30, fontWeight: "bold"}}> Add Tags </Title>
                            <Button mode={"contained"} onPress={submitForm}> Done </Button>
                        </View>
                        <HorizontalRule />
                        
                        <ScrollView contentContainerStyle={{justifyContent: "space-between"}}>
                            
                            <TagView
                            title={""}
                            tags={tagsWithSelectedProperty}
                            onPressed={(tagUUID) => tagPressed(tagUUID)}
                            onLongPressed={(tagUUID) => tagLongPressed(tagUUID)}
                            emptyContent={
                                <View style={{alignItems: "center"}}>
                                    <Text style={{textAlign: "center", color: props.theme.colors.subtext}}> Looks like you don't have any tags yet. Would you like to add some common ones? </Text>
                                    <Button mode="outlined" onPress={addDefaultTags}> Add Common Tags </Button>
                                </View>
                                
                            }>
                                <View style={{flexDirection: "row", alignContent: "center", marginVertical: 7}}>
                                    <Text style={{color: props.theme.colors.subtext, fontSize: 17}}> Tap to select </Text>
                                    <Icon name={"gesture-tap"} color={props.theme.colors.subtext} size={20}/>
                                </View>
                            </TagView>
                            
                            <TextInput
                            value={customTagText}
                            onChangeText={(text) => setCustomTagText(text)}
                            mode={"outlined"}
                            label={"New Tag"}
                            onSubmitEditing={() => createNewTag()}
                            blurOnSubmit={false}
                            />
                            <KeyboardSpacer />
                           
                        </ScrollView>

                        <Text style={{
                            color: props.theme.colors.placeholder,
                            textAlign: "center"
                        }}> Long press to delete tag. To customise and modify tags, go to the tag management screen in settings.</Text>
                    </View>
                </SafeAreaView> 
                    
            </RBSheet>
        </View>
    )
}


export default withTheme(TagPickerForm);