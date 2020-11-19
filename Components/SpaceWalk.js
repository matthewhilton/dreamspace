import React, {useState, useRef, useEffect} from "react"
import { View, Dimensions, PanResponder, Animated, Image, ImageBackground} from "react-native";
import { Button, IconButton, withTheme, Text } from "react-native-paper"
import { useDispatch, useSelector } from "react-redux";
import AnimatedPlanet from "./AnimatedPlanet";
import AnimatedPopupForm from "./AnimatedPopupForm";
import SectionedJournalEntryForm from "./SectionedJournalEntryForm";
import Planet3Icon from "../Images/Planet3Icon";
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MoonCartoonIcon from "../Images/MoonCartoonIcon"
import PlanetSummaryBottomForm from "./PlanetSummaryBottomForm";
import { DrawerActions, useNavigation } from "@react-navigation/native";

const SpaceWalk = (props) => {
    
    useEffect(() => {
        if(props.route.params && props.route.params.autoOpenForm === true){
            openForm();
        }
    }, [props.route.params])

    const screenHeight = Dimensions.get("screen").height;
  
    const [planetData, setPlanetData] = useState([])

    const dispatch = useDispatch();
    const nav = useNavigation()

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
    }

    function openForm(){
        setIsScaledUpward(true)
        setBackgroundIsScaledUpward(true)
    }

    function openMenu(){
        nav.dispatch(DrawerActions.openDrawer());
    }

    function planetPressed(planet){
        if(planet === planetSelected){
            setPlanetSelected(null)
        } else {
            setPlanetSelected(planet)
        }
    }

    // In the store, matches planets to tags, and adds/removes as necessary
    // Returns a list of planets to store in the redux store
    function matchTagsToPlanets(tags){
        let planets = [];

        const radiusStep = 50 // <-- TODO make this step dependent on the size of the planet
        let currentRadius = 50; // Start at 50 so the centre can have custom icon inside

        for(const tag of tags){
            if(tag.used > 0){
                let planetIcon = Math.random()*10 > 5 ? <Planet3Icon /> : <MoonCartoonIcon />; // <-- TODO generate image based on factors about tag such as size and color
                let planetSize = 20 + tag.used*5; // TODO make this a logairthm / not linear function
                
                currentRadius += Math.round(planetSize/2+1)
                currentRadius += radiusStep;
    
                planets.push({
                    tag: tag.name,
                    tagUUID: tag.uuid,
                    icon: planetIcon,
                    size: planetSize,
                    radius: currentRadius,
                    startAngle: Math.random()*360,
                }) 
            }
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

                                {planetData.map((planet) => {
                                    const circularOrbitSize = Math.sqrt(Math.pow(planet.radius,2)+Math.pow(planet.radius,2))
                                    return(
                                    <View 
                                    key={planet.tag + "_orbit_view"}
                                    style={{
                                        position: "absolute",
                                        width: circularOrbitSize,
                                        height: circularOrbitSize,
                                        borderRadius: circularOrbitSize,
                                        borderColor: props.theme.colors.orbit || "white",
                                        borderWidth: 2
                                    }}
                                />
                                )})}
                            
                            {planetData.map((planet) => (
                                <AnimatedPlanet
                                highlighted={planet.tag == (planetSelected ? planetSelected.tag : null)}
                                onPress={() => planetPressed(planet)}
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
                
                <View style={{
                    flexDirection: "row", 
                    width: "100%", 
                    alignItems: 'center', 
                    position: "absolute", 
                    width: "100%", 
                    bottom: Dimensions.get("screen").height + 30, 
                    left: 0,
                    right: 0,
                    padding: 20,
                    flex: 1,       
                    }}>              
                    <View style={{flexDirection: 'row', width: "100%", justifyContent: "space-between", alignItems: 'center'}}>
                        <IconButton icon={"menu"} onPress={openMenu}/>

                        <Button 
                        icon={"pencil"}
                        onPress={openForm} 
                        mode="contained"
                        
                        > New Entry </Button>
                    </View>   
                </View>
                  
                <AnimatedPopupForm isMoved={planetSelected !== null} startX={0} startY={screenHeight} endY={screenHeight - 210} duration={150}>
                    <PlanetSummaryBottomForm 
                    planet={planetSelected} 
                    height={210} 
                    onClose={() => setPlanetSelected(null)}
                    onView={() => {
                        ///TODO
                    }}
                    />
                </AnimatedPopupForm>
                  
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