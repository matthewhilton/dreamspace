import React, { useMemo } from "react";
import MoonCartoonIcon from "../Images/MoonCartoonIcon";
import Planet3Icon from "../Images/Planet3Icon";
import useTags from "./UseTags"
import Icon from 'react-native-vector-icons/FontAwesome5';

export default usePlanets = () => {
    const {tags} = useTags();

    const calculatePlanetsFromTags = tags => {
        // Calculate data about the planets based on the tags
        const radiusStep = 50
        let currentRadius = 50;

        let currentAngle = 0;

        let outputTags = [];
        for(const tag of tags){
            let editedTag = {...tag};

            if(!editedTag.planet) editedTag.planet={};

            // Update size based on usage of the tag
            editedTag.planet.size = 20 + tag.used*5;

            // Add random start angle
            editedTag.planet.startAngle = currentAngle;
            currentAngle += 253;
            if(currentAngle > 360) currentAngle -= 360;

            // Calculate its radius from the other ones
            currentRadius += Math.round(editedTag.planet.size/2+1)
            currentRadius += radiusStep;

            editedTag.planet.radius = currentRadius;

            outputTags.push(editedTag);
        }

        return outputTags;
    }

    // Memoize it as it is fairly expensive
    const generatedPlanets = useMemo(() => calculatePlanetsFromTags(tags), [tags])
    
    const getPlanetIcon = (iconNumber) => {
        switch(iconNumber){
            case -1:
                return <Icon name="brain" style={{color: "white"}} size={35} />
            case 0:
                return <MoonCartoonIcon />
            case 1:
                return <Planet3Icon />
        }
    }

    const iconKeyList = [0,1];

    return { generatedPlanets, getPlanetIcon, iconKeyList }
}
