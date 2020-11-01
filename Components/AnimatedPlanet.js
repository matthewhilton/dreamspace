import React, {useEffect, useRef } from "react"
import {View, Text, Animated, Easing} from "react-native"
import MoonCartoonIcon from "../Images/MoonCartoonIcon"


const AnimatedPlanet = ({radius=20, icon, debugText, startAngle, size=50, speedModifier=200}) => {
    const positionRef = useRef(new Animated.Value(0)).current;
    const range = positionRef.interpolate({
        inputRange: [0,1],
        outputRange: [String(startAngle)+'deg', String(startAngle+360)+'deg']
    })

    useEffect(() => {
        Animated.loop(
            Animated.timing(positionRef, {
                toValue: 1,
                duration: radius*speedModifier,
                useNativeDriver: true,
                easing: Easing.linear
            })
        ).start()
    }, [])

    const animStyle = {
        transform: [{
            rotate: range
        }]
    };


    /*
    const positionRef = useRef(new Animated.Value(0)).current;
    const yVal = positionRef.interpolate({
        inputRange: [0, 1],
        outputRange: [startY-size/2, endY-size/2],
    });

    

    useEffect(() => {
        Animated.timing(positionRef, {
            toValue: isMoved ? 1 : 0,
            duration: duration,
            useNativeDriver: true,
            easing: Easing.bezier(0.455, 0.03, 0.515, 0.955),
          }).start();
    }, [isMoved])*/

    console.log(radius)
    
    return(
        <Animated.View style={[animStyle, {position: "absolute", width: radius+size, height: radius+size, backgroundColor: debugText ? "rgba(255,255,255,0.2)" : null}]}>
            <View style={{height: size, width: size, position: "absolute"}}>
                {icon}
            </View>
            <Text style={{color: "black", position: "absolute"}}> {debugText} </Text>
        </Animated.View>
    )
}

export default AnimatedPlanet;