import { useState } from 'react';
import axios from 'axios';

const useRequest = ( endPoint , method , body = null, callback = null ) => {
    const [errors, setErrors] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const doResponse = async() => {
        setLoading(true);
        try{
            const response = await axios[method]( endPoint, body );
            setErrors([]);
            if(callback){
                callback();
            }
            return response.data;

        }
        catch(err){
            console.log(err.response.data);
            setErrors(err.response.data);
        }
        setLoading(false);
    }
    return {doResponse , isLoading, errors };
}
export default useRequest;