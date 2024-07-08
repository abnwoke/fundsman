/**************************************************
 *                Auth   Actions                  *
 **************************************************/
// auth constants
//import userConstants from './userConstants'
import config from "../../utils/config";
import userServices from "./userServices";
//import authActions from "../auth/authActions";
//import authConstants from "../auth/authConstants";

export default class UserActions {


    static updateUser(token) {
        return async (dispatch, getState) => {
            try {
                const user = getState().user;
                const auth = getState().auth;
                const response = await userServices.getUser({token: auth.token, slug: user.slug});

                if (auth.isLoggedIn) {
                    if (response.success) {
                        dispatch({type: userConstants.UPDATE_USER, data: response.data})
                    } else {
                        if (response.logout) {
                           // dispatch(authActions.logout())
                        }
                    }
                } else {
                    //dispatch(authActions.logout())
                }

                return response

            } catch (e) {
                //console.log("Error")
                return {
                    success: false
                }
            }
        }
    };


}

