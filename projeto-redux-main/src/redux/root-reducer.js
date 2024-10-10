import { combineReducers } from "redux"; 
import  userReducer  from "./user/slice";


export default combineReducers({
    user: userReducer,
        
})