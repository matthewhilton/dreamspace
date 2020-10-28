import React, {useState, useRef, useEffect} from "react"
import { View, Dimensions } from "react-native";
import { Button, IconButton, Text } from "react-native-paper"
import Animated, { Easing } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { circle } from "react-native/Libraries/Animated/src/Easing";
import { useDispatch } from "react-redux";
import AnimatedPlanet from "./AnimatedPlanet";
import AnimatedPopupForm from "./AnimatedPopupForm";
import Circle from "./Circle";
import SectionedJournalEntryForm from "./SectionedJournalEntryForm";

import FormSuccessIndicator from "./FormSuccessIndicator"

const SpaceWalk = (props) => {
    const screenHeight = Dimensions.get("screen").height;

    const [planetPositions, setPlanetPositions] = useState([
        {x: 10, y: 100},
        {x: 20, y: 200},
        {x: 50, y: 300},
        {x: 35, y: 500}
    ])

    const planetMovementOffset = 500;

    const dispatch = useDispatch();

    const [isScaledUpward, setIsScaledUpward ] = useState(false)
    const [backgroundScaledUpward, setBackgroundIsScaledUpward] = useState(false)

    function formSuccessAnimation(){
        setIsScaledUpward(false)
        setBackgroundIsScaledUpward(false)
    }

    function formClose(){
        setIsScaledUpward(false)
        setBackgroundIsScaledUpward(false)
    }

    return(
        <View style={{height: "200%"}}>
            <View style={{flexDirection: "row"}}>
                {planetPositions.map((coordinates, i) => (
                    <AnimatedPlanet 
                    key={i}
                    isMoved={backgroundScaledUpward} 
                    startX={coordinates.x} 
                    startY={coordinates.y} 
                    endY={coordinates.y-(planetMovementOffset*((screenHeight-coordinates.y)/screenHeight*0.04))} 
                    duration={300}
                    />
                ))}
           </View>

           
        
            <View style={{position: "absolute", width: "100%", bottom: screenHeight, left: 0}}>
            <Button mode="contained" onPress={() => dispatch({type: "NUKE"})}> Nuke Redux Store </Button>
            
                <SafeAreaView style={{flexDirection: "row", width: "100%", alignItems: 'center'}}>
                    <View style={{flex: 1, margin: 5}}>
                        <Button onPress={() => {
                            setIsScaledUpward(!isScaledUpward)
                            setBackgroundIsScaledUpward(!backgroundScaledUpward)
                            }} mode="contained" > New Entry </Button>
                    </View>

                    <View style={{margin: 5}}>
                     <IconButton icon={"menu"}/>
                    </View>
                </SafeAreaView>
            </View>

           
            <AnimatedPopupForm isMoved={isScaledUpward} startX={0} startY={screenHeight} endY={0} duration={300}>
                <SectionedJournalEntryForm 
                onClose={() => formClose()} 
                onSaveForm={formSuccessAnimation}
                onAnimationHasReducedSize={() => setBackgroundIsScaledUpward(false)}
                />
            </AnimatedPopupForm>
        </View>
    )
}

export default SpaceWalk;