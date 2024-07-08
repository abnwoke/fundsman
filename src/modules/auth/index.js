import authReducer from "./authReducer";
import authAPI from  './authAPI';


export default {
      ...authReducer,
      ...authAPI
}