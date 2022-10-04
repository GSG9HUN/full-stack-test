import {Key} from "react";

export interface IMovieResult {
    id:Key
    name:string,
    overview:string,
    score:number,
    releaseDate: string,
    cast: Array<ICastDetails>
}

export interface ICastDetails{
    id:string
    person:IPerson,
    role:IRole
}

interface IPerson{
    name:string,
}

interface IRole{
    character:string
}