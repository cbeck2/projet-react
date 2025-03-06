export async function getLoggedUser(fonction){
    if (sessionStorage.getItem("user")){
        return(
            await fonction(sessionStorage.getItem("user"))
        );
    }else{
        return(
            await fonction(localStorage.getItem("user"))
        );
    }
}

export function getUser(){
    return(new URLSearchParams(location.search).get("id"));
}
export function getUserId(){
    return(sessionStorage.getItem("user") ?? localStorage.getItem("user"));
}