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

export const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('fr-FR', { 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
    });
};