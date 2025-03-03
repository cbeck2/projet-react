import axios from axios;
import routes from routes;

export async function api(){
    try{
        const response = await axios.post('/users');
        console.log(responce.data)
    } catch(error){
        console.log('erreur requète',error);
    }
}

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 5000,
    header:{
        'Autorization':'bearer TOKEN'
    }
});