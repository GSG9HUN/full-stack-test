import {IMovieResult} from "../Interfaces/MovieInterface";
import {Table} from "@mui/material";
import {Link} from "@mui/material";
import React, {ReactNode} from "react";

interface Prop {
    searchResult?: IMovieResult[],
    handleSelectMovie: Function,
}

export function MoviesList({searchResult, handleSelectMovie}: Prop) {


    const renderMovies = (): ReactNode => {
        return searchResult?.map((movie) => {
            let date: Date = new Date(movie.releaseDate);
            return (
                <tr key={movie.id}>
                    <td><Link onClick={() => {
                        handleSelectMovie(movie)
                    }}>{movie.name}</Link></td>
                    <td>{movie.overview ?? 'There is no overview'}</td>
                    <td>{movie.score}</td>
                    <td>{date.toLocaleString()}</td>
                </tr>
            )
        })
    }

    return (
        <React.Fragment>
            {searchResult?.length ?
                <div className={'table-container'}>
                    <Table className={'table'}>
                        <thead>
                        <tr>
                            <th>Movie name</th>
                            <th>Overview</th>
                            <th>Score</th>
                            <th>ReleaseDate</th>
                        </tr>
                        </thead>
                        <tbody>
                        {renderMovies()}
                        </tbody>
                    </Table>
                </div>
                : <h1>There is no movie with this title.</h1>}
        </React.Fragment>
    )
}
