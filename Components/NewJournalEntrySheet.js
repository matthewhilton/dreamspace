import React, { useState, useEffect } from 'react'
import BottomSheet from 'reanimated-bottom-sheet';
import {Dimensions, View, SafeAreaView, StyleSheet, TouchableWithoutFeedback} from "react-native";
import { Button, Text, withTheme} from "react-native-paper";
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Haptics from 'expo-haptics';
import NewJournalEntryForm from "./NewJournalEntryForm";
import DrawingCanvas from "./Drawing/DrawingCanvas";

const NewJournalEntrySheet = (props) => {
    const openHeight = Dimensions.get('window').height - 50;
    const sheetRef = React.useRef(null);
    const bottomSnapHeight = 120;
    const [open, setOpen] = useState(false)
    const [canMove, setCanMove] = useState(false)

    const themeColors = props.theme.colors;

    const styles = StyleSheet.create({
        button: {
            backgroundColor: themeColors.background_sheet,
            padding: 10,
            height: openHeight,
        },
        largeButtonText:{
            fontSize: 30,
            fontWeight: "bold",
            textAlign: "center",
        },
        innerViewStyle: {
            flexDirection: "row",
            justifyContent: "center",
            padding: 20,
        }
    })

    const ClosedSheetContent = () => (
            <TouchableWithoutFeedback style={styles.button}
                              onPress={() => {
                                  setOpen(true);
                                  sheetRef.current.snapTo(1);
                              }}>
                <View style={styles.innerViewStyle}>
                    <Icon name="pencil" size={30} color={themeColors.text} />
                    <Text style={styles.largeButtonText} color={themeColors.text}> New Entry </Text>
                </View>

            </TouchableWithoutFeedback>

    )

    const OpenSheetContent = () => (
        <View style={{height: "100%"}}>
            <Button mode="flat"
                onPress={() => {
                    setOpen(false);
                    setCanMove(true);
                    sheetRef.current.snapTo(0)}
                }
                style={{ alignSelf: "left"}}
            > Close </Button>

            <NewJournalEntryForm />
        </View>

    )

    const newJournalEntry = () => (
        <View style={{height: openHeight, backgroundColor: themeColors.background_sheet, padding: 10}}>
            <SafeAreaView >
                {open ? <OpenSheetContent /> : <ClosedSheetContent />}
            </SafeAreaView>
        </View>
    );

    return(
        <View style={{ backgroundColor: themeColors.background_main, height: "100%"}}>

            <BottomSheet
            onCloseEnd={() => {
                setOpen(false)
                setCanMove(false)
            }}
            enabledContentTapInteraction={false}
            enabledContentGestureInteraction={false}
            onOpenStart={() => setOpen(true)}
            onOpenEnd={() => setCanMove(true)}
            enabledGestureInteraction={canMove}
            ref={sheetRef}
            renderContent={newJournalEntry}
            snapPoints={[bottomSnapHeight, openHeight]}
            borderRadius={20}
        />
        </View>
        )
}


export default withTheme(NewJournalEntrySheet);
