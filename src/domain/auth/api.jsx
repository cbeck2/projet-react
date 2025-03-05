import {axiosInstance} from '../axiosInstance'

export async function LoginWithInstance(email,password,local){
    try{
        const response = await axiosInstance.post('/login',
        {
            "email": email,
            "password": password
        });
        if(local){
            sessionStorage.setItem("key",response.data.accessToken);
            sessionStorage.setItem("user",response.data.user.id);
        }else{
            localStorage.setItem("key",response.data.accessToken);
            localStorage.setItem("user",response.data.user.id);
        }
        return(true);
    } catch(error){
        console.log('erreur requète',error);
        return(false);
    }
}

export async function SignupWithInstance(email,password,pseudo){
    try{
        const response = await axiosInstance.post('/users/register',{
            "email":email,
            "password":password
        });
        localStorage.setItem("key",response.data.accessToken);
        localStorage.setItem("user",response.data.user.id);
    } catch(error){
        console.log('erreur requète inscription',error);
    }
    try{
        const response = await axiosInstance.post('/utilisateurs',{
            "id":localStorage.getItem("user"),
            "pseudo":pseudo,
        });
    } catch(error){
        console.log('erreur requète utilisateurs',error);
    }
}