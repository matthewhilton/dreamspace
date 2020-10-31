import React, {useState, useRef, useEffect} from "react"
import { View, Dimensions, PanResponder, Animated } from "react-native";
import { Button, IconButton, withTheme } from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context";
import { circle } from "react-native/Libraries/Animated/src/Easing";
import { useDispatch, useSelector } from "react-redux";
import AnimatedPlanet from "./AnimatedPlanet";
import AnimatedPopupForm from "./AnimatedPopupForm";
import Circle from "./Circle";
import SectionedJournalEntryForm from "./SectionedJournalEntryForm";

import FormSuccessIndicator from "./FormSuccessIndicator"
import MoonCartoonIcon from "../Images/MoonCartoonIcon";
import Planet2Icon from "../Images/Planet2Icon"
import Planet3Icon from "../Images/Planet3Icon";
import { PanGestureHandler } from "react-native-gesture-handler";
import Planet from "../Planet";

const SpaceWalk = (props) => {
    const screenHeight = Dimensions.get("screen").height;

    const planetMovementOffset = 200;

    const dispatch = useDispatch();

    const tags = useSelector(state => state.tags)
  
    const planets = useSelector(state => state.planets)

    // Update the planets when the tags changes
    useEffect(() => {
        const newPlanets = matchTagsToPlanets(tags, planets)
       // console.log("tags changed, ",tags,"updating planets to")
     //   console.log(newPlanets)
        dispatch({
            object: "PLANET",
            type: "REPLACE",
            data: newPlanets
        })
    }, [tags])

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
            
                let newPlanetPositions = [...planets]

                for(var i = 0; i < newPlanetPositions.length; i++){
                    newPlanetPositions[i].x = newPlanetPositions[i].originX + gestureState.dx;
                    newPlanetPositions[i].y = newPlanetPositions[i].originY + gestureState.dy;
                }
    
                if(atLeastOneVisible){
                   
                    dispatch({
                        object: "PLANET",
                        type: "REPLACE",
                        data: newPlanetPositions
                    })
                }
            }
           
            
          },
          onPanResponderRelease: () => {
            // Update the origin for each planet
            let newPlanetPositions = [...planets]
            for(const [i, position] of newPlanetPositions.entries()){
                newPlanetPositions[i].originX = position.x;
                newPlanetPositions[i].originY = position.y;
            }

            dispatch({
                object: "PLANET",
                type: "REPLACE",
                data: newPlanetPositions
            })
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

    // In the store, matches planets to tags, and adds/removes as necessary
    // Returns a list of planets to store in the redux store
    function matchTagsToPlanets(currentTags, currentPlanets){
        let matchedPlanets = [];
        const tagTagNames = [...currentTags].filter((item) => item.name)

        // Go through every current planet and ensure there is a tag for it currently, add them to the matched planets
        // Want to preserve the current planets
        for(const planet of currentPlanets){
            // If there is a tag still for this planet (preserve planet)
            if(tagTagNames.includes(planet.tagName)){
                matchedPlanets.push(planet)
            }
        }

        const planetTagNames = [...matchedPlanets].filter((item) => item.tagName)
                
        // Now see if there are any new tags without planets (create new planet if this is the case)
        for(const tag of currentTags){
            // If there is no planet for this tag (create new planet)
            if(!planetTagNames.includes(tag.name)){
                let x = 50; // <--- TODO generate random position not occupied yet 
                let y = 50;
                let planetIcon = <Planet3Icon /> // <-- TODO generate image based on factors about tag

                matchedPlanets.push(new Planet(x,y, tag.name, planetIcon));
            }
        }

        return matchedPlanets;
    }

    return(
            <View style={{height: "200%", backgroundColor: props.theme.colors.mainScreenBackground || "white"}} {...panResponder.panHandlers}>
            
                    <View style={{flexDirection: "row"}}>
                        {planets.map((object, i) => (
                            <AnimatedPlanet 
                            key={i}
                            isMoved={backgroundScaledUpward} 
                            startX={object.x} 
                            startY={object.y} 
                            endY={object.y-(planetMovementOffset*((screenHeight-object.y)/screenHeight*0.2))} 
                            duration={300}
                            icon={object.image}
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