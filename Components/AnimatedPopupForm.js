import React, {useEffect, useRef, useState } from "react"
import {View} from "react-native"
import Animated, { Easing } from "react-native-reanimated";

const AnimatedPopupForm = ({isMoved: isPoppedUp, duration=500, startX=100, startY=100, endY=200, color="red", isRendered=true,onAnimatedBottomFinish=function(){}, ...props}) => {
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

    const [isFormRendered, setIsFormRendered] = useState(true)

    useEffect(() => {
        Animated.timing(formAnimationRef, {
            toValue: isPoppedUp ? 1 : 0,
            duration: duration,
            useNativeDriver: true,
            easing: Easing.bezier(0.785, 0.135, 0.15, 0.86),
          }).start(() => {
              // After closing form, wait for animation to finish before de-rendering
              if(isPoppedUp == false){
                  setIsFormRendered(false)
                  onAnimatedBottomFinish()
              } 
          });

          if(isPoppedUp){
              setIsFormRendered(true)
          }
    }, [isPoppedUp])
    
    return(
        <View style={{position: "absolute", top: 0, left: 0, right: 0}} >
            <Animated.View style={animStyle}>
                {isFormRendered ? props.children : null}
            </Animated.View>
        </View>
    )
}

export default AnimatedPopupForm;