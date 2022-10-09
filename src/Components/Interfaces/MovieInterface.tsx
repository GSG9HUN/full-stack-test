import {Key} from "react";

export interface Movie {
    id: Key
    name: string,
    overview: string,
    score: number,
    releaseDate: string,
    cast: Array<CastDetails>
}

export interface CastDetails{
    id:string
    person:Person,
    role:Role
}

interface Person{
    name:string,
}

interface Role{
    character:string
}