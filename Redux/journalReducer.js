
function journal(state = [], action){
    if(action.object == "JOURNAL"){
        switch(action.type){
            case "INSERT":
                return [...state, action.data]
            case "DELETE":
                // Return array of every item except this one (matching by UUID)
                return [...state].filter((item) => (item.uuid != action.data))
            case "REPLACE":
                return [...state].map((item) => {
                    if(item.uuid != action.uuid){
                        // Not replacing this item
                        return item;
                    } else {
                        // Replace this item by only returning the new data
                        return action.data;
                    }
                })
        }
    }

    return state;
}

export default journal;