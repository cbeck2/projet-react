import {axiosInstance} from '../axiosInstance'

export async function postTweet(tweet,id){
    try{
        await axiosInstance.post('/tweets',
        {
            "content": tweet,
            "userid": id,
            "date": Date.now(),
            "like": []
        });
        return(true);
    } catch(error){
        console.log('erreur requète',error);
        return(false);
    }
}

export async function getFollowedTweet(id){
    try{
        let utilisateur = (await axiosInstance.get('/utilisateurs/'+id)).data.follows;
        const follows = utilisateur.join("&userid=")+"&userid="+id;
        const response = (await axiosInstance.get('/tweets?userid='+follows+'&_sort=date&_order=desc')).data
        return(response);
    } catch(error){
        console.log('erreur requète',error);
        return false;
    }
}

export async function getTweetsDate(){
    try{
        const response = (await axiosInstance.get('/tweets?&_sort=date&_order=desc')).data
        return(response);
    } catch(error){
        console.log('erreur requète',error);
        return false;
    }
}

export async function getTweetsPopularity(){
    try{
        const threeDaysAgo = Date.now() - 3 * 24 * 3600000;
        const response = (await axiosInstance.get(`/tweets?date_gte=${threeDaysAgo}`))
        const sortedTweets = response.data.sort((a, b) => {
            const likesA = a.like ? new Set(a.like).size : 0;
            const likesB = b.like ? new Set(b.like).size : 0;
            return likesB - likesA;
        });
        return(sortedTweets);
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

export async function likeTweet(userId, tweetId) {
    try {
        const tweet = await axiosInstance.get(`/tweets/${tweetId}`);
        const likes = tweet.data.like ? [...tweet.data.like, Number(userId)] : [Number(userId)]
        await axiosInstance.patch(`/tweets/${tweetId}`, {
            "like": likes
        });
        return true;
    } catch (error) {
        console.log('erreur requète like',error);
        return false;
    }
}


export async function unlikeTweet(userId, tweetId) {
    try {
        const tweet = await axiosInstance.get(`/tweets/${tweetId}`);
        const likes = Array.isArray(tweet.data.like) ? tweet.data.like.filter(id => id !== Number(userId)) : [];
        const response = await axiosInstance.patch(`/tweets/${tweetId}`, {
            "like": likes,
        });
        return true;
    } catch (error) {
        console.log('erreur requète unlike',error);
        return false;
    }
}
