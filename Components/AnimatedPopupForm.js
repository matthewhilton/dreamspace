import React, {useEffect, useRef } from "react"
import {View} from "react-native"
import Animated, { Easing } from "react-native-reanimated";

const AnimatedPopupForm = ({isMoved, duration=500, startX=100, startY=100, endY=200, color="red", ...props}) => {
    const formAnimationRef = useRef(new Animated.Value(0)).current;
    
    const yVal = formAnimationRef.interpolate({
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
        Animated.timing(formAnimationRef, {
            toValue: isMoved ? 1 : 0,
            duration: duration,
            useNativeDriver: true,
            easing: Easing.bezier(0.785, 0.135, 0.15, 0.86),
          }).start();
    }, [isMoved])
    
    return(
        <Animated.View style={animStyle}>
            {props.children}
        </Animated.View>
    )
}

export default AnimatedPopupForm;