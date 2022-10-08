import {Movie} from "../Interfaces/MovieInterface";
import {ReactNode, useEffect, useState} from "react";
import Spinner from "../SpinnerComponent/Spinner";
import axios from "axios";
import {IMDB_ENDPOINT, WIKIPEDIA_API_ENDPOINT} from "../APIEnpoints";
import {Wiki} from "../Interfaces/WikiInterface";
import {IconButton, Link} from "@mui/material";
import {IMDB, WIKIPEDIA} from "../PageURLs";

interface Props {
    selectedMovie: Movie,
    getRelatedMovies:Function
}

export default function Wikipedia({selectedMovie,getRelatedMovies}: Props) {

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
                explaintext: 1,
                titles: selectedMovie.name
            }
        })
            .then((response) => {
                console.log(response.data)
                let objectKey: string = Object.keys(response.data.query.pages)[0];
                let axiosResult: Wiki = response.data.query.pages[objectKey];

                setWikiResult(axiosResult)
                setWikiLink(WIKIPEDIA + `${axiosResult.title}`)
                setLoading(false);
            })

        axios.get(IMDB_ENDPOINT + selectedMovie.name)
            .then((response) => {
                let releaseDateYear = new Date(selectedMovie.releaseDate).getFullYear();
                let movieID: string = response.data.results.find((result: any) => {
                    return result.description.includes(releaseDateYear)
                })?.id;
                movieID ? setIMDBLink(IMDB + `${movieID}`) : setIMDBLink('');
            })
    }, [selectedMovie])

    const openInNewTab = (link: string) => {
        window.open(link, "_blank");
    }

    const handleButtonClick =()=>{
        getRelatedMovies(selectedMovie.id);
    }

    const renderWikiApiResult = (): ReactNode => {
        let firstParagraph = wikiResult?.extract?.split('.');
        return (
            <div>
                <h1>{wikiResult?.title}</h1>
                <p>{firstParagraph ? firstParagraph[0] : 'No result on wikipedia.'}</p>
                <div className={'links'}>
                    {firstParagraph && <Link onClick={() => openInNewTab(wikiLink)}>Open in Wikipedia</Link>}
                    {IMDLink ? <Link onClick={() => openInNewTab(IMDLink)}>Open in IMDB</Link> : ''}
                </div>
                <IconButton onClick={handleButtonClick}>Related movies</IconButton>
            </div>)
    }

    return (
        <div className={"wiki"}>
            {loading ? <Spinner/> : renderWikiApiResult()}
        </div>
    );
}