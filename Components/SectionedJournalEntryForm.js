import React, {useEffect, useState, useRef} from "react"
import { View, Dimensions } from "react-native"
import { Title, Button, TextInput, withTheme, IconButton, Text } from "react-native-paper"
import SectionProgressBar from "./SectionProgressBar"
import { useForm, Controller } from 'react-hook-form';
import DrawingForm from "./Drawing/DrawingForm";
import AudioForm from "./VoiceRecording/AudioForm";
import { ScrollView } from "react-native-gesture-handler";
import AlertAsync from "react-native-alert-async";
import SliderForm from "./SliderForm";
import TagPickerForm from "./TagPicker/TagPickerForm";
import DatePickerForm from "./DatePickerForm";
import HorizontalRule from "./HorizontalRule";
import KeyboardSpacer from "react-native-keyboard-spacer";
import * as Haptics from 'expo-haptics';
import LottieView from 'lottie-react-native';

import { FormResultsPreview } from "./FormResultsPreview";
import Animated, { Easing } from "react-native-reanimated";

const SectionedJournalEntryForm = ({isVisible=true, ...props}) => {

    const [section, setSection] = useState(0)

    const [drawingOpen, setDrawingOpen] = useState(false)

    const [keyboardSpacing, setKeyboardSpacing] = useState(0)

    const sectionHeaders = [
        'Story',
        'Rating',
        'General'
    ]

    const { control, handleSubmit, errors, formState, getValues} = useForm({
        mode: "all",
        shouldUnregister: false
    });

    useEffect(() => {
        if(section >= sectionHeaders.length + 2){
            //TODO submit form
            props.onClose();
        }
    }, [section])

    function continueForm(amount){
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

    const screenHeight = Dimensions.get('screen').height;

    const [interpolateValue] = useState(new Animated.Value(0))
    const interpolateHeight = interpolateValue.interpolate({
        inputRange: [0, 1],
        outputRange: ["90%", "50%"]
    })

    function formStatusAnimation(){
        console.log("running animation")
        Animated.timing(interpolateHeight, {
            toValue: 1,
            duration:  300,
            useNativeDriver: true,
            easing: Easing.bezier(0.455, 0.03, 0.515, 0.955)
        }).start();

        // TODO add callback 
    }


    return(
            <View style={{height: Dimensions.get('screen').height, width: "100%"}}>
                
                <View style={{backgroundColor: props.theme.colors.background_sheet, margin: 10, borderRadius: 25, padding: 15, height: screenHeight*0.9}}>
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
                                    defaultValue={new Date()}
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
                        
                        {section == sectionHeaders.length ? 
                            <Button labelStyle={{fontSize: 25, fontWeight: "bold"}} mode="contained" onPress={() => continueForm(1)}> Save </Button>
                        : null}

                        {section == (sectionHeaders.length + 1) ? 
                        <View style={{height: "100%", width: "100%", padding: 40}}>
                            <LottieView 
                                autoPlay={true}
                                loop={false}
                                source={require('../Animations/7698-success.json')}
                            />

                            <Animated.View style={{height: interpolateHeight}}>
                                <View style={{height: "100%", width: "100%", backgroundColor: "red"}}>
                                    <Button onPress={() => formStatusAnimation()}> Start animation </Button>
                                    <Text> Inteprolated height  </Text>
                                </View>
                            </Animated.View>
                        </View> : null }

                        <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                            {(section > 0 && section != (sectionHeaders.length + 1))? <Button onPress={() => continueForm(-1)} > Back </Button> : null}
                            {section < sectionHeaders.length ? <Button onPress={() => continueForm(1)} mode="contained" style={{flex: 1}} color={props.theme.colors.accent}> Next </Button> : null }
                        </View>
                    </>: null }
                </View> 
            </View>
    )
}


export default withTheme(SectionedJournalEntryForm);