import { React } from "react"
import { SignupWithInstance } from "./api"
import { useEffect , useState } from "react";
import { useNavigate } from "react-router";

const validatePassword = (password) => {
    const regex = /^(?=(.*[a-z]))(?=(.*[A-Z]))(?=(.*\d))(?=(.*\W))[A-Za-z\d\W]{8,}$/;
    return regex.test(password);
  };

export async function registerCheck(password,vpassword,email,pseudo){
    if(password===vpassword){
        if(validatePassword(password)){
            await SignupWithInstance(email,password,pseudo);
            return(0)
        }else{
            console.log("mdp weak af")
            return(1)
        }
    }else{
        console.log("mange tes mdp")
        return(2)
    }
}

export const AuthGuard = (WrappedComponent) => {
    const Auth = (props) => {
        const [isAuth, setIsAuth] = useState(false);
        const navigate = useNavigate()

        useEffect(() => {
            if(!(localStorage.getItem("key") ?? sessionStorage.getItem("key"))){
                return navigate("/");
            }
            setIsAuth(true);
        }, []);
        return isAuth ? <WrappedComponent {...props} /> : null;
    };
    return Auth
};