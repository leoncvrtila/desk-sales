import * as actionTypes from '../actions/actionTypes'
import {updateObject} from '../reducers/utility'


//>>>>> GLOBAL STATE - povezuje se sa Auth.js i onda tamo imam pristup svemu tome

const initialState = {
    token: null,
    userId: null,
    error: null,
    email: null,
    loading: false
}

const authStart = (state, action) => {
    return updateObject(state, {error: null, loading: true});
}

const authSuccess = (state, action) => {
    return updateObject(state, {
        token: action.idToken,
        userId: action.userId,
        email: action.email, 
        error: null, 
        loading: false
    });
}

const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    })
}

const authLogout = (state, action) => {
    return updateObject(state, {
        token: null,
        userId: null
    })
}

const reducer = (state = initialState, action) => { // initialState je globalni state - to je object
    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        default: 
            return state;
    }
}


export default reducer;