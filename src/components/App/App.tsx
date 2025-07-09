import { useEffect, useState } from "react";

import SearchBar from "../SearchBar/SearchBar";
import { type Movie } from "../../types/movie";
import toast, { Toaster } from 'react-hot-toast';
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
import fetchMovies from "../../services/movieService";


export default function App(){

    const [movies, setMovies] = useState<Movie[]>([]);
    const [querys, setQuerys] = useState<string>('');
    const [error, setError] = useState('');
    const [isloading, setIsLoading] = useState(false);
    
    

    
    
    useEffect(() =>{

        const fetchData = async () =>{
            setIsLoading(true);
            

            try {
                if(querys !== ''){
                    setMovies([]);
                    setError('');
                    const result = await fetchMovies(querys);
                    
                    if(result.length === 0){
                        toast('No movies found for your request.');
            
                    }
                    setMovies(result)
                }
                
                
                
            } catch (error) {
              if (error instanceof Error) {
                  setError(error.message);
              } else {
                  setError(String(error));
              }
          } finally {
              setIsLoading(false);
          }
          
        }


        fetchData();
        

        
    }, [querys])
    
    
    
    
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)


    const handleMovieSelect = (movie: Movie) =>{
        setSelectedMovie(movie);
        
    }

    const handleCloseModal = () =>{
        
        setSelectedMovie(null);
    }

   
    


    

    

    return (
        <>
          <SearchBar onSubmit={setQuerys} />
          <Toaster />
      
          {error.length !== 0 ? (
            <ErrorMessage error={error}/>
          ) : isloading ? (
            <Loader />
          ) : (
            <>
              {movies.length > 0 && (
                <MovieGrid onSelect={handleMovieSelect} movies={movies} />
              )}
              {selectedMovie !== null && (
                <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
              )}
            </>
          )}
        </>
      );
      
}

    
