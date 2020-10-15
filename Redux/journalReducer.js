
function journal(state = [], action){
    if(action.object == "JOURNAL"){
        switch(action.type){
            case "INSERT":
                return [...state, action.data]
        }
    }

    return state;
}

export default journal;