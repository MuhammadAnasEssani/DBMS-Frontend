
import axios from "../../config/helper/axios";
import { activationConstants } from "./contants";


export const activation = (token) => {
    return async (dispatch) => {
        try{
            dispatch({ type: activationConstants.USER_ACTIVATION_REQUEST})

            const res = await axios.post("/email-activate", {
                token
            });
            console.log(res);
            if(res.status === 201) {
                const {message} = res.data;
                dispatch({
                    type: activationConstants.USER_ACTIVATION_SUCCESS,
                    payload: { message }
                })
            } 

        } catch (err) {
            const { data } = err.response;
            dispatch({
                type: activationConstants.USER_ACTIVATION_FAILURE,
                payload: {error: data.error}
            })
        }
    }
}