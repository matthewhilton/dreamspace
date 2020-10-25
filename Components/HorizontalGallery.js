import React, {useRef, useEffect, useState} from 'react';
import { ScrollView } from 'react-native';

const HorizontalGallery = (props) => {
    const galleryRef = useRef();

    const [prevLength, setPrevLength] = useState(-1)

    // Scroll to the end of the list whenever a new item is added to end
    useEffect(() => {
        if(prevLength < props.children.length){
            // Delay to give time for ScrollView to render the new children
            setTimeout(() => {
                galleryRef.current.scrollToEnd();
            }, 50)
        }
        setPrevLength(props.children.length)
    }, [props.children.length])


    return(
        <ScrollView
            horizontal={true}
            ref={galleryRef}
        >
            {props.children}
        </ScrollView>
    )
}

export default HorizontalGallery;