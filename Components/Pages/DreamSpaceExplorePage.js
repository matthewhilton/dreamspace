import React, {useEffect, useState} from "react"
import {Dimensions, View} from "react-native";
import {Button, IconButton, withTheme} from "react-native-paper"
import AnimatedPlanet from "../Display/AnimatedPlanet";
import AnimatedPopupForm from "../Containers/AnimatedPopupForm";
import SectionedJournalEntryForm from "../Journal/SectionedJournalEntryForm";
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';
import PlanetSummaryBottomForm from "../Display/PlanetSummaryBottomForm";
import {DrawerActions, useNavigation} from "@react-navigation/native";
import usePlanets from "../../Hooks/UsePlanets";

const DreamSpaceExplorePage = ({navigation, ...props}) => {
    
    // TODO change this to a nested route 
    useEffect(() => {
        if(props.route.params && props.route.params.autoOpenForm === true){
            openForm();
        }
    }, [props.route.params])

    const screenHeight = Dimensions.get("screen").height;
    const nav = useNavigation()
    const {generatedPlanets} = usePlanets();

    const [planetSelected, setPlanetSelected] = useState(null)

    // Find the middle of the screen to begin
    const midX = Dimensions.get("screen").width / 2;
    const midY = Dimensions.get("screen").height / 2;

    const [isScaledUpward, setIsScaledUpward ] = useState(false)

    const formSuccessAnimation = () => {
        setIsScaledUpward(false)
    }

    const formClose = () => {
        setIsScaledUpward(false)
    }

    const openForm = () => {
        setIsScaledUpward(true)
    }

    const openMenu = () => {
        nav.dispatch(DrawerActions.openDrawer());
    }

    const planetPressed = (planet) => {
        setPlanetSelected(planet)
    }

    const onPlanetView = () => {
        navigation.navigate("Tags", { screen: 'TagDetailView', params: { tagUUID: planetSelected.uuid}})
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
                                icon={-1}
                                startAngle={0}
                                centreCoordinate={{x: midX, y: midY}}
                                />

                                {generatedPlanets.map((tagWithPlanet) => {
                                    const circularOrbitSize = Math.sqrt(Math.pow(tagWithPlanet.planet.radius,2)+Math.pow(tagWithPlanet.planet.radius,2))
                                    return(
                                        <View 
                                        key={tagWithPlanet.uuid + "_ORBIT_VIEW"}
                                        style={{
                                            position: "absolute",
                                            width: circularOrbitSize,
                                            height: circularOrbitSize,
                                            borderRadius: circularOrbitSize,
                                            borderColor: props.theme.colors.orbit || "white",
                                            borderWidth: 2
                                        }}
                                    />)
                                })}
                            
                            {generatedPlanets.map((tagWithPlanet) =>  (
                                <AnimatedPlanet
                                highlighted={planetSelected ? tagWithPlanet.uuid == planetSelected.uuid : false}
                                onPress={() => planetPressed(tagWithPlanet)}
                                key={tagWithPlanet.uuid + "_PLANET"}
                                size={tagWithPlanet.planet.size}
                                radius={tagWithPlanet.planet.radius}
                                startAngle={tagWithPlanet.planet.startAngle}
                                centreCoordinate={{x: midX, y: midY}}
                                icon={tagWithPlanet.planet.icon }
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
                        uuid={planetSelected ? planetSelected.uuid : null} 
                        height={210} 
                        onClose={() => setPlanetSelected(null)}
                        onView={onPlanetView}
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

export default withTheme(DreamSpaceExplorePage);