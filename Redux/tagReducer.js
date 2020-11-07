
function tags(state = [], action){
    if(action.object == "TAG"){
        switch(action.type){
            case "INSERT":
                return [...state, action.data]

            case "DELETE":
                let filteredState = [...state]
                filteredState = filteredState.filter((item) => {if(item.uuid != action.data) return item})
                return filteredState;

            case "MODIFY":
                let modifiedState = [...state]
                let newData = action.data;
                for(const [i, tag] of state.entries()){
                    if(tag.uuid == action.tagToModifyUUID){
                        modifiedState[i] = newData;
                        break;
                    }
                }
                return modifiedState;
        }
    }

    return state;
}

export default tags;