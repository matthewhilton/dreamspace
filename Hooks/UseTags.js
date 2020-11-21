import {useSelector} from "react-redux";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from "react-redux"

export default useTags = () => {
    const tags = useSelector(state => state.tags)
    const dispatch = useDispatch();

    const createTag = (name, color, planetNumber=1) => {
        const tagData = {
            name,
            used: 0,
            color,
            uuid: uuidv4(),
            planet: {
                icon: planetNumber
            }
        }

        dispatch({type: "INSERT", object: "TAG", data: tagData})
        return tagData;
    }

    
    return {tags, createTag};
}
