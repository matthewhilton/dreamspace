// CODE FROM https://reactnative.dev/docs/animatedvaluexy/

import React, { useRef } from "react";
import { Animated, PanResponder, StyleSheet, View } from "react-native";

const DraggableView = (props) => {
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([
      null,
      {
        dx: pan.x, // x,y are Animated.Value
        dy: pan.y,
      },
    ]),
  });

  return (
    
      <Animated.View
        {...panResponder.panHandlers}
        style={[pan.getLayout()]}
      >
          {props.children}
      </Animated.View>
 
  );
};


export default DraggableView;