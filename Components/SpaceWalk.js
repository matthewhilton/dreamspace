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
import { getNativeSourceAndFullInitialStatusForLoadAsync } from "expo-av/build/AV";
import { cos } from "react-native-reanimated";

const SpaceWalk = (props) => {
    const screenHeight = Dimensions.get("screen").height;

    const planetMovementOffset = 200;

    // Have to use this hacky solution with a ref so that the PanResponder ref can access the updated state
    const [planetOffsetPositions, _setPlanetOffsetPositions] = useState([])
    const planetOffsetPositionsRef = useRef(planetOffsetPositions)
    const setPlanetOffsetPositions = data => {
        planetOffsetPositionsRef.current = data
        _setPlanetOffsetPositions(data)
      }

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

    // Whenever the store changes, update the planet offset positions as well to match.
    useEffect(() => {
        let offsets = [];
        for(const planet of planets){
            offsets.push({
                x: planet.x,
                y: planet.y,
                originX: planet.x,
                originY: planet.y
            })
        }
        
        setPlanetOffsetPositions(offsets);
    }, [planets])

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
                let newPlanetPositions = [...planetOffsetPositionsRef.current]

                for(var i = 0; i < newPlanetPositions.length; i++){
                    newPlanetPositions[i].x = newPlanetPositions[i].originX + gestureState.dx;
                    newPlanetPositions[i].y = newPlanetPositions[i].originY + gestureState.dy;
                }
    
                if(atLeastOneVisible){
                    setPlanetOffsetPositions(newPlanetPositions)
                }
            }
          },
          onPanResponderRelease: () => {
              
            // Update the origin for each planet
            let newPlanetPositions = [...planetOffsetPositionsRef.current]
            for(const [i, position] of newPlanetPositions.entries()){
                newPlanetPositions[i].originX = position.x;
                newPlanetPositions[i].originY = position.y;
            }
            setPlanetOffsetPositions(newPlanetPositions)
            
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
                let emptyPosition = generateOrbitPositon(matchedPlanets);
                let planetIcon = <Planet3Icon /> // <-- TODO generate image based on factors about tag

                matchedPlanets.push(new Planet(emptyPosition.x,emptyPosition.y, tag.name, planetIcon));
            }
        }

        return matchedPlanets;
    }

    /*
        Generates an "orbit" position similar to those in real orbits,
        which form layers of rings extending further and further out.

        returns an object with x,y properties corresponding to the screen coordinates
    */
    function generateOrbitPositon(currentPlanetPositions, gap=60, width=50){
        let numOrbits = currentPlanetPositions.length;

        // Find the middle of the screen to begin
        let midX = Dimensions.get("screen").width / 2;
        let midY = Dimensions.get("screen").height / 2;

        // No calculations necessary
        if(numOrbits == 0){
            return({
                x: midX,
                y: midY
            })
        } else {
            // Generate a random angle between 0 and 90 degrees (converted to radians), 
            // and then use trigonometry to calculate the x,y coordinates
            let theta = Math.random()*Math.PI*2;
            let radius = numOrbits*gap;

            // Calculate the x and y components, and then randomly flip them to get the full angle of 360 degrees
            let unitCoordinate = generateUnitCoordinateFromAngle(theta);
            return({
                x: midX+(unitCoordinate.x*radius),
                y: midY+(unitCoordinate.y*radius),
            })
        }
    }

    function generateUnitCoordinateFromAngle(theta){
        let x = Math.sin(theta);
        let y = Math.cos(theta);

        return({
            x,y
        })
    }

    function generateFlip(){
        const val = Math.random();
        if(val > 0.5){
            return 1;
        } else {
            return -1;
        }
    }

    // Finds an empty spot, starting from the middle of the screen and going outwards radially.
    function findEmptyPosition(currentPlanetPositions){
        // Find the middle of the screen
        let midX = Dimensions.get("screen").width / 2;
        let midY = Dimensions.get("screen").height / 2;

        let testPos = {x: midX, y: midY}

        // Now find an empty position
        while(true){
            // Add random steps of between -5 and 5
            testPos.x += Math.floor(Math.random()*10-5)
            testPos.y += Math.floor(Math.random()*10-5)
            
            if(isEmptyPlanetPosition(testPos, currentPlanetPositions)){
                // Spot is empty, so return position
                return testPos;
            } 
        }
    }

    function isEmptyPlanetPosition(position, planetPositions){
        const planetSize = 70;
        for(const planetPos of planetPositions){
            if(isCoordinateWithin(position, planetPos, planetSize)){
                return false;
            }
        }

        return true;
    }

    function isCoordinateWithin(testCoordinate, obstructionCoordinate, width){
        // Test if their midpoints are within 'width' distance of each other
        testCoordinate.x += width/2;
        obstructionCoordinate.y += width/2;
        testCoordinate.x += width/2;
        obstructionCoordinate.y += width/2;

        if(Math.abs(testCoordinate.x - obstructionCoordinate.x) < width && Math.abs(testCoordinate.y - obstructionCoordinate.y) < width){
            return true;
        } else {
            return false;
        }
    }

    return(
            <View style={{height: "200%", backgroundColor: props.theme.colors.mainScreenBackground || "white"}} {...panResponder.panHandlers}>
            
                    <View>
                        {planets.length == planetOffsetPositions.length ? planets.map((object, i) => (
                            <AnimatedPlanet 
                            key={i}
                            index={i}
                            isMoved={backgroundScaledUpward} 
                            startX={planetOffsetPositions[i].x} 
                            startY={planetOffsetPositions[i].y} 
                            endY={planetOffsetPositions[i].y-(planetMovementOffset*((screenHeight-planetOffsetPositions[i].y)/screenHeight*0.2))} 
                            duration={300}
                            icon={object.image}
                            />
                        )) : null}
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
                        <IconButton icon={"menu"} onPress={() => {dispatch({type: "NUKE"})}}/>
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