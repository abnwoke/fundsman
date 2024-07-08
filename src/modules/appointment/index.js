import propertyReducer from "./appointmentReducer";
import propertyAPI from './appointmentAPI';


export default {
      ...propertyReducer,
      ...propertyAPI
}

