import userReducer from "./userReducer";
import userApi from  './userAPI';


export default {
      ...userReducer,
      ...userApi
}