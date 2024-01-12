import './favorites.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function Favorites(){
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const myList = localStorage.getItem("@primeflix");

        setMovies(JSON.parse(myList) || []);

    }, []);

    function removeMovie(id){
        let filterMovies = movies.filter((item) => {
            return(item.id !== id)
        });

        setMovies(filterMovies);
        localStorage.setItem("@primeflix", JSON.stringify(filterMovies));
        toast.success("Filme removido com sucesso");
    }

    return(
        <div className='meus-filmes'>
            <h1>Meus Filmes</h1>

            {movies.length === 0 && <span>Você não possui filmes salvos :(</span>}

            <ul>
                {movies.map((item) => {
                    return(
                        <li key={item.id}>
                            <span>{item.title}</span>

                            <div>
                                <Link to={`/movie/${item.id}`}>Ver detalhes</Link>
                                <button onClick={() => removeMovie(item.id)}>Excluir</button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Favorites;