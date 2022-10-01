import React, {useState} from 'react';
import './App.scss';
import {searchMoviesQuery, API_ENDPOINT} from "./Components/queries";
import axios from "axios";
import Spinner from "./Components/SpinnerComponent/Spinner";
import TextField from "@mui/material/TextField";
import {IMovieResult} from "./Components/Interfaces/Interfaces";
import {IconButton} from "@mui/material";
import {MoviesList} from "./Components/MoviesList/MoviesList";

function App() {

    const [movieName, setMovieName] = useState<string>('');
    const [searchMovies, setSearchMovies] = useState<IMovieResult[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedMovie,setSelectedMovie] = useState<IMovieResult>();


    const getMovies = (): void => {
        setLoading(true);
        axios.post(API_ENDPOINT, {query: searchMoviesQuery(movieName)}).then((response) => {
            setSearchMovies(response.data.data.searchMovies)
            setLoading(false);
        }).catch(() => {
            setLoading(false)
        })
    }

    const selectMovie = (movie:IMovieResult):void=>{
        setSelectedMovie(movie);
    }

    return (
        <div className="App">
            <header className={'header'}>
                <h1>ApexLab full-stack Test</h1>
                <TextField value={movieName} onChange={(event) => setMovieName(event.target.value)}/>
                <IconButton onClick={getMovies}>Search</IconButton>
            </header>

            <div className={'content'}>
                {
                    loading?<Spinner/>:
                        <MoviesList searchResult={searchMovies} handleSelectMovie={selectMovie}/>
                }
            </div>
        </div>
    );
}

export default App;
