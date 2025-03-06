import {axiosInstance} from '../axiosInstance'

export async function postTweet(tweet,id){
    try{
        await axiosInstance.post('/tweets',
        {
            "content": tweet,
            "userid": id,
            "date": Date.now()
        });
        return(true);
    } catch(error){
        console.log('erreur requète',error);
        return(false);
    }
}

export async function getFollowedTweets(id){
    try{
        let utilisateur = (await axiosInstance.get('/utilisateurs/'+id)).data.follows;
        const follows = utilisateur.join("&userid=")+"&userid="+id;
        const response = (await axiosInstance.get('/tweets?userid='+follows)).data
        return(response);
    } catch(error){
        console.log('erreur requète',error);
        return false;
    }
}

export async function getTweets(id){
    try{
        const response = (await axiosInstance.get('/tweets?userid='+id)).data
        return response;
    } catch(error){
        console.log('erreur requète',error);
        return false;
    }
}

export async function deleteTweet(id){
    try{
        await axiosInstance.delete('/tweets/'+id);
        return true;
    }catch(error){
        console.log('erreur requète delete',error);
        return false;
    }
}

export async function updateTweet(id,newContent){
    try{
        await axiosInstance.patch('/tweets/'+id,{
            "content":newContent
        });
        return true;
    }catch(error){
        console.log('erreur requète patch',error)
        return false;
    }
}