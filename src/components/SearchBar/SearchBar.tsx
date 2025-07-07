interface SearchBarProps{
    onSubmit: (queryPer: string) => void
}
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import styles from './SearchBar.module.css'

export default function SearchBar({onSubmit}: SearchBarProps){
    const [inputValue, setInputValue] = useState('');



    const handleSubmit = (_formData: FormData) =>{
        
        
        onSubmit(inputValue);
    }


    
    const notify = () =>{
        if(inputValue.trim() === ''){
            toast('Please enter your search query.');

        }
    }
    


        
        

    
    return(
        <header className={styles.header}>
         <div className={styles.container}>
         <a
         className={styles.link}
         href="https://www.themoviedb.org/"
         target="_blank"
         rel="noopener noreferrer"
         >
         Powered by TMDB
         </a>
         <form action={handleSubmit} onSubmit={notify} className={styles.form}>
         <input
         className={styles.input}
         type="text"
         name="query"
         autoComplete="off"
        placeholder="Search movies..."
         autoFocus
         onChange={(event) => setInputValue(event.target.value)}
         
         
         />
         <button  className={styles.button} type="submit">
        <Toaster/>
         Search
         </button>
         </form>
         </div>
        </header>

    )
    
}