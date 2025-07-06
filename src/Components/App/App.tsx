import { useState } from "react";
import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import { type Movie } from "../../types/movie";
import { Toaster } from 'react-hot-toast';
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
import FetchMovies from "../../services/movieService";

export default function App(){

    
    const https = FetchMovies();
    
    
    
    
    
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
            <SearchBar onSubmit={https.SetQuerys}/>
            <Toaster/>

            {https.ISLoading && <Loader/>}
            {https.Error.length !== 0 &&
                <ErrorMessage/>
            }

            {!https.ISLoading && https.Error.length === 0 && https.Movies.length > 0 &&
                <MovieGrid onSelect={handleMovieSelect} movies={https.Movies}/>
            }
            {isModalOpen && selectedMovie && (
                <MovieModal movies={selectedMovie} onClose={handleCloseModal}/>
            )}
             
             
            
            
              
            
            
            
        
        </>
    )
}

    
