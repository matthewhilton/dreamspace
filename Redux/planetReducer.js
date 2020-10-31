
function planets(state = [], action){
    if(action.object == "PLANET"){
        switch(action.type){
            case "INSERT":
                return [...state, action.data]
            
            case "REPLACE":
                return action.data || []
        }
    }

    return state;
}

export default planets;