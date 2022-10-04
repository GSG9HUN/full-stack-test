import {IMovieResult} from "../Interfaces/MovieInterface";
import {ReactNode, useEffect, useState} from "react";
import Spinner from "../SpinnerComponent/Spinner";
import axios from "axios";
import {IMDB_ENDPOINT, WIKIPEDIA_API_ENDPOINT} from "../APIEnpoints";
import {IWikiResult} from "../Interfaces/WikiInterface";
import {Link} from "@mui/material";
import {IMDB, WIKIPEDIA} from "../PageURLs";

interface Props {
    selectedMovie: IMovieResult
}

export default function Wikipedia({selectedMovie}: Props) {

    const [loading, setLoading] = useState<boolean>(true);
    const [wikiResult, setWikiResult] = useState<IWikiResult>();
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
                let objectKey: string = Object.keys(response.data.query.pages)[0];
                let axiosResult: IWikiResult = response.data.query.pages[objectKey];

                setWikiResult(axiosResult)
                setWikiLink(WIKIPEDIA + `${axiosResult.title}`)
                setLoading(false);
            })

        axios.get(IMDB_ENDPOINT + selectedMovie.name)
            .then((response) => {
                let movieID: string = response.data.results[0]?.id;
                movieID ? setIMDBLink(IMDB + `${movieID}`) : setIMDBLink('');
            })
    }, [selectedMovie])

    const openInNewTab = (link: string) => {
        window.open(link, "_blank");
    }

    const renderWikiApiResult = (): ReactNode => {
        let firstParagraph = wikiResult?.extract?.split('.');
        return (
            <div>
                <h1>{wikiResult?.title}</h1>
                <p>{firstParagraph ? firstParagraph[0] : 'No result on wikipedia.'}</p>
                <div className={'links'}>
                    {firstParagraph && <Link onClick={() => openInNewTab(wikiLink)}>Wikipedia link</Link>}
                    {IMDLink ? <Link onClick={() => openInNewTab(IMDLink)}>IMDB link</Link> : 'No link on IMDB.'}
                </div>
            </div>)
    }

    return (
        <div className={"wiki"}>
            {loading ? <Spinner/> : renderWikiApiResult()}
        </div>
    );
}