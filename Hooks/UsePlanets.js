import { useMemo } from "react";
import useTags from "./UseTags"

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
    return useMemo(() => calculatePlanetsFromTags(tags), [tags])
}
