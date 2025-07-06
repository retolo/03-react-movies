
import { createPortal } from 'react-dom'
import css from './MovieModal.module.css'
import type React from 'react'
import { type Movie } from '../../types/movie'
import { useEffect } from 'react'



interface MovieModalProps{
    onClose: () => void
    movies: Movie
}
export default function MovieModal({movies, onClose}: MovieModalProps){


  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) =>{
    if(event.target === event.currentTarget){
      onClose();
    }
  }

  useEffect(() =>{
    const handleKeyDown = (event: KeyboardEvent) =>{
      if(event.key === 'Escape'){
        onClose();
      }

    }


    document.addEventListener('keydown', handleKeyDown);

    return () =>{
      document.removeEventListener('keydown', handleKeyDown);
    }
  }, [onClose])
    return createPortal(
      
                <div className={css.backdrop} role="dialog" aria-modal="true" onClick={handleBackdropClick}>
          <div className={css.modal}>
            <button onClick={onClose} className={css.closeButton} aria-label="Close modal">
              &times;
            </button>
            <img
              src={`https://image.tmdb.org/t/p/w500/${movies.backdrop_path}`}
              alt="movie_title"
              className={css.image}
            />
            <div className={css.content}>
              <h2>{movies.title}</h2>
              <p>{movies.overview}</p>
              <p>
                <strong>Release Date:</strong> {movies.release_date}
              </p>
              <p>
                <strong>Rating:</strong> {movies.vote_average}/10
              </p>
            </div>
          </div>
        </div>,

        document.body

      )
}