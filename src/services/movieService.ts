import { useEffect, useState } from "react";
import axios from "axios";
import toast from 'react-hot-toast';

import { type Movie } from "../types/movie";

export default function FetchMovies(){

    const [isloading, setIsLoading] = useState(true);
    const [movies, setMovies] = useState<Movie[]>([]);
    const [queryPer, setQuerys] = useState('');
    const [error, setError] = useState('');
    useEffect(() =>{
        async function GetRequest() {
            try {
                setIsLoading(true);
                setError('');
                const response = await axios({
                    method: 'GET',
                    url: 'https://api.themoviedb.org/3/search/movie',
    
                    params: {
                        include_adult: false,
                        language: 'en-US',
                        query: queryPer,
    
    
                    },
                    headers:{
                        accept: 'application/json',
                        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkOWYwNTA1OTU5MjM2ZTk0ZTllYTA0YTgyM2ZiOTc5ZCIsIm5iZiI6MTc1MTgwNjI3OS4zMjE5OTk4LCJzdWIiOiI2ODZhNzE0NzRhNGI0NGEwZGFhOTU4MGEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.niMU6LEEGor84BlXiA8ReugMPcFKgiu55i2dazF051s`,
                    }
                    
                }
                
            );
            setMovies(response.data.results);
            if(response.data.results.length === 0){
                toast('No movies found for your request.');
    
            }

            
            } catch (err) {
                let errorMessage = 'An unknown error occurred.';
                if (axios.isAxiosError(err)) {
                  if (err.response) {
                    errorMessage = err.response.data?.status_message || err.message;
                  } else if (err.request) {
                    errorMessage = 'No response from server. Check your internet connection.';
                  } else {
                    errorMessage = err.message;
                  }
                } else {
                  errorMessage = String(err);
                }
                toast(errorMessage);
                setError(errorMessage);
              } finally {
                setIsLoading(false);
              }
            }
        
        GetRequest();

    }, [queryPer])



    return{
        Error: error,
        Movies: movies,
        SetQuerys: setQuerys,
        ISLoading: isloading

    }
}