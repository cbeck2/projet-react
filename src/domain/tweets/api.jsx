import {axiosInstance} from '../axiosInstance'

export async function PostTweet(tweet,id){
    try{
        await axiosInstance.post('/tweet',
        {
            "content": tweet,
            "userid": id
        });
        return(true);
    } catch(error){
        console.log('erreur requète',error);
        return(false);
    }
}

export async function getTweets(){
    try{
        const response = await axiosInstance.get('/tweet');
        return response.data;
    } catch(error){
        console.log('erreur requète',error);
        return false;
    }
}

export async function DeleteTweet(id){
    try{
        await axiosInstance.delete('/tweet/'+id);
        return true;
    }catch(error){
        console.log('erreur requète delete',error);
        return false;
    }
}

export async function UpdateTweet(id,newContent){
    try{
        await axiosInstance.patch('/tweet/'+id,{
            "content":newContent
        });
        return true;
    }catch(error){
        console.log('erreur requète patch',error)
        return false;
    }
}