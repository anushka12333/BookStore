import {LOGIN_REQUEST,SUCCESS,FAILURE, LOGOUT_REQUEST}  from './authTypes'
import axios from 'axios'
export const aunthenticateUser = (email,password)=>{
    const credentials ={
        username: email,
        password:password
    }
    return dispatch =>{
        dispatch({
            type:LOGIN_REQUEST
        });
        axios.post("http://localhost:8082/users/login",credentials)
        
        .then(response =>{
            let token=response.data.token;
            localStorage.setItem("jwtToken",token);
            dispatch(success(true));
          
        }).catch(error =>{
            dispatch(failure());
        })
    };
};

const logoutRequest = () => {
    return {
        type:LOGOUT_REQUEST
    }
}
export const logoutUser =() =>{
    return dispatch => {
        dispatch(logoutRequest());
        localStorage.removeItem("jwtToken");
        dispatch(success(false));
    };
};

const success = isLoggedIn => {
    return {
        type:SUCCESS,
        payload:isLoggedIn
    };
}
const failure = () =>{
    return{
        type:FAILURE,
        payload:false
    }
}

