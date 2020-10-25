import React, {useEffect, useState} from "react"
import { View, Dimensions, SafeAreaView} from "react-native"
import { Title, Button, TextInput, withTheme, IconButton} from "react-native-paper"
import SectionProgressBar from "./SectionProgressBar"
import { useForm, Controller } from 'react-hook-form';
import DrawingForm from "./Drawing/DrawingForm";
import AudioForm from "./VoiceRecording/AudioForm";
import { ScrollView } from "react-native-gesture-handler";
import AlertAsync from "react-native-alert-async";
import SliderForm from "./SliderForm";
import TagPickerForm from "./TagPicker/TagPickerForm";
import DatePickerForm from "./DatePickerForm";

const SectionedJournalEntryForm = ({isVisible=true, ...props}) => {

    const [section, setSection] = useState(0)

    const [drawingOpen, setDrawingOpen] = useState(false)

    const sectionHeaders = [
        'Story',
        'Rating',
        'General'
    ]

    const { control, handleSubmit, errors, formState} = useForm({
        mode: "onChange",
        shouldUnregister: false
    });

    useEffect(() => {
        if(section >= sectionHeaders.length){
            //TODO submit form
            resetComponentState()
            props.onClose();
        }
    }, [section])

    function continueForm(amount){
        setSection(section + amount)
    }

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

    console.log("isDirty ", formState.isDirty)

    return(
        <View style={{height: Dimensions.get('screen').height, width: "100%"}}>
            
            <View style={{backgroundColor: "black", margin: 10, height: "90%", borderRadius: 25, padding: 15}}>
            {isVisible ? <>
            <View style={{flexDirection: 'row'}}>
                <IconButton onPress={shouldCloseForm} icon="close" />
                <View style={{flex: 1}}>
                    <SectionProgressBar section={section} sectionHeaders={sectionHeaders} />   
                </View>
            </View>
                {section == 0 ? 
                <ScrollView 
                    scrollEnabled={!drawingOpen}
                    showsVerticalScrollIndicator={false}>     
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

                        <Controller
                            name={"drawings"}
                            control={control}
                            defaultValue={[]}
                            render={(props) => (
                                <DrawingForm
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
                                onChange={(data) => props.onChange(data)}/>
                            )}
                        />           
                    </ScrollView> : null}

                    { section == 1 ? 
                        <ScrollView scrollEnabled={false}> 
                            <Controller
                            name="vividness"
                            control={control}
                            rules={{required: true}}
                            defaultValue={5}
                            render={(props) =>
                                    <SliderForm onChange={(data) => props.onChange(data)} value={props.value} label={"Vividness"} />
                                }
                            />

                            <Controller
                                name="lucidity"
                                control={control}
                                rules={{required: true}}
                                defaultValue={5}
                                render={(props) =>
                                    <SliderForm onChange={(data) => props.onChange(data)} value={props.value} label={"Lucidity"} />
                                }
                            />

                            <Controller
                                name="memory"
                                control={control}
                                rules={{required: true}}
                                defaultValue={5}
                                render={(props) =>
                                    <SliderForm onChange={(data) => props.onChange(data)} value={props.value} label={"Memory"} />
                                }
                            />
                        </ScrollView>
                     : null}

                     { section == 2 ? 
                        <ScrollView scrollEnabled={false}>
                            <Controller
                                name="tags"
                                control={control}
                                rules={{required: true}}
                                defaultValue={[]}
                                render={(props) =>
                                <TagPickerForm onSubmit={(tagsSelected) => {
                                    props.onChange(tagsSelected)
                                }}/>
                                }
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
                        </ScrollView>
                    : null}

                    <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                        <Button onPress={() => continueForm(-1)} > Back </Button>
                        <Button onPress={() => continueForm(1)} mode="contained" style={{flex: 1}}> Next </Button>
                    </View>
                </>: null }
            </View> 
        </View>
    )
}


export default withTheme(SectionedJournalEntryForm);