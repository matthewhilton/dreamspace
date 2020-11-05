import React, {useState, useRef, useEffect} from "react"
import { View, Dimensions, PanResponder, Animated } from "react-native";
import { Button, IconButton, withTheme } from "react-native-paper"
import { useDispatch, useSelector } from "react-redux";
import AnimatedPlanet from "./AnimatedPlanet";
import AnimatedPopupForm from "./AnimatedPopupForm";
import SectionedJournalEntryForm from "./SectionedJournalEntryForm";
import Planet3Icon from "../Images/Planet3Icon";
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';
import Icon from 'react-native-vector-icons/FontAwesome5';

const SpaceWalk = (props) => {
    const screenHeight = Dimensions.get("screen").height;
  
    const [planetData, setPlanetData] = useState([])

    const dispatch = useDispatch();

    const tags = useSelector(state => state.tags)

    // Find the middle of the screen to begin
    const midX = Dimensions.get("screen").width / 2;
    const midY = Dimensions.get("screen").height / 2;

    const [isScaledUpward, setIsScaledUpward ] = useState(false)
    const [backgroundScaledUpward, setBackgroundIsScaledUpward] = useState(false)

    const [planetSelected, setPlanetSelected] = useState(null)

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

    

    // In the store, matches planets to tags, and adds/removes as necessary
    // Returns a list of planets to store in the redux store
    function matchTagsToPlanets(tags){
        let planets = [];

        const radiusStep = 80 // <-- TODO make this step dependent on the size of the planet
        let currentRadius = 50; // Start at 50 so the centre can have custom icon inside

        for(const tag of tags){
            let planetIcon = <Planet3Icon />; // <-- TODO generate image based on factors about tag such as size and color
            let planetSize = 20 + Math.random()*40;
            
            currentRadius += Math.round(planetSize/2+1)

            planets.push({
                tag: tag.name,
                icon: planetIcon,
                size: planetSize,
                radius: currentRadius,
                startAngle: Math.random()*360,
            })

            currentRadius += radiusStep;
        }

        return planets;
    }
    return(
            <View style={{height: "200%", backgroundColor: props.theme.colors.mainScreenBackground || "white"}}>
              
                <View style={{height: screenHeight, width: screenHeight, alignSelf: 'center'}}>
                    <ReactNativeZoomableView 
                    bindToBorders={false} 
                    movementSensibility={1}
                    doubleTapDelay={0}
                    onZoomAfter={() => {}}
                    maxZoom={1.3}
                    minZoom={0.7}
                    >
                        <View style={{height: '100%', width: "100%", alignItems: "center", justifyContent: "center"}}>
                            <AnimatedPlanet 
                                size={40}
                                radius={0}
                                icon={<Icon name="brain" style={{color: "white"}} size={35} />}
                                startAngle={0}
                                centreCoordinate={{x: midX, y: midY}}
                                />
                            
                            {planetData.map((planet) => (
                                <AnimatedPlanet
                                highlighted={planet.tag == planetSelected}
                                onPress={() => setPlanetSelected(planet.tag)}
                                key={planet.tag}
                                size={planet.size}
                                radius={planet.radius}
                                startAngle={planet.startAngle}
                                centreCoordinate={{x: midX, y: midY}}
                                icon={planet.icon }
                                />
                            ))}
                        
                        </View>
                    </ReactNativeZoomableView>
                </View>
                
                {planetSelected === null ?
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
                    :   
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
                    {
                        // TODO put some stuff in here with a pullup sheet on information about the "planet"
                    }
                    <Button> Planet Selected </Button>
                    <Button onPress={() => setPlanetSelected(null)}> Close </Button>
                </View>

            }       

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