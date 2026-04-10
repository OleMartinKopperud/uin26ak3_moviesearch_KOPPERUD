import { Link } from "react-router-dom";

export default function MovieCard({ movie }) {
    return (
        <li>
            <article className="movie-card">
                <figure>
                    <img 
                        src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450?text=Ingen+Bilde"} 
                        alt={`Plakat for filmen ${movie.Title}`} 
                    />
                </figure>
                <header>
                    <h2>{movie.Title}</h2>
                    <p>Utgitt: {movie.Year}</p>
                </header>
                <nav>
                    <Link to={`/${movie.Title}`}>Les mer om filmen</Link>
                </nav>
            </article>
        </li>
    );
}