import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"

export default function Movie() {
    const { movie } = useParams() 
    
    const [movieDetails, setMovieDetails] = useState(null)
    const [loading, setLoading] = useState(true)

    const apiKey = import.meta.env.VITE_APP_API_KEY

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await fetch(`https://www.omdbapi.com/?t=${movie}&apikey=${apiKey}`)
                const data = await response.json()
                
                if (data.Response === "True") {
                    setMovieDetails(data)
                }
            } catch (err) {
                console.error("Klarte ikke hente filmdetaljer:", err)
            } finally {
                setLoading(false)
            }
        }

        fetchMovieDetails();
    }, [movie, apiKey])

    if (loading) return <main><p>Laster inn filminformasjon...</p></main>
    
    if (!movieDetails) return <main><p>Fant dessverre ikke filmen.</p></main>

    return (
        <main>
            <nav style={{ marginBottom: "2rem" }}>
                <Link to="/">← Tilbake til forsiden</Link>
            </nav>
            
            <article className="movie-details-layout">
                <figure>
                    <img 
                        src={movieDetails.Poster !== "N/A" ? movieDetails.Poster : "https://via.placeholder.com/300x450?text=Ingen+Bilde"} 
                        alt={`Plakat for filmen ${movieDetails.Title}`} 
                    />
                </figure>
                
                <section>
                    <h1>{movieDetails.Title}</h1>
                    <ul className="movie-info-list">
                        <li><strong>Utgitt:</strong> {movieDetails.Year}</li>
                        <li><strong>Sjanger:</strong> {movieDetails.Genre}</li>
                        <li><strong>Regissør:</strong> {movieDetails.Director}</li>
                        <li><strong>Skuespillere:</strong> {movieDetails.Actors}</li>
                        <li><strong>IMDB Rating:</strong> ⭐ {movieDetails.imdbRating}</li>
                    </ul>
                    <h2>Handling</h2>
                    <p>{movieDetails.Plot}</p>
                </section>
            </article>
        </main>
    );
}