import React, {useEffect, useRef } from "react"
import {View, Text} from "react-native"
import Animated, { Easing } from "react-native-reanimated";
import MoonCartoonIcon from "../Images/MoonCartoonIcon"


const AnimatedPlanet = ({isMoved, duration=500, startX=100, startY=100, endY=200, color="red", icon, index}) => {
    const size = 50;


    const positionRef = useRef(new Animated.Value(0)).current;
    const yVal = positionRef.interpolate({
        inputRange: [0, 1],
        outputRange: [startY-size/2, endY-size/2],
    });

    const animStyle = {
        transform: [
            {
            translateX: startX-size/2,
            translateY: yVal,
            },
        ],
    };

    useEffect(() => {
        Animated.timing(positionRef, {
            toValue: isMoved ? 1 : 0,
            duration: duration,
            useNativeDriver: true,
            easing: Easing.bezier(0.455, 0.03, 0.515, 0.955),
          }).start();
    }, [isMoved])
    
    return(
        <Animated.View style={[animStyle, {position: "absolute"}]}>
            <View style={{height: size, width: size}}>
                {icon}
            </View>
            <Text style={{color: "black", position: "absolute"}}> {index} </Text>
        </Animated.View>
    )
}

export default AnimatedPlanet;