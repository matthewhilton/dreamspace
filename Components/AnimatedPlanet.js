import React, {useEffect, useRef } from "react"
import {View} from "react-native"
import Animated, { Easing } from "react-native-reanimated";

const AnimatedPlanet = ({isMoved, duration=500, startX=100, startY=100, endY=200}) => {
    const circleVal = useRef(new Animated.Value(0)).current;
    
    const yVal = circleVal.interpolate({
        inputRange: [0, 1],
        outputRange: [startY, endY],
    });

    const animStyle = {
        transform: [
            {
            translateX: startX,
            translateY: yVal,
            },
        ],
    };

    useEffect(() => {
        Animated.timing(circleVal, {
            toValue: isMoved ? 1 : 0,
            duration: duration,
            useNativeDriver: true,
            easing: Easing.bezier(0.785, 0.135, 0.15, 0.86),
          }).start();
    }, [isMoved])
    
    return(
        <Animated.View style={animStyle}>
            <View style={{backgroundColor: "red", width: 50, height: 50}} />
        </Animated.View>
    )
}

export default AnimatedPlanet;