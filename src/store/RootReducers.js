import { combineReducers } from "redux";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage"
import { CookieStorage } from "redux-persist-cookie-storage";
import Cookies from "cookies-js";
import authReducer from "./reducers/auth.reducer";
import cartReducer from "./reducers/cart.reducer";


const persistConfig = {
  key: "root",
  storage: new CookieStorage(Cookies, {}),
//   storage,
  whitelist: ['cart','auth']
};

const rootReducer = combineReducers({
    auth: authReducer,
    cart: cartReducer
})

export default persistReducer(persistConfig, rootReducer)
