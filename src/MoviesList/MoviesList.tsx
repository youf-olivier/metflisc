import { FC, useEffect, useState } from 'react';
import { useXhr } from 'shared/utilities/fetch';
import configuration from 'configuration.json';
import { MovieType } from 'Movie.type';
import styled from 'styled-components';
import { getRoutePath } from 'routes';
import { Link } from 'react-router-dom';
import { device } from 'shared/utilities/devise.constants';

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
  margin: 0.1em;
  @media ${device.tablet} {
    width: 24%;
  }

  @media ${device.laptop} {
    width: 18%;
  }
`;

const MoviesList: FC<MoviesListProps> = () => {
  const { get, data, status } = useXhr();
  const [moviesList, setMoviesList] = useState<MovieType[]>([]);
  useEffect(() => {
    get(configuration.api.popularEnpoint);
  }, [get]);

  useEffect(() => {
    setMoviesList(
      data?.results.map((movie: MovieType) => ({
        ...movie,
        poster_path: `${configuration.imageTmdbUrl}/${movie.poster_path}`,
      })),
    );
  }, [data]);

  return status === 'RESOLVED' ? (
    <StyleMoviesContainer role="list">
      {moviesList?.map((movie: MovieType) => (
        <StyledLink
          to={getRoutePath('MovieDetail')}
          key={movie.id}
          role="listitem"
          aria-label={movie.title}
        >
          <StyleImg
            src={movie.poster_path}
            alt={movie.title}
            aria-label={movie.title}
          />
        </StyledLink>
      ))}
    </StyleMoviesContainer>
  ) : (
    <span>Pending...</span>
  );
};

export default MoviesList;
