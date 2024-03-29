import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import './movie-info.css';
import { toast } from 'react-toastify';

function Movies(){
    const { id } = useParams();
    const navigate = useNavigate();
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
                navigate('/', {
                    replace: true
                });
                return;
            });
        }

        loadMovie();
    }, [navigate, id]);

    function saveMovie(){
        const myList = localStorage.getItem("@primeflix");
    
        let savedMovies = JSON.parse(myList) || [];
    
        const hasMovie = savedMovies.some((savedMovie) => savedMovie.id === movie.id);

        if(hasMovie){
            toast.warn("Esse filme já está em sua lista.");
            return;
        } else{
            savedMovies.push(movie);
            localStorage.setItem("@primeflix", JSON.stringify(savedMovies));
            toast.success("Filme salvo com sucesso!");
        }
    }

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
                <button onClick={saveMovie}>Salvar</button>
                <button>
                    <a target='blank' rel="noreferrer" href={`https://youtube.com/results?search_query=${movie.title}`}>Trailer</a>
                </button>
            </div>

        </div>
    )
}

export default Movies;