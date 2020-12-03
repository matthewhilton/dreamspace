import React, {useEffect, useState} from 'react'
import {LayoutAnimation} from 'react-native'

const Delayed = ({children, delay=250, animation=LayoutAnimation.create(1000, LayoutAnimation.Types.keyboard, LayoutAnimation.Properties.opacity)}) => {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true)
        }, delay);
        return () => clearTimeout(timer);
      }, []);

      LayoutAnimation.configureNext(animation);

    return (
        <>
           {isVisible ? children : null}
        </>
    )
}

export default Delayed
