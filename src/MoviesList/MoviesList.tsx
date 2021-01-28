import { ChangeEvent, FC, useCallback, useEffect, useState } from 'react';
import { getRoutePath } from 'routes';
import { IconButton, ThemeProvider } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';

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

const ResultList: FC<{ moviesList: MovieType[] }> = ({ moviesList }) => (
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
);

const MoviesList: FC = () => {
  const { get, data, status } = useXhr();
  const [value, setValue] = useState('');
  const [moviesList, setMoviesList] = useState<MovieType[]>([]);
  useEffect(() => {
    if (value.length >= 2) {
      get(getQuery(value));
    } else if (value.length === 0) {
      get(configuration.api.popularEnpoint);
    }
  }, [get, value]);

  useEffect(() => {
    setMoviesList(
      data?.results.map((movie: MovieType) => ({
        ...movie,
        poster_path: getImage(movie),
      })),
    );
  }, [data]);

  useEffect(() => {
    get(configuration.api.popularEnpoint);
  }, [get]);

  const onClear = useCallback(() => {
    setValue('');
  }, []);

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValue(e.target.value);
    },
    [],
  );

  return (
    <>
      <ThemeProvider theme={theme}>
        <StyledTextfield
          label="Search a movie"
          fullWidth
          variant="filled"
          name="searchField"
          value={value}
          onChange={onChange}
          InputProps={{
            endAdornment: (
              <IconButton
                aria-label="clear search"
                onClick={onClear}
                onMouseDown={onClear}
                edge="end"
              >
                <ClearIcon />
              </IconButton>
            ),
          }}
        />
      </ThemeProvider>

      {status === 'RESOLVED' ? (
        <ResultList moviesList={moviesList} />
      ) : (
        <Loader />
      )}
    </>
  );
};

export default MoviesList;
