import React, {useState, useRef, useEffect} from "react"
import { View, Dimensions, PanResponder, Animated } from "react-native";
import { Button, IconButton, withTheme } from "react-native-paper"
import { useDispatch, useSelector } from "react-redux";
import AnimatedPlanet from "./AnimatedPlanet";
import AnimatedPopupForm from "./AnimatedPopupForm";
import SectionedJournalEntryForm from "./SectionedJournalEntryForm";
import Planet3Icon from "../Images/Planet3Icon";
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';

const SpaceWalk = (props) => {
    const screenHeight = Dimensions.get("screen").height;
    const screenWidth = Dimensions.get("screen").width;

    // Have to use this hacky solution with a ref so that the PanResponder ref can access the updated state
    const [planetData, _setPlanetData] = useState([])
    const planetDataRef = useRef(planetData)
    const setPlanetData = data => {
        planetDataRef.current = data
        _setPlanetData(data)
      }

    const dispatch = useDispatch();

    const tags = useSelector(state => state.tags)

    // Find the middle of the screen to begin
    const midX = Dimensions.get("screen").width / 2;
    const midY = Dimensions.get("screen").height / 2;

    const [panResponderEnabled, _setPanResponderEnabled] = useState(true)
    const panResponderEnabledRef = useRef(panResponderEnabled)

    const [isScaledUpward, setIsScaledUpward ] = useState(false)
    const [backgroundScaledUpward, setBackgroundIsScaledUpward] = useState(false)

    // Update the planets whenever the tags changes
    useEffect(() => {
        setPlanetData(matchTagsToPlanets(tags))
    }, [tags])

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
                if(gestureState.numberActiveTouches === 2){
                    console.log("double touch")
                } else if(gestureState.numberActiveTouches === 1){
                    console.log("single touch")
                }
            }
          },
          onPanResponderRelease: () => {
            
          }
        })
      ).current;

    // In the store, matches planets to tags, and adds/removes as necessary
    // Returns a list of planets to store in the redux store
    function matchTagsToPlanets(tags){
        let planets = [];

        const radiusStep = 80 // <-- TODO make this step dependent on the size of the planet
        let currentRadius = 50;

        for(const tag of tags){
            let planetIcon = <Planet3Icon />; // <-- TODO generate image based on factors about tag such as size and color
            let planetSize = 10 + Math.random()*40;

            planets.push({
                tag: tag.name,
                icon: planetIcon,
                size: planetSize,
                radius: currentRadius
            })

            currentRadius += radiusStep;
        }

        return planets;
    }

    return(
            <View style={{height: "200%", backgroundColor: props.theme.colors.mainScreenBackground || "white"}}>
              
                <View style={{height: screenHeight, width: screenHeight, alignSelf: 'center'}}>
                <ReactNativeZoomableView bindToBorders={false} zoomCenteringLevelDistance={100} movementSensibility={1}>
                    <View style={{height: '100%', width: "100%", alignItems: "center", justifyContent: "center"}}>
                   
                        {planetData.map((planet) => (
                            <AnimatedPlanet 
                            key={planet.tag}
                            size={planet.size}
                            radius={planet.radius}
                            startAngle={Math.random()*360}
                            centreCoordinate={{x: midX, y: midY}}
                            icon={planet.icon}
                            />
                        ))}
                       
                    </View>
                    </ReactNativeZoomableView>
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