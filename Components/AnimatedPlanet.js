import { RECORDING_OPTION_IOS_BIT_RATE_STRATEGY_CONSTANT } from "expo-av/build/Audio";
import React, {useEffect, useRef } from "react"
import {View, Text, TouchableWithoutFeedback, Animated, Easing} from "react-native"

const AnimatedPlanet = ({radius=20, icon, debugText, startAngle, size=50, speedModifier=200, highlighted, onPress=function(){}}) => {
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

    const slop = size/4;

    return(
        <Animated.View pointerEvents="box-none" style={[animStyle, {position: "absolute", width: radius+size, height: radius+size, backgroundColor: debugText ? "rgba(255,255,255,0.2)" : null}]}>
           <TouchableWithoutFeedback onPress={onPress} hitSlop={{top: slop, bottom: slop, left: slop, right: slop}}>
                <View style={{height: size, width: size, position: "absolute"}}>
                {icon}
                <View style={{
                    height: size, 
                    width: size,
                    position: "absolute",
                    backgroundColor: highlighted ? "rgba(255,255,0,0.2)" : null,
                    borderRadius: size
                    }} />
                </View>
            </TouchableWithoutFeedback>
            <Text style={{color: "black", position: "absolute"}}> {debugText} </Text>
        </Animated.View>
    )
}

export default AnimatedPlanet;