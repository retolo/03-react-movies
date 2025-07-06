import { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "../SearchBar/SearchBar";
import { type Movie } from "../../types/movie";
import toast, { Toaster } from 'react-hot-toast';
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
export default function App(){

    
    

    const [movies, setMovies] = useState<Movie[]>([]);
    const [queryPer, setQuerys] = useState('');
    const [isloading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [isModalOpen, setIsModalopen] = useState(false);
    
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)


    const handleMovieSelect = (movie: Movie) =>{
        setSelectedMovie(movie);
        setIsModalopen(true);
    }

    const handleCloseModal = () =>{
        setIsModalopen(false);
        setSelectedMovie(null);
    }

   
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


    

    

    return(
        <>
            <SearchBar onSubmit={setQuerys}/>
            <Toaster/>

            {isloading && <Loader/>}
            {error.length !== 0 &&
                <ErrorMessage/>
            }

            {!isloading && error.length === 0 && movies.length > 0 &&
                <MovieGrid onSelect={handleMovieSelect} movies={movies}/>
            }
            {isModalOpen && selectedMovie && (
                <MovieModal movies={selectedMovie} onClose={handleCloseModal}/>
            )}
             
             
            
            
              
            
            
            
        
        </>
    )
}

    
