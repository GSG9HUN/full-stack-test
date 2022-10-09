import {Movie} from "../Interfaces/MovieInterface";
import React from 'react';
import {ReactNode, useEffect, useState} from "react";
import Spinner from "../SpinnerComponent/Spinner";
import axios from "axios";
import {IMDB_ENDPOINT, WIKIPEDIA_API_ENDPOINT} from "../APIEnpoints";
import {Wiki} from "../Interfaces/WikiInterface";
import {IconButton, Link} from "@mui/material";
import {IMDB, WIKIPEDIA} from "../PageURLs";

interface WikipediaProps {
    selectedMovie: Movie,
    getRelatedMovies: Function
}

export default function Wikipedia({selectedMovie, getRelatedMovies}: WikipediaProps) {

    const [loading, setLoading] = useState<boolean>(true);
    const [wikiResult, setWikiResult] = useState<Wiki>();
    const [IMDLink, setIMDBLink] = useState<string>('');
    const [wikiLink, setWikiLink] = useState<string>('');

    useEffect(() => {
        axios.get(WIKIPEDIA_API_ENDPOINT, {
            params: {
                action: "query",
                format: "json",
                origin: "*",
                prop: "extracts",
                explaintext: true,
                sections: 1,
                exintro: true,
                titles: selectedMovie.name,

            }
        })
            .then((response) => {

                let objectKey: string = Object.keys(response.data.query.pages)[0];
                let axiosResult: Wiki = response.data.query.pages[objectKey];

                setWikiResult(axiosResult)
                setWikiLink(WIKIPEDIA + `${axiosResult.title}`)
                setLoading(false);
            })
        axios.get(IMDB_ENDPOINT + selectedMovie.name)
            .then((response) => {
                let releaseDateYear = new Date(selectedMovie.releaseDate).getFullYear();
                let movieID: string = response.data.results?.find((result: any) => {
                    return result.description.includes(releaseDateYear)
                })?.id;
                movieID ? setIMDBLink(IMDB + `${movieID}`) : setIMDBLink('');
            })
    }, [selectedMovie])
    const openInNewTab = (link: string) => {
        window.open(link, "_blank");
    }

    const handleButtonClick = () => {
        getRelatedMovies(selectedMovie.id);
    }

    const renderWikiApiResult = (): ReactNode => {

        return (
            <React.Fragment>
                <h1>{wikiResult?.title}</h1>
                <p>{wikiResult?.extract ?? 'No result on wikipedia.'}</p>
                <div className={'links'}>
                    {wikiResult?.extract && <Link onClick={() => openInNewTab(wikiLink)}>Open in Wikipedia</Link>}
                    {IMDLink ? <Link onClick={() => openInNewTab(IMDLink)}>Open in IMDB</Link> : ''}
                </div>
                <IconButton className={'relatedButton'} onClick={handleButtonClick}>Related movies</IconButton>
            </React.Fragment>)
    }

    return (
        <div className={"wiki"}>
            {loading ? <Spinner/> : renderWikiApiResult()}
        </div>
    );
}