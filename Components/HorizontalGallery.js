import React, {useRef, useEffect} from 'react';
import { ScrollView } from 'react-native';

const HorizontalGallery = (props) => {
    const galleryRef = useRef(null);

    // Scroll to the end of the list whenever a new item is added to end
    useEffect(() => {
        // Delay to give time for ScrollView to render the new children
        setTimeout(() => {
            galleryRef.current.scrollToEnd();
        }, 250)
    }, [props.children.length])


    return(
        <ScrollView
            horizontal={true}
            ref={galleryRef}
            canCancelContentTouches={false}
        >
            {props.children}
        </ScrollView>
    )
}

export default HorizontalGallery;