import { axiosInstance } from '../axiosInstance'

export async function getUserName(id){
    try{
        const response = await axiosInstance.get('/utilisateurs/'+id);
        return(response.data.pseudo);
    } catch(error){
        console.log('erreur requète',error);
        return false;
    }
}

export async function isFollowed(id){
    try{
        const token = sessionStorage.getItem("user") ?? localStorage.getItem("user");
        if(id === token) return 2;
        const response = await axiosInstance.get('/utilisateurs/'+id);
        if(response.data.followers.includes(token)){
            return 1;
        } else {
            return 0;
        }
    } catch(error){
        console.log('erreur requète',error);
    }
}

export async function getFollows(id){
    try{
        const response = await axiosInstance.get('/utilisateurs/'+id)
        return response.data.follows ?? [];
    } catch(error){
        console.log('erreur requète',error);
        return false;
    }
}

export async function getFollowers(id) {
    try{
        const response = await axiosInstance.get('/utilisateurs/'+id)
        return response.data.followers ?? [];
    } catch(error){
        console.log('erreur requète',error);
        return false;
    }   
}

export async function following(id){
    try{
        const response = await axiosInstance.get('/utilisateurs/'+id);
        let followerArray = response.data.followers || [];
        followerArray = [...followerArray, sessionStorage.getItem("user") ?? localStorage.getItem("user")];
        await axiosInstance.patch('/utilisateurs/'+id,{
            "followers":followerArray
        })
        return response.data.followers.length+1;
    } catch(error){
        console.log('erreur requète',error);
        return false;
    }
}

export async function unfollowing(id){
    try{
        const token = sessionStorage.getItem("user") ?? localStorage.getItem("user")
        const response = await axiosInstance.get('/utilisateurs/'+id);
        let followerArray = response.data.followers.filter((t) => t !== token)
        await axiosInstance.patch('/utilisateurs/'+id,{
            "followers":followerArray
        })
        return response.data.followers.length-1;
    } catch(error){
        console.log('erreur requète',error);
        return false;
    }
}