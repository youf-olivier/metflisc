import { FC, FormEvent, useCallback, useEffect, useState } from 'react';
import { getRoutePath } from 'routes';
import { ThemeProvider } from '@material-ui/core';

import { useXhr } from 'shared/utilities/fetch';
import configuration from 'configuration.json';
import noImage from 'shared/images/noImage.png';
import Loader from 'shared/components/Loader/Loader';
import { MovieType } from 'Movie.type';
import {
  StyledLink,
  StyledTextfield,
  StyleImg,
  StyleMoviesContainer,
  theme,
} from './MoviesList.styled';

const getQuery = (input: string) => {
  const query = encodeURIComponent(input);
  return `${configuration.api.searchEnpoint}?query=${query}`;
};

const getImage = (movie: MovieType) => {
  return movie.poster_path
    ? `${configuration.imageTmdbUrl}/${movie.poster_path}`
    : null;
};

const MoviesList: FC<{}> = () => {
  const { get, data, status } = useXhr();
  const [moviesList, setMoviesList] = useState<MovieType[]>([]);
  const [searchField, setSearchField] = useState('');
  useEffect(() => {
    get(configuration.api.popularEnpoint);
  }, [get]);

  useEffect(() => {
    setMoviesList(
      data?.results.map((movie: MovieType) => ({
        ...movie,
        poster_path: getImage(movie),
      })),
    );
  }, [data]);

  const onChange = useCallback(e => {
    setSearchField(e.target.value);
  }, []);

  const search = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      get(getQuery(searchField));
    },
    [get, searchField],
  );

  return status === 'RESOLVED' ? (
    <>
      <form onSubmit={search}>
        <ThemeProvider theme={theme}>
          <StyledTextfield
            label="Search a movie"
            fullWidth
            variant="filled"
            name="searchField"
            onChange={onChange}
          />
        </ThemeProvider>
      </form>
      <StyleMoviesContainer role="list">
        {moviesList?.map((movie: MovieType) => (
          <StyledLink
            to={`${getRoutePath('MovieDetail', movie.id.toString())}`}
            key={movie.id}
            role="listitem"
            aria-label={movie.title}
          >
            <StyleImg
              src={movie.poster_path || noImage}
              alt={movie.title}
              title={movie.title}
              aria-label={movie.title}
            />
          </StyledLink>
        ))}
      </StyleMoviesContainer>
    </>
  ) : (
    <Loader />
  );
};

export default MoviesList;
