import React, {useState, useRef} from "react"
import { View, Dimensions, Button } from "react-native";
import { Text } from "react-native-paper"
import Animated, { Easing } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { circle } from "react-native/Libraries/Animated/src/Easing";
import AnimatedPlanet from "./AnimatedPlanet";
import Circle from "./Circle";


const SpaceWalk = (props) => {
    const [planetPositions, setPlanetPositions] = useState([
        {x: 10, y: 100},
        {x: 20, y: 200},
        {x: 50, y: 300}
    ])

    const planetMovementOffset = 100;


    const [formYPos, setFormYPos] = useState(0)

    const [slideFactor, setSlideFactor] = useState(1)

    const [isOpen, setIsOpen ] = useState(false)

    const bottomFormHeight = 300;

    return(
        <View style={{height: "200%"}}>
            <View style={{flexDirection: "row"}}>
                {planetPositions.map(coordinates => (
                    <AnimatedPlanet 
                    isMoved={isOpen} 
                    startX={coordinates.x} 
                    startY={coordinates.y} 
                    endY={coordinates.y-(planetMovementOffset*((Dimensions.get("screen").height-coordinates.y)/Dimensions.get("screen").height))} />
                ))}
           </View>
           
            <View style={{position: "absolute", top: Dimensions.get('screen').height-200, left:0,width: "100%", height: 200, backgroundColor: "black"}}>
                <Text> Toolbar </Text>
                <Button onPress={() => setIsOpen(!isOpen)} title="open form" />
            </View>

            <View style={{
                height: bottomFormHeight, 
                width: "100%",
                backgroundColor: "blue", 
                position: "absolute", 
                left: 0,
                top: Dimensions.get('screen').height-formYPos
                }}>
                
            </View>
        </View>
    )
}

export default SpaceWalk;