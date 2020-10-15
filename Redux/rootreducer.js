import { combineReducers } from 'redux';
import journal from './journalReducer'

function rootReducer(state = {}, action){
    if(action.type == "NUKE"){
        return(null)
    }
    
    return appReducer(state, action);
}

const appReducer = combineReducers({
    journal
  });

  export default rootReducer;