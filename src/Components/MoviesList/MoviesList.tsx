import {IMovieResult} from "../Interfaces/Interfaces";
import {Table} from "@mui/material";
import {ReactNode} from "react";

interface Prop {
    searchResult: IMovieResult[],
    handleSelectMovie:Function,
}

export function MoviesList({searchResult,handleSelectMovie}: Prop) {


    const renderMovies = (): ReactNode => {
        return searchResult.map((movie) => {
            let date:Date = new Date(movie.releaseDate);
            return (
                <tr key={movie.id}>
                    <td>{movie.name}</td>
                    <td>{movie.overview??'There is no overview'}</td>
                    <td>{movie.score}</td>
                    <td>{date.toLocaleString()}</td>
                    <td>movie.cast kell még</td>
                </tr>
            )
        })
    }

    return (
        <div className={'table-container'}>
            <Table className={'table'}>
                <thead>
                <tr>
                    <th>Movie name</th>
                    <th>Overview</th>
                    <th>Score</th>
                    <th>ReleaseDate</th>
                    <th>Cast</th>
                </tr>
                </thead>
                <tbody>
                {renderMovies()}
                </tbody>
            </Table>
        </div>
    )
}

/*
<div>
                    {searchMovies.map((movie: IMovieResult) => {
                        return <p key={movie.id}>{new Date(movie.releaseDate)}</p>
                    })}
                </div>
 */