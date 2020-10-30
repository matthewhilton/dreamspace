import React, {useState, useRef, useEffect} from "react"
import { View, Dimensions, PanResponder, Animated } from "react-native";
import { Button, IconButton, withTheme } from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context";
import { circle } from "react-native/Libraries/Animated/src/Easing";
import { useDispatch } from "react-redux";
import AnimatedPlanet from "./AnimatedPlanet";
import AnimatedPopupForm from "./AnimatedPopupForm";
import Circle from "./Circle";
import SectionedJournalEntryForm from "./SectionedJournalEntryForm";

import FormSuccessIndicator from "./FormSuccessIndicator"
import MoonCartoonIcon from "../Images/MoonCartoonIcon";
import Planet2Icon from "../Images/Planet2Icon"
import Planet3Icon from "../Images/Planet3Icon";
import { PanGestureHandler } from "react-native-gesture-handler";

const SpaceWalk = (props) => {
    const screenHeight = Dimensions.get("screen").height;

    const [planetPositions, setPlanetPositions] = useState([
        {x: 10, y: 100, originX: 10, originY: 100, icon: <MoonCartoonIcon />},
        {x: 20, y: 200, originX: 20, originY: 200, icon: <Planet3Icon />},
        {x: 50, y: 300, originX: 50, originY: 300, icon: <MoonCartoonIcon />},
        {x: 35, y: 500, originX: 35, originY: 500, icon: <Planet3Icon />}
    ])

    const planetMovementOffset = 200;

    const dispatch = useDispatch();

    const [panResponderEnabled, _setPanResponderEnabled] = useState(true)
    const panResponderEnabledRef = useRef(panResponderEnabled)

    const [isScaledUpward, setIsScaledUpward ] = useState(false)
    const [backgroundScaledUpward, setBackgroundIsScaledUpward] = useState(false)

    function formSuccessAnimation(){
        setIsScaledUpward(false)
        setBackgroundIsScaledUpward(false)
    }

    function formClose(){
        setIsScaledUpward(false)
        setBackgroundIsScaledUpward(false)
        setPanResponderEnabled(true)
    }

    function openForm(){
        setIsScaledUpward(true)
        setBackgroundIsScaledUpward(true)
        setPanResponderEnabled(false)
    }

    const setPanResponderEnabled = data => {
        panResponderEnabledRef.current = data
        _setPanResponderEnabled(data)
      }



    const pan = useRef(new Animated.ValueXY()).current;
    const panResponder = useRef(
        PanResponder.create({
          onMoveShouldSetPanResponder: (evt, gestureState) => {
            // Instead of => true, this prevent the sencibility of the span.
            const { dx, dy } = gestureState;
            return dx > 2 || dx < -2 || dy > 2 || dy < -2;
            },
          onPanResponderGrant: () => {
            //console.log(pan)
          },
          onPanResponderMove: (evt, gestureState) => {
            if(panResponderEnabledRef.current){
                let newPlanetPositions = [...planetPositions]

                for(var i = 0; i < newPlanetPositions.length; i++){
                    newPlanetPositions[i].x = newPlanetPositions[i].originX + gestureState.dx;
                    newPlanetPositions[i].y = newPlanetPositions[i].originY + gestureState.dy;
                }
    
                if(atLeastOneVisible){
                    setPlanetPositions(newPlanetPositions)
                }
            }
           
            
          },
          onPanResponderRelease: () => {
            // Update the origin for each planet
            let newPlanetPositions = [...planetPositions]
            for(const [i, position] of newPlanetPositions.entries()){
                newPlanetPositions[i].originX = position.x;
                newPlanetPositions[i].originY = position.y;
            }
            setPlanetPositions(newPlanetPositions)
          }
        })
      ).current;

    // Determines if one element is within the bounds of the screen
    function atLeastOneVisible(coordinates){
        // These are the bounds of the screen
        const minX = 0;
        const minY = 0;
        const maxY = Dimensions.get("screen").height;
        const maxX = Dimensions.get("screen").width;        

        for(const position of coordinates){
            if(position.x > minX && position.x < maxX && position.y > minY && position.y < maxY){
                // This one is visible (within the bounds)
                return true;
            }
        }

        // None found within bounds,
        return false;
    }

    return(
            <View style={{height: "200%", backgroundColor: props.theme.colors.mainScreenBackground || "white"}} {...panResponder.panHandlers}>
            
                    <View style={{flexDirection: "row"}}>
                        {planetPositions.map((coordinates, i) => (
                            <AnimatedPlanet 
                            key={i}
                            isMoved={backgroundScaledUpward} 
                            startX={coordinates.x} 
                            startY={coordinates.y} 
                            endY={coordinates.y-(planetMovementOffset*((screenHeight-coordinates.y)/screenHeight*0.2))} 
                            duration={300}
                            icon={coordinates.icon}
                            />
                        ))}
                    </View>
            

            <View style={{
                flexDirection: "row", 
                width: "100%", 
                alignItems: 'center', 
                position: "absolute", 
                width: "100%", 
                bottom: Dimensions.get("screen").height +20, 
                left: 0,
                right: 0,
                padding: 10
                }}>
                        <View style={{flex: 1, margin: 5}}>
                            <Button onPress={() => {
                                openForm()
                               
                                }} mode="contained" > New Entry </Button>
                        </View>

                        <View style={{margin: 5}}>
                        <IconButton icon={"menu"}/>
                        </View>
                </View>

                <AnimatedPopupForm isMoved={isScaledUpward} startX={0} startY={screenHeight} endY={40} duration={300}>
                    <SectionedJournalEntryForm 
                    onClose={() => formClose()} 
                    onSaveForm={formSuccessAnimation}
                    onAnimationHasReducedSize={() => setBackgroundIsScaledUpward(false)}
                    />
                </AnimatedPopupForm>
            </View>
    )
}

export default withTheme(SpaceWalk);