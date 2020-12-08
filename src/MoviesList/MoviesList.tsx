import { FC, FormEvent, useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { getRoutePath } from 'routes';
import { Link } from 'react-router-dom';
import { device } from 'shared/utilities/devise.constants';
import TextField from '@material-ui/core/TextField';

import { useXhr } from 'shared/utilities/fetch';
import configuration from 'configuration.json';
import { MovieType } from 'Movie.type';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import noImage from 'shared/images/noImage.png';

type MoviesListProps = {};

const StyleMoviesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0.2em;
  @media ${device.tablet} {
    max-width: 950px;
    margin: auto;
  }
`;

const StyledLink = styled(Link)`
  display: contents;
`;

const StyleImg = styled.img`
  width: 48%;
  margin: 0.2em;
  @media ${device.tablet} {
    width: 24%;
  }

  @media ${device.laptop} {
    width: 18%;
  }
`;

const StyledTextfield = styled(TextField)`
  background-color: #ffffff;
  margin-top: 0.5em;
`;

const theme = createMuiTheme({
  palette: {
    primary: grey,
  },
});

const getQuery = (input: string) => {
  const query = encodeURIComponent(input);
  return `${configuration.api.searchEnpoint}?query=${query}`;
};

const getImage = (movie: MovieType) => {
  return movie.poster_path
    ? `${configuration.imageTmdbUrl}/${movie.poster_path}`
    : null;
};

const MoviesList: FC<MoviesListProps> = () => {
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
    <span>Pending...</span>
  );
};

export default MoviesList;
