
import axios from "axios";
import toast from 'react-hot-toast';

import { type Movie } from "../types/movie";
interface AppGetResults{
  results: Movie[]
}

export default async function FetchMovies(queryUser: string): Promise<Movie[]>{

    
    
    
    
    
        
            try {
                
                const response = await axios<AppGetResults>({
                    method: 'GET',
                    url: 'https://api.themoviedb.org/3/search/movie',
    
                    params: {
                        include_adult: false,
                        language: 'en-US',
                        query: queryUser,
    
    
                    },
                    headers:{
                        accept: 'application/json',
                        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkOWYwNTA1OTU5MjM2ZTk0ZTllYTA0YTgyM2ZiOTc5ZCIsIm5iZiI6MTc1MTgwNjI3OS4zMjE5OTk4LCJzdWIiOiI2ODZhNzE0NzRhNGI0NGEwZGFhOTU4MGEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.niMU6LEEGor84BlXiA8ReugMPcFKgiu55i2dazF051s`,
                    }
                    
                }
                
            );
            
            if(response.data.results.length === 0){
                toast('No movies found for your request.');
    
            }
            return response.data.results;
              
            

            
            }catch (error) {
              if (axios.isAxiosError(error)) {
                const apiMessage = error.response?.data?.status_message;
                throw new Error(apiMessage || error.message);
              } else {
                throw new Error(String(error));
              }
            }
          }