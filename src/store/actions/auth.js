import axios from 'axios'
import * as actionTypes from './actionTypes'


//>>>>> GLOBAL ACTIONS - povezuje se sa Auth.js i onda tamo imam pristup svemu tome

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token, userId, email) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId,
        email: email
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    localStorage.removeItem('email');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000)
    }
}

let url 
export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };


            url = isSignup === false ? 
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB5GfvK2cdB9qJSVtkt4DFgbiqzImIOA9E' 

            : 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB5GfvK2cdB9qJSVtkt4DFgbiqzImIOA9E'




        if(isSignup === false) {

            axios.post(url, authData)
            .then(response => {


                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000); // trenutni datum plus odredeno vrijeme >> to se sprema u browser local storage i ujedno se string prebaci u date object

                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', response.data.localId);
                localStorage.setItem('email', response.data.email);
                dispatch(authSuccess(response.data.idToken, response.data.localId, response.data.email)); // saljem idToken i localId 
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(err => {
                dispatch(authFail(err.response.data.error)); // koristim axios
            })

        } else {

            axios.post(url, authData)
            .then(response => {


                localStorage.setItem('newUserId', response.data.localId);
                
            })
            .catch(err => {

            })

        }


    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if(!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                const userId = localStorage.getItem('userId');
                const email = localStorage.getItem('email');
                dispatch(authSuccess(token, userId, email));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
            }
           
        } 
    }
   
        
   
}