import { useEffect, useState } from "react"
import History from "../components/History"
import MovieCard from "../components/MovieCard"

export default function Home() {
    const [movies, setMovies] = useState([])
    const [search, setSearch] = useState("")
    const [error, setError] = useState("")
    const [focused, setFocused] = useState(false)

    const apiKey = import.meta.env.VITE_APP_API_KEY

    const storedHistory = localStorage.getItem("search")
    const [history, setHistory] = useState(storedHistory ? JSON.parse(storedHistory) : [])

    console.log("Denne kommer fra storage", storedHistory)

    const baseUrl = `http://www.omdbapi.com/?s=${search}&apikey=`

    useEffect(() => {
        getMovies("James Bond")
    }, []);

    useEffect(()=>{
        localStorage.setItem("search", JSON.stringify(history))
    },[history])
    
    const getMovies = async (query) => {
        try {
            const response = await fetch(`http://www.omdbapi.com/?s=${query}&type=movie&apikey=${apiKey}`)
            const data = await response.json()

            console.log(data)
            
            if (data.Response === "True") {
                setMovies(data.Search)
                setError("")
            } else {
                setError(data.Error)
                setMovies([])
            }
        } catch (err) {
            console.error("Feil ved henting av filmer:", err)
        }
    }

    const handleChange = (e)=>{
        setSearch(e.target.value)
    }

const handleSubmit = (e)=>{
    e.preventDefault()
    getMovies(search)
    
    setHistory((prev) => [...prev, search])
    e.target.reset()
}
    
    console.log(history)

    return(
        <main>
            <h1>Forside</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Søk etter film
                    <input 
                        type="search" 
                        placeholder="Harry Potter" 
                        onChange={handleChange} 
                        onFocus={()=> setFocused(true)} 
                    />
                </label>
                
                { !focused ? <History history={history} setSearch={setSearch} /> : null }
                
                <button type="submit">=Søk</button>
            </form>
            <section>
                <ul className="movie-grid">
                    {movies.map((movie) => (
                        <MovieCard key={movie.imdbID} movie={movie} />
                    ))}
                </ul>
            </section>
        </main>
    )
}