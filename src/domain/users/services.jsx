import { GetUserNameWithInstance } from './api'

export async function GetLoggedUser(){
    if (sessionStorage.getItem("user")){
        return(
            await GetUserNameWithInstance(sessionStorage.getItem("user"))
        );
    }else{
        return(
            await GetUserNameWithInstance(localStorage.getItem("user"))
        );
    }

}