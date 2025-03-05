import { axiosInstance } from '../axiosInstance'

export async function GetUserNameWithInstance(id){
    try{
        let response
        response = await axiosInstance.get('/utilisateurs/'+id);
        return(response.data.pseudo);
    } catch(error){
        console.log('erreur requète',error);
        return(false);
    }
}