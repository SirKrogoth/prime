import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';
import './movie-info.css';

function Movies(){
    const { id } = useParams();
    const [movie, setMovie] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadMovie(){
            await api.get(`/movie/${id}`, {
                params:{
                    api_key: "026c9f6fd0f47ae81d2fff46de943c9d",
                    language: "pt-BR",
                }                
            })
            .then((res) => {
                setMovie(res.data);
                setLoading(false);
            })
            .catch(() => {
                console.log("Filme nao encontrado.");
            });
        }

        loadMovie();
    }, []);

    if(loading){
        return(
            <div className='movie-info'>
                <h1>Carregando detalhes...</h1>
            </div>
        )
    }

    return(
        <div className='movie-info'>
            <h1>{movie.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt={movie.title}/>
            <h3>Sinopse</h3>
            <span>{movie.overview}</span>
            <br/>
            <strong>Avaliação: {movie.vote_average} / 10</strong>

            <div className='area-buttons'>
                <button>Salvar</button>
                <button>
                    <a href='#'>Trailer</a>
                </button>
            </div>

        </div>
    )
}

export default Movies;