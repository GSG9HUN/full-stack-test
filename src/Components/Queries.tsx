export const searchMoviesQuery = (title: string) => {
    return `query SearchMovies {
  searchMovies(query: "${title}") {
    id
    name
    overview
    score
    socialMedia{imdb}
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
