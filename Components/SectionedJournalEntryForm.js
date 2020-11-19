import React, {useEffect, useState, useRef} from "react"
import { View, Dimensions, Animated, LayoutAnimation, SafeAreaView, Alert } from "react-native"
import { Title, Button, TextInput, withTheme, IconButton, Text } from "react-native-paper"
import SectionProgressBar from "./SectionProgressBar"
import { useForm, Controller } from 'react-hook-form';
import DrawingForm from "../Drawing/DrawingForm";
import AudioForm from "./VoiceRecording/AudioForm";
import { ScrollView } from "react-native-gesture-handler";
import AlertAsync from "react-native-alert-async";
import SliderForm from "./SliderForm";
import TagPickerForm from "./TagPicker/TagPickerForm";
import DatePickerForm from "./DatePickerForm";
import HorizontalRule from "./HorizontalRule";
import KeyboardSpacer from "react-native-keyboard-spacer";
import * as Haptics from 'expo-haptics';
import {useDispatch, useSelector} from "react-redux"
import LottieView from 'lottie-react-native';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { FormResultsPreview } from "./FormResultsPreview";
var equal = require('fast-deep-equal');

const SectionedJournalEntryForm = ({isVisible=true, prefillData=null,...props}) => {

    useEffect(() => {
        if(prefillData != null){
            reset(prefillData);
        }
    }, [prefillData, reset]);

    const [section, setSection] = useState(0)

    const [drawingOpen, setDrawingOpen] = useState(false)
    const [audioRecordingOpen, setAudioRecordingOpen] = useState(false)

    const [keyboardSpacing, setKeyboardSpacing] = useState(0)

    const sectionHeaders = [
        'Story',
        'Rating',
        'General'
    ]

    const { control, handleSubmit, errors, formState, getValues, reset} = useForm({
        mode: "all",
        shouldUnregister: false
    });

    const journal = useSelector(state => state.journal)
    const dispatch = useDispatch();

    // Form functions
    const onSubmit = (data, e) => {
        // Only add new UUID if it is not prefill
        if(prefillData == null){
            data.uuid = uuidv4()

            dispatch({
                object: "JOURNAL", 
                type: "INSERT",
                data: data,        
            })
        } else {
            console.log("prefill data exists, replacing", data.uuid)
            dispatch({
                object: "JOURNAL", 
                type: "REPLACE",
                data: data, 
                uuid: data.uuid      
            })
        }
        
        // Also update the tag usage stats
        const newTagData = data.tags.map((tag) => {
            tag.used += 1;
            return tag;
        })
        for(const tag of newTagData){
            dispatch({
                object: "TAG", 
                type: "MODIFY",
                tagToModifyUUID: tag.uuid,
                data: tag,
            })
        }

        // Continue the form to the success animation
        continueForm(1)
        setTimeout(() => Haptics.notificationAsync("success"), 700);

        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setFormHeight("10%")
        props.onAnimationHasReducedSize() 
    }

    const onError = (data, e) => {
        console.error("Form error: ", e)
    }
    ///////

    useEffect(() => {
        if(section >= sectionHeaders.length + 2){
            //TODO submit form
            props.onClose();
        }
    }, [section])

    async function continueForm(amount){
        setSection(section + amount)
    }

    useEffect(() => {
        if(keyboardSpacing != 0){
            setTimeout(() => storyScrollRef.current.scrollToEnd(), 300)
        }
    }, [keyboardSpacing])

    async function shouldCloseForm(){
        // If user has started editing already, ask for confirmation before leaving (and deleting data)
        if(formState.isDirty){
            const choice = await AlertAsync(
                "Exit Form",
                "Leaving this window will clear the form. Continue?",
                [
                    {text: 'Discard', onPress: () => 'delete', style: 'destructive'},
                    {text: 'Cancel', onPress: () => 'stay', style: 'cancel'},
                ],
            )
            if(choice == "stay"){
                return;
            }
        }
        props.onClose()
    }

    const storyScrollRef = useRef(null)

    const screenHeight = Dimensions.get("screen").height;
    const [formHeight, setFormHeight] = useState("100%")

    const nextButtonDisabled = drawingOpen || audioRecordingOpen;

    return(
            <View style={{
                width: "100%",
                height: screenHeight-60,
                justifyContent: formHeight == "10%" ? "flex-end" : null, 
                alignItems: "center", 
                alignSelf: "flex-start",
                padding: 10
                }}>
                
                <View style={{
                    
                    backgroundColor: props.theme.colors.journalFormBackground || "#ffffff", 
                    borderRadius: 15, 
                    height: formHeight, 
                    width: "100%",
                    padding: 20}}>
                {isVisible ? <>
                    {section < sectionHeaders.length + 1 ?
                        <View style={{flexDirection: 'row'}}>
                            <IconButton onPress={shouldCloseForm} icon="close" />
                            <View style={{flex: 1}}>
                                <SectionProgressBar section={section} sectionHeaders={sectionHeaders} /> 
                            </View>
                        </View>
                        : null }
                    {section == 0 ? 
                    <ScrollView 
                        ref={storyScrollRef}
                        alwaysBounceVertical={false}
                        scrollEnabled={!drawingOpen}
                        showsVerticalScrollIndicator={false}
                        scrollToOverflowEnabled={false}
                        keyboardShouldPersistTaps="handled"
                        >     
                            <Title style={{fontWeight: "bold"}}> Dream Story </Title>
                            <Text> Describe the story of your dream. </Text>
                            <HorizontalRule />

                            <Controller
                                name={"drawings"}
                                control={control}
                                defaultValue={[]}
                                render={(props) => (
                                    <DrawingForm
                                        value={props.value}
                                        onChange={(data) => props.onChange(data)}
                                        onOpenChange={(val) => setDrawingOpen(val)}
                                    />
                                )}
                                />

                            <Controller
                                name={"audioRecordings"}
                                control={control}
                                defaultValue={[]}
                                render={(props) => (
                                    <AudioForm
                                    onChange={(data) => props.onChange(data)}
                                    value={props.value}
                                    onOpenChange={(val) => setAudioRecordingOpen(val)}
                                    />
                                )}
                            />    
                        
                            <Controller
                                name="description"
                                control={control}
                                defaultValue={""}
                                render={(props) =>
                                    <TextInput
                                        {...props}
                                        mode={"outlined"}
                                        label={"Description"}
                                        multiline={true}
                                        error={errors.description}
                                        onChangeText={(value) => {props.onChange(value)}}
                                        value={props.value}
                                        style={{marginVertical: 5}}
                                    />}
                            />       
                            <KeyboardSpacer onToggle={(enabled, height) => setKeyboardSpacing(height)} />
                        </ScrollView> : null}

                        { section == 1 ? 
                            <ScrollView scrollEnabled={false}> 
                                <Title style={{fontWeight: "bold"}}> Dream Rating </Title>
                                <Text> Rate aspects about your dream </Text>
                                <HorizontalRule />

                                <Controller
                                name="vividness"
                                control={control}
                                rules={{required: true}}
                                defaultValue={5}
                                render={(props) =>
                                        <SliderForm 
                                        lowerText={"Blurry"}
                                        upperText={"Vivid"}
                                        icon={"sun"}
                                        onChange={(data) => props.onChange(data)} 
                                        value={props.value} 
                                        label={"Vividness"}
                                        description={"How clear was the dream?"}
                                        />
                                    }
                                />

                                <Controller
                                    name="memory"
                                    control={control}
                                    rules={{required: true}}
                                    defaultValue={5}
                                    render={(props) =>
                                        <SliderForm 
                                        lowerText={"Hard"}
                                        upperText={"Easy"}
                                        onChange={(data) => props.onChange(data)} 
                                        value={props.value} 
                                        label={"Memory"} 
                                        icon={"brain"}
                                        description={"How easy was it to remember the dream?"}
                                        />
                                    }
                                />

                                <Controller
                                    name="lucidity"
                                    control={control}
                                    rules={{required: true}}
                                    defaultValue={5}
                                    render={(props) =>
                                        <SliderForm 
                                        lowerText={"Not"}
                                        upperText={"Very"}
                                        onChange={(data) => props.onChange(data)} 
                                        value={props.value} 
                                        label={"Lucidity"} 
                                        icon={"eye"} 
                                        maxValue={10}
                                        description={"How lucid were you in the dream?"}/>
                                    }
                                />
                            </ScrollView>
                        : null}

                        { section == 2 ? 
                            <ScrollView scrollEnabled={false}>
                                <Title style={{fontWeight: "bold"}}> General </Title>
                                <Text> Add tags and a title to your dream </Text>
                                <HorizontalRule />

                                <Controller
                                    name="title"
                                    control={control}
                                    defaultValue={""}
                                    rules={{required: true}}
                                    render={(props) =>
                                        <TextInput
                                            {...props}
                                            mode={"outlined"}
                                            label={"Title"}
                                            onChangeText={(value) => {props.onChange(value)}}
                                            value={props.value}
                                            error={errors.title}
                                        />}
                                />
                                <Controller
                                    name="date"
                                    control={control}
                                    rules={{required: true}}
                                    defaultValue={new Date().toString()}
                                    render={(props) =>
                                        <DatePickerForm
                                            onChange={(date) => props.onChange(date)}
                                            date={props.value}
                                        />
                                    }
                                />
                                <Controller
                                    name="tags"
                                    control={control}
                                    rules={{required: true}}
                                    defaultValue={[]}
                                    render={(props) =>
                                    <TagPickerForm 
                                    value={props.value}
                                    onChange={(tagsSelected) => props.onChange(tagsSelected)}/>
                                    }
                                />

                            </ScrollView>
                        : null}

                        {section == 3 ? 
                            <View style={{flex: 1}}>
                                <FormResultsPreview formData={getValues()} />
                            </View>
                        : null}
                        
                        

                        {section == (sectionHeaders.length + 1) ? 
                        <View style={{height: "100%", width: "100%", padding: 10}}>
                            <LottieView 
                                autoPlay={true}
                                loop={false}
                                source={require('../Animations/7698-success.json')}
                                onAnimationFinish={() => props.onClose()}
                            />
                        </View> : null }

                        <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: 'center'}}>
                    
                            {(section > 0 && section != (sectionHeaders.length + 1))? <Button onPress={() => continueForm(-1)} > Back </Button> : null}
                            
                            {section < sectionHeaders.length ? <Button disabled={nextButtonDisabled} onPress={() => continueForm(1)} style={{borderRadius: 30}} contentStyle={{padding: 2, borderRadius: 30}} labelStyle={{fontWeight: "bold", fontSize: 20}}  mode="contained" style={{flex: 1}} color={props.theme.colors.accent}> Next </Button> : null }
                        
                            {section == sectionHeaders.length ? 
                                <Button onPress={handleSubmit(onSubmit, onError)} style={{borderRadius: 30}} contentStyle={{padding: 2, borderRadius: 30}} labelStyle={{fontWeight: "bold", fontSize: 20}}  mode="contained" style={{flex: 1}} color={props.theme.colors.accent2 || "#ffffff"}> Submit </Button>
                            : null}
                        </View>
                    </>: null }
                </View> 
            </View>
       
    )
}


export default withTheme(SectionedJournalEntryForm);