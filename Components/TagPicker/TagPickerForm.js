import React, {useState, useRef, useEffect} from "react";
import { View, Dimensions, SafeAreaView} from "react-native";
import {Chip, Text, Title, withTheme, Button, TextInput, IconButton} from "react-native-paper";
import RBSheet from "react-native-raw-bottom-sheet";
import HorizontalGallery from "../HorizontalGallery";
import HorizontalRule from "../HorizontalRule";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import TagView from "./TagView";
import TagSource from "../../TagSource";
import NativeAsyncStorage from "react-native/Libraries/Storage/NativeAsyncStorage";

const TagPickerForm = (props) => {

    const sheetRef = useRef(null)
    const sheetHeight = Dimensions.get("screen").height*0.85;

    const [tagQuery, setTagQuery] = useState({loading: true, data: []})

    function submitForm(){
        // TODO call props.onsubmit
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
                            <Title style={{fontSize: 30, fontWeight: "bold"}}> Dream Tags </Title>
                            <Button mode={"contained"} onPress={submitForm}> Done </Button>
                        </View>

                            <HorizontalRule />


                            <TagView
                            title={"Existing Tags"}
                            tags={tagQuery.data}
                            loading={tagQuery.loading}
                            onPressed={(tagName) => tagPressed(tagName)}
                            emptyContent={
                                <Text style={{color: props.theme.colors.subtext, fontSize: 17}}> No Tags Found </Text>
                            }>
                            <View style={{flexDirection: "row", alignContent: "center", marginBottom: 7}}>
                                <Text style={{color: props.theme.colors.subtext, fontSize: 17}}> Tap to select </Text>
                                <Icon name={"gesture-tap"} color={props.theme.colors.subtext} size={20}/>
                            </View>
                        </TagView>



                        <View
                        style={{flex: 2}}>
                            <Title style={{fontWeight: "bold"}}>
                                Add custom tags
                            </Title>
                            <TextInput mode={"outlined"} label={"Add New Tag"}/>
                        </View>

                    </View>
                </SafeAreaView>
            </RBSheet>
        </View>
    )
}


export default withTheme(TagPickerForm);