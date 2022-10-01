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

export const API_ENDPOINT: string = 'https://tmdb.sandbox.zoosh.ie/dev/grphql';