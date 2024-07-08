import appReducer from "./appReducer";
import appAPI from  './appAPI';


export default {
      ...appReducer,
      ...appAPI
}