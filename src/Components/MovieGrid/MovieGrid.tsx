import css from './MovieGrid.module.css'




interface Movie {
    id: number
    title: string
    poster_path: string
}


interface MovieGridProps{
    onSelect: (movie: Movie) => void
    movies: Movie[] 
}
export default function MovieGrid({movies, onSelect}: MovieGridProps){

    return (
        <ul className={css.grid}>
            {movies.map((movie) => (
                <li key={movie.id} className={css.card} onClick={() => onSelect(movie)}> 
                    <div  className={css.card}>
                    <img
                        className={css.image}
                        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} 
                        alt={movie.title} 
                        loading="lazy"
                    />
                    </div>
                    <h2 className={css.title}>{movie.title}</h2> 
                </li>
                ))}

        </ul>
    )

    
}