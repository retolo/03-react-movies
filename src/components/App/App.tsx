import { useEffect, useState } from "react";

import SearchBar from "../SearchBar/SearchBar";
import { type Movie } from "../../types/movie";
import { Toaster } from 'react-hot-toast';
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
import FetchMovies from "../../services/movieService";

export default function App(){

    const [movies, setMovies] = useState<Movie[]>([]);
    const [queryPer, setQuerys] = useState('');
    const [error, setError] = useState('');
    const [isloading, setIsLoading] = useState(true);
    
    

    
    
    useEffect(() =>{

        const fetchData = async () =>{
            setIsLoading(true);
            setError('');

            try {
                const result = await FetchMovies(queryPer);
                setMovies(result)
            } catch (error) {
                setError((error as Error).message)
                
            } finally{
                setIsLoading(false)
            }
        }


        fetchData();
        

        
    }, [queryPer])
    
    
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
                <MovieModal movie={selectedMovie} onClose={handleCloseModal}/>
            )}
             
             
            
            
              
            
            
            
        
        </>
    )
}

    
