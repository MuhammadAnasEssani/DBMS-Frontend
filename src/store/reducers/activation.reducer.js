import { activationConstants } from "../actions/contants";


const initState = {
    error: null,
    message: null,
    loading: false
};

const userReducer = (state = initState, action) => {
    switch (action.type) {
        case activationConstants.USER_ACTIVATION_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case activationConstants.USER_ACTIVATION_SUCCESS:
            state = {
                ...state,
                loading: false,
                error: null,
                message: action.payload.message
            }
            break;
        case userConstants.USER_REGISTER_FAILURE:
            state = {
                ...state,
                loading: false,
                message: action.payload.error,
                error: action.payload.error
            }
            break;
        default:
    }
    return state;
}

export default userReducer;