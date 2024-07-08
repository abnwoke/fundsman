import landlordReducer from "./landlordReducer";
import landlordAPI from './landlordAPI';


export default {
      ...landlordReducer,
      ...landlordAPI
}

