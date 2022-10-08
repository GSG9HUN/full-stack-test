import React, {Key, useState} from 'react';
import './App.scss';
import {getRelatedMoviesQuery, searchMoviesQuery} from "./Components/Queries";
import {GRAPHQL_API_ENDPOINT} from "./Components/APIEnpoints";
import axios from "axios";
import Spinner from "./Components/SpinnerComponent/Spinner";
import TextField from "@mui/material/TextField";
import {Movie} from "./Components/Interfaces/MovieInterface";
import {IconButton} from "@mui/material";
import {MoviesList} from "./Components/MoviesList/MoviesList";
import Wikipedia from "./Components/Wikipedia/Wikipedia";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
function App() {

    const [movieName, setMovieName] = useState<string>('');
    const [movies, setMovies] = useState<Movie[] | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedMovie, setSelectedMovie] = useState<Movie>();


    const getMovies = (): void => {
        setLoading(true);
        setSelectedMovie(undefined);
        axios.post(GRAPHQL_API_ENDPOINT, {query: searchMoviesQuery(movieName)}).then((response) => {
            setMovies(response.data.data.searchMovies)
            setLoading(false);
        }).catch(() => {
            setLoading(false)
        })
    }

    const selectMovie = (movie: Movie): void => {
        setSelectedMovie(movie);
    }

    const handleKeyDown = (event: any): void => {
        if (event.key === 'Enter')
            getMovies();
    }

    const getRelatedMovies =(id:Key)=>{
        setLoading(true)
        setSelectedMovie(undefined)
        axios.post(GRAPHQL_API_ENDPOINT, {query: getRelatedMoviesQuery(id)}).then((response) => {
            setMovies([...response.data.data.movie.recommended]);
            setLoading(false)
        })
    }

    return (
        <div className="App">
            <header className={'header'}>
                <h1>ApexLab full-stack Test</h1>

                <TextField value={movieName} onChange={(event) => setMovieName(event.target.value)}
                           onKeyDown={handleKeyDown} placeholder={"Search..."}/>
                <IconButton onClick={getMovies}><SearchOutlinedIcon/></IconButton>


            </header>
            <div className={selectedMovie ? "content flex" : "content"}>
                {
                    loading ? <Spinner/> : <MoviesList searchResult={movies} handleSelectMovie={selectMovie}/>
                }
                {selectedMovie && <Wikipedia selectedMovie={selectedMovie} getRelatedMovies={getRelatedMovies}/>}
            </div>
        </div>
    );
}

export default App;
