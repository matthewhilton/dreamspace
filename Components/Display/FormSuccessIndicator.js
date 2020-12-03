import React, {useEffect, useRef} from 'react'
import {Dimensions, View} from 'react-native'
import * as Haptics from "expo-haptics"
import LottieView from 'lottie-react-native';

const FormSuccessIndicator = (props) => {
    const screenHeight = Dimensions.get("screen").height;
    const screenWidth = Dimensions.get("screen").width;

    const height = screenHeight / 3;
    const width = screenWidth / 2;

    const lottieRef = useRef();

    useEffect(() => {
        lottieRef.current.play()
        setTimeout(() => Haptics.notificationAsync("success"), 850)
    }, [])

    function animationFinished(){
        props.onFinish()
    }
    
    return(
        <View style={{
            position: "absolute", 
            left: (screenWidth/2-(width/2)), 
            top: (screenHeight/2-(height/2)), 
            backgroundColor: 'rgba(0,0,0,0.8)',
            width: width,
            height: width,
            justifyContent: "center",
            alignItems: "center",
            }}>
            <View style={{height: "100%", width: "100%", padding: 40}}>
                <LottieView 
                
                    ref={lottieRef}
                    autoPlay={false}
                    loop={false}
                    onAnimationFinish={() => animationFinished()}
                    source={require('../../Animations/7698-success.json')}
                />
            </View>
        </View>
    )
}

export default FormSuccessIndicator;
