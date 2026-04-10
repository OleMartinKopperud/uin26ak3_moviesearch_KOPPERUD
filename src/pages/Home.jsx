import { useEffect, useState } from "react"
import MovieCard from "../components/MovieCard"

export default function Home() {
    const [movies, setMovies] = useState([])
    const [search, setSearch] = useState("")
    const [error, setError] = useState("")

    const apiKey = import.meta.env.VITE_APP_API_KEY

    const fetchMovies = async (query) => {
        try {
            const response = await fetch(`http://www.omdbapi.com/?s=${query}&type=movie&apikey=${apiKey}`)
            const data = await response.json()
            
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
    };

    useEffect(() => {
        fetchMovies("James Bond")
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault()
        
        if (search.length >= 3) {
            fetchMovies(search)
        } else {
            setError("Søket må inneholde minst 3 tegn.")
        }
    }

    return (
        <main>
            <header>
                <h1>Filmsøk</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="search">Søk etter film: </label>
                    <input 
                        id="search"
                        type="search" 
                        placeholder="F.eks. Batman..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)} 
                    />
                    <button type="submit">Søk</button>
                </form>
                {error && <p><em>{error}</em></p>}
            </header>
            
            <section>
                <ul className="movie-grid">
                    {movies.map((movie) => (
                        <MovieCard key={movie.imdbID} movie={movie} />
                    ))}
                </ul>
            </section>
        </main>
    );
}