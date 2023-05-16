import { REGISTER_FAL, REGISTER_REQ, REGISTER_SUC, LOGIN_REQ, LOGIN_SUC, LOGIN_FAL, SENDGETLOC_REQ, SENDGETLOC_SUC, SENDGETLOC_FAL } from "./action"


const initstore = {
    register: {},
    isLoading: false,
    registerError: false,
    error: {},
    registerSuccess: false,
    login: {},
    loginError: false,
    loginSuccess: false,
    locations: [],
    Loaderlocation: false
}

function reducer(store = initstore, action) {
    const { type, payload } = action;

    switch (type) {
        case REGISTER_REQ:
            return {
                ...store,
                isLoading: true,
                registerError: false
            }
        case REGISTER_SUC:
            return {
                ...store,
                isLoading: false,
                registerError: false,
                register: payload,
                registerSuccess: true
            }
        case REGISTER_FAL:
            return {
                ...store,
                registerError: true,
                isLoading: false,
                error: payload
            }
        case LOGIN_REQ:
            return {
                ...store,
                isLoading: true,
                loginError: false,
                loginSuccess: false
            }
        case LOGIN_SUC:
            return {
                ...store,
                isLoading: false,
                loginError: false,
                login: payload,
                loginSuccess: true
            }
        case LOGIN_FAL:
            return {
                ...store,
                loginError: true,
                isLoading: false,
                loginSuccess: false,
                error: payload
            }
        case SENDGETLOC_REQ:
            return {
                ...store,
                Loaderlocation: true,
            }
        case SENDGETLOC_SUC:
            return {
                ...store,
                Loaderlocation: false,
                locations: payload,
            }
        case SENDGETLOC_FAL:
            return {
                ...store,
                Loaderlocation: false,
                error: payload
            }
        default:
            return {
                ...store
            }

    }
}
export default reducer;