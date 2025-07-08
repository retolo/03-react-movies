import css from './ErrorMessage.module.css'

interface ErrorProps{
    error: string
}
export default function ErrorMessage({error}: ErrorProps){
    return(
        <p className={css.text}>{error}...</p>

    )
}