

export function GetUserId(){
    if (sessionStorage.getItem("user")){
        return(sessionStorage.getItem("user"));
    }else{
        return(localStorage.getItem("user"));
    }
}