import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authReducer } from "./authReducers";
import { productReducer } from "./productReducers";
import { partnerReducer } from "./partnertReducers";
import { orderReducers } from "./orderReducers";

const persistConfig = {
    key :"root",
    storage,
    whitelist:["auth","product","partner","order"]
}
const reducers = combineReducers({
    auth : authReducer,
    product: productReducer,
    partner: partnerReducer,
    order: orderReducers,
})

export default persistReducer(persistConfig,reducers)