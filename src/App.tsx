import React, {useState} from 'react';
import './App.scss';
import {searchMoviesQuery} from "./Components/Queries";
import {GRAPHQL_API_ENDPOINT} from "./Components/APIEnpoints";
import axios from "axios";
import Spinner from "./Components/SpinnerComponent/Spinner";
import TextField from "@mui/material/TextField";
import {IMovieResult} from "./Components/Interfaces/MovieInterface";
import {IconButton} from "@mui/material";
import {MoviesList} from "./Components/MoviesList/MoviesList";
import Wikipedia from "./Components/Wikipedia/Wikipedia";

function App() {

    const [movieName, setMovieName] = useState<string>('');
    const [searchMovies, setSearchMovies] = useState<IMovieResult[]>();
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedMovie, setSelectedMovie] = useState<IMovieResult | undefined>(undefined);


    const getMovies = (): void => {
        setLoading(true);
        setSelectedMovie(undefined);
        axios.post(GRAPHQL_API_ENDPOINT, {query: searchMoviesQuery(movieName)}).then((response) => {
            setSearchMovies(response.data.data.searchMovies)
            setLoading(false);
        }).catch(() => {
            setLoading(false)
        })
    }

    const selectMovie = (movie: IMovieResult): void => {
        setSelectedMovie(movie);
    }

    const handleKeyDown = (event: any): void => {
        if (event.key === 'Enter')
            getMovies();
    }

    return (
        <div className="App">
            <header className={'header'}>
                <h1>ApexLab full-stack Test</h1>
                <TextField value={movieName} onChange={(event) => setMovieName(event.target.value)}
                           onKeyDown={handleKeyDown}/>
                <IconButton onClick={getMovies}>Search</IconButton>
            </header>
            <div className={'content'}>
                {
                    loading ? <Spinner/> : !selectedMovie &&<MoviesList searchResult={searchMovies} handleSelectMovie={selectMovie}/>
                }
                {selectedMovie && <Wikipedia selectedMovie={selectedMovie}/>}
            </div>
        </div>
    );
}

export default App;
