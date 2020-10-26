
function tags(state = [], action){
    if(action.object == "TAG"){
        switch(action.type){
            case "INSERT":
                return [...state, action.data]

            case "DELETE":
                let filteredState = [...state]
                filteredState = filteredState.filter((item) => {if(item.name != action.data) return item})
                return filteredState;
        }
    }

    return state;
}

export default tags;