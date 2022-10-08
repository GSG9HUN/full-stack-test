import {Key} from "react";

export const searchMoviesQuery = (title: string) => {
    return `query SearchMovies {
  searchMovies(query: "${title}") {
    id
    name
    overview
    score
    releaseDate
    cast {
      id
      person {
        name
      }
      role {
        ... on Cast {
          character
        }
      }
    }
  }
}`
}

export const getRelatedMoviesQuery = (id: Key) => {
    return `query getMovie {
  movie(id: ${id}) {
    recommended{
        id
        name
        overview
        score
        releaseDate
    }
  }
}`
}
